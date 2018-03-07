---
# vim: tw=80
date: 2018-03-07T22:35:30+13:00
title: Writing servers with Tokio
tags:
   - post
   - rust
---

I've been writing a small toy project with [Tokio] in my spare time's spare
time. I'll write more about it at a later date. What I've found writing it,
though, is that there is a specific pattern to writing servers, both UDP and
TCP (and presumably others) in Tokio, and it's not super obvious at first
glance. So here it is.

[Tokio]: https://tokio.rs

When you start writing a server, you might do something like this:

```rust
let addr = SocketAddr::from_str(BIND).unwrap();
let tcp = TcpListener::bind(&addr).unwrap();

tcp.incoming().for_each(|stream| {
   // Do something
   Ok(())
});

current_thread::spawn(tcp);
```

(There's more details to get it working, but I'll omit them for brevity.)

The first thing I like to do is to move that closure to an actual function,
both for clarity and code organisation, and to remove any temptation to use
external bindings in it. (You might find you need to close over your
environment. I prefer to structure my programs so that I don't, or only at
minima.)

```rust
pub fn server<'a>() -> MapErr<ForEach<
    Incoming,
    &'a ServerFn,
    io::Result<()>
>, &'a ErrorFn> {
    let addr = SocketAddr::from_str(BIND).unwrap();
    let tcp = TcpListener::bind(&addr).unwrap();

    tcp.incoming()
    .for_each(&handle as &ServerFn)
    .map_err(&error as &ErrorFn)
}

type ServerFn = Fn(TcpStream) -> io::Result<()>;
fn handle(tcp: TcpStream) -> io::Result<()> {
    println!("Got a connection");
	 Ok(())
}

type ErrorFn = Fn(io::Error);
fn error(err: io::Error) {
    println!("server error {:?}", err);
}
```

That's a lot of boilerplate, but from then on I'll only look inside the
`handle()`; everything else stays the same. Let's explain some of the
boilerplate to get it out of the way:

 - You need type definitions for your functions, to satisfy the Rust type
	checking. You can put them inline (where the `as &ServerFn` and `as &ErrorFn`
	parts are), but I prefer to keep them right next to the function signature
	itself so I don't forget to keep them in sync.

 - The `.map_err`'s job is to discard any error value, replacing a
	`Result<T, Error>` into a `Result<T, ()>`, which is what
	`current_thread::spawn` will take. The `error()` function takes this
	opportunity to print the error to screen, but you should customise that to
	better fit what you're doing.

Now, you might notice that the `handle()` function returns a `Result` with an
empty `Item`. In Tokio, you don't return the response from the handler. Indeed,
"returning the response" is non-sensical in the context of TCP streams. Instead,
Tokio gives us a `TcpStream`, which is... not quite a `Stream`. It's a `Stream`
**and a `Sink`, combined**.

You handle that with `.split()`, returning a 2-tuple of stream and sink:

```rust
let (reader, writer) = stream.split();
```

But before that, you probably want to do some preprocessing on the raw byte
stream to get it into format that's actually useful, and you do that with
[`Framed`]. The idea is to implement two traits, a `Decode` and an `Encode`,
where you get a buffer of bytes and figure out how to parse it for your
applications. There's a whole lot to be written about this, but for now I'll
skip it. Let's just assume you've got a `Codec` ready.

[`Framed`]: https://docs.rs/tokio-io/0.1.5/tokio_io/codec/struct.Framed.html

Now, *interestingly*, and by that I mean confusingly, when you split a Framed
TCP stream, the 2-tuple is the other way around:

```rust
let (writer, reader) = stream.framed(Codec::default()).split();
```

Now let's read from the stream:

```rust
let conn = reader.for_each(|frame| {
	 println!("Got a frame! {:?}", frame);
});

current_thread::spawn(conn);
```

The way it goes is this: Tokio gives you a `TcpStream` per connection. You set
up whatever read pipeline on that particular connection you want, and you hand
the read pipeline to Tokio for processing. Tokio goes ahead and uses its event
loop to drive the reader.

So far, so okay. If you're not super-familiar with how Tokio works or how TCP
servers work, and instead come from a mostly-HTTP perspective, it requires a
bit of an adjustment to figure out. It took me a while to get there.

Now, to _write_ to the connection, you can't just write to the `writer`.

Firstly, you have to understand that the `writer` is also a Tokio thing. You're
not going to write directly to a socket, you're going to submit messages to be
sent, and then hand the writer over to Tokio so it can use its event loop to
write to the socket.

It looks a bit like this:

```rust
writer.start_send(a_message);

current_thread::spawn(writer);
```

Most likely, you're going to want to respond to things the reader tells you, so
it will start to look a bit like this:

```rust
let (writer, reader) = stream.framed(Codec::default()).split();

let conn = reader.for_each(|frame| {
	 writer.start_send(a_message);
});

current_thread::spawn(conn);
current_thread::spawn(writer);
```

That doesn't actually work. You can't close over the `writer`. So instead, you
have to employ another level of indirection: channels.

You can't close over the `writer`, but you _can_ close over a channel `Sender`.
You can also `clone()` a `Sender`, so it's easy to share between threads and
closures. Tokio has special channels that are designed to be used with Futures.
Here's how you set it up:

```rust
use futures::sync::mpsc::{channel, Sender, Receiver};

let (writer, reader) = tcp.framed(...).split();
let (tx, rx) = channel(10);

let sink = rx.forward(writer);
current_thread::spawn(sink);

let conntx = tx.clone();
let conn = reader.for_each(move |frame| {
	conntx.start_send(a_message);
});

current_thread::spawn(conn);
```

The `10` here is the channel capacity. I selected 10 because I don't expect to
send more than a few messages per frame I read, and then I added a hefty safety
margin.

You hook up the `writer` to the `Receiver` end of the channel, and then hand
the result over to Tokio so it can drive the TCP writer. Then you can write
messages to any `Sender` of this channel, and they will make their way to the
output.

## What about UDP?

The above was for TCP. For UDP, it's pretty much exactly the same, except that
Tokio doesn't hand out a `Stream+Sink` for each connection. UDP is
connection-less. So what you get is a single `Stream+Sink` for the entire UDP
socket. It's up to you to figure out what comes from where.

Additionally, there are different considerations when writing the `Decode`
trait. UDP gets datagrams entirely or not at all, so situations where you might
ask for more data in streaming decodes are instead errors. Currently, if you do
return `Ok(None)` from a `Decode` used in a UDP context, the entire stream will
be considered failed and closed.

It is possible to write your Codec in such a way that it can be used for either
TCP or UDP, or at least most of it. When starting out, though, duplicating the
entire thing was a quick and easy way to get started. Constellationd is pretty
special in that it needs to handle both TCP and UDP very closely together, but
it's more likely that you'll only want one.

## That's pretty much it!

Thanks for reading.
