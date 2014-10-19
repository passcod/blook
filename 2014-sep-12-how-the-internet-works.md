---
tags:
  - document
  - internet
title: How does the Internet work?
---

This question is really hard to answer. The hardest thing about it is that it's
really hard to see where to begin. Should I go from the bottom or from the top?
How deep should I go? As deep as the TCP/IP protocol? As deep as Ethernet and
ATM and other "wire" protocol? Deeper than that into the actual voltages and
light signals and electrons and photons and whatnot? Should I explain how
JavaScript works? How about Canvas? WebGL? How GPUs work, or, for this matter,
how CPUs work? Where do I draw the line between "How the Internet works" and
"How computers work" and "How the Universe works"? _Where do I start?!_

I've asked myself this question too many times. Today, let's just pick one
place, one time, one situation, and start there. Let's pick a situation that
everybody does every day, and go from there. What follows is a dialogue and a
monologue. Things in "quotes" are things I imagine you say. Everything else is
me answering. Note that __I don't know__ a lot of how the Internet works. And
sometimes I'll say so, in the text. So if you're an Internet Expert™, grep for
these 'I don't know' phrases and help me out!

---

"Okay, so, I have this website from my voting papers and I'm putting it in my
browser and pressing enter, and pretty soon I've got that page. What just
happened? How does this work?"

In order, roughly, what happened is this:

1. You entered this address, `http://www.elections.govt.nz`, into your browser.
2. Your browser parsed this address, and figured out you were asking for the
   website at the server `www.elections.govt.nz` over the `http` protocol.
3. Your browser went and used the `http` protocol to ask the `www.elections.govt.nz`
   server about that page you wanted.
4. The server replied with the information you wanted.
5. The browser displayed that information.

"Wait wait waaait. What does 'parsed' mean?"

Well, it means… you know what, let's just google it:

> Parsing or syntactic analysis is the process of analysing a string of
> symbols, either in natural language or in computer languages, according to
> the rules of a formal grammar. The term parsing comes from Latin pars,
> meaning part. ([Wikipedia](https://en.wikipedia.org/wiki/Parsing))

Well, that was helpful. Before you ask me what a 'string' or a 'formal grammar'
are, let's just say that 'parsing' is about taking a piece of data, a piece of
text, figuring out if it fits a certain pattern, and if it does, cutting it up
in its components. So in english, for example, the sentence 'How are you?' fits
the pattern of, well, an english sentence, while 'Bruf aouf whsbt.!..42'
doesn't. What's more, 'How are you?' can be cut up into the words 'How', 'are',
'you', and the punctuation '?'. Further, 'are' is the verb 'to be' at the
second person singular or plural, and so on, so it can be seen that the
sentence further fits the pattern of a simple question of the form '*adverb*
*verb* *subject*?'.

The browser does the same thing. From the text `http://www.elections.govt.nz`,
it wants a pattern known as a URL. So it checks it out, figures that yes, this
piece of text is indeed a URL, and cuts it up in its components: `http` is the
protocol, `www.elections.govt.nz` is the address of the server.

"Right. What's a protocol?"

A protocol is… let's ask google again:

> In telecommunications, a communications protocol is a system of digital rules
> for data exchange within or between computers. Communicating systems use
> well-defined formats for exchanging messages. ([Wikipedia](https://en.wikipedia.org/wiki/Communications_protocol))

Much better than the previous one! In somewhat plainer english, a protocol is a
set of rules that computer programs use to speak to each other. Much like
someone from New Zealand and someone from, say, Brasil will not speak the same
language, if two programs don't understand the same protocols, they won't be
able to understand each other. Unlike most spoken languages, though, protocols
are very rigidly defined. Someone from England may have some difficulties
understanding someone from Australia, but they'll manage. But a program that
understands protocol A will absolutely not understand a program that speaks
protocol B, no matter if the only thing that changes between the two is a
single word. Computers are fussy like that.

In this case, the protocol that browser is going to use is called 'HTTP'. That
stands for 'HyperText Transfer Protocol'. 'Hypertext' is a fancy word to refer
to webpages, and the rest is self-explanatory. 'HTTP' is a set of rules that
computer programs use to transfer webpages between themselves.

"What are those rules?"

HTTP is actually quite simple. When your browser wants a page, it *requests* it
from the server, which *responds* to that request with, well, a response. Both
the request and response are composed of three parts: the first line has basic
information about what you want or what the server is saying, the lines below
that contain metadata about the request or response, and then, separated from
the metadata by a blank line, is the actual content.

When your browser asks `www.elections.govt.nz` for a page, here's what it sends
to the server:

```
GET / HTTP/1.1
Host: www.elections.org.nz
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:35.0) Gecko/20100101 Firefox/35.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Connection: keep-alive
Pragma: no-cache
Cache-Control: no-cache
```

The first line, `GET / HTTP/1.1`, is the 'basic information' line. It says 'GET
me the page `/`' (`/` is the default page), and it says 'oh by the way I'm
going to speak to you in the version 1.1 of the HTTP protocol'. There's several
versions, the ones most important right now are 1.1, which is the current, most
common one, and version 2.0, which is the next generation one. I don't know
much about HTTP/2, so we'll just ignore that for now.

Then comes the headers, the metadata of the request, in `Name: value` pairs.
The `Host` header says 'I'm requesting this using the `www.elections.org.nz`
address'; this is important because the server might not know about that, but
we'll see more details later. The `User-Agent` says 'The browser speaking to
you is Firefox, version 35.0, using the Gecko engine, made by Mozilla, running
on Linux, on a 64-bit computer.' although most servers don't really care about
all that. The `Accept` says 'here are the list of formats I understand', which
the server can use to make sure it responds with the proper thing. The
`Accept-Language` says 'My human has indicated peh would prefer things written
in English'. The `Accept-Encoding` says 'If you want, you can compress the
response so it goes faster over the wire, and I'll understand it just fine as
long as you use either the `gzip` or `deflate` programs to do the compressing'.
The `Connection` specifies that the server should keep the line open so the
browser doesn't have to go through all the trouble it did the first time around
if it wants something else from the server. The `Pragma` and `Cache-Control`
pairs are about caching, which I'll tell you about later if you ask nicely.

As you can see, there's a whole lot of information being expressed there. There
is no 'body', no contents below that, but that's okay, because with all this
information, the server can surely comply and give us an answer.

And it does:

```
HTTP/1.1 200 OK
Server: nginx
Date: Fri, 12 Sep 2014 10:35:16 GMT
Content-Type: text/html; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
Keep-Alive: timeout=10
Vary: Accept-Encoding
Etag: "1410517815-1"
Content-Language: en
X-UA-Compatible: IE=edge,chrome=1
Link: <http://www.elections.org.nz/>; rel="canonical",<http://www.elections.org.nz/>; rel="shortlink"
Last-Modified: Fri, 12 Sep 2014 10:30:15 +0000
Vary: Accept-Encoding
X-Frame-Options: sameorigin
X-Varnish: 1757163577 1757156649
Age: 299
Via: 1.1 varnish
X-Hits: 33
Cache-Control: no-cache, must-revalidate, max-age=3600
X-Frame-Options: sameorigin

< !DOCTYPE html>
<html>...
```

Again, the first line is 'basic information'. The server is telling us 'HTTP
version 1.1 is fine' and 'Your request was OK, so here's the response'. The
`200` here is because instead of saying `OK`, the server really says `200`.
That's what it understands. But it's also being nice to humans who might read
this, and it includes the meaning of that `200` next to it: `OK`.

Then the metadata. `Server` says 'The name of the program I use to talk to you
is nginx.' `Date` is just that, the current date. `Content-Type` is what the
format of the contents is; if you look back to the request, you'll notice it
was in the `Accept` list we gave the server, so all is well.
`Transfer-Encoding` says 'I'm going to give this to you in small bits.'
`Connection` is an acknowledgement of what we asked, and a confirmation that
it's going to hold the line. `Keep-Alive` is related to that: if we don't say
anything for 10 seconds, the server will hang up. `Vary` is for proxies, which
I'll explain later if you ask. `Etag` is a small piece of text which identifies
the version of the content; if your browser asks if the page has changed, it
sends that `Etag` along, and the server can know precisely which version your
browser has, and if it has, indeed, changed (if it hasn't, it just says so
instead of sending a copy of the content, which is much faster).
`Content-Language` says 'this content is written in English'. Anything that
starts with `X-` is a special header, and might not mean the same thing to
everybody, or might just be for extra information that only some browsers or
people use. `X-UA-Compatible` is used only by the Internet Explorer browser.
`Link` says 'This link, `http://www.elections.org.nz`, is both the canonical
link (the one that points to the *source* of the content) and the short link
(the one that should be used if you want to save space).' `Last-Modified` is
like `ETag`, but using a date. The server repeats the `Vary` header, which is
probably a bug. `X-Frame-Options` says 'This page can only be put in a frame if
the parent page is on the same address as I am.' `X-Varnish` is related in some
way to the program Varnish. `Age` is the age of the contents in seconds, in
this case the content is just under 5 minutes old. `Via` says 'This response
came to you via Varnish'; Varnish is a special program that big websites use to
be faster. `X-Hits`… I'm not sure; it could be that this is the number of times
your browser has asked that server for something today, or something else… I
don't know. `Cache-Control` is related to caching, see above. And they've
repeated the `X-Frame-Options` header, too; must really be a bug.

And then below that there's a blank line, and below that blank line is the
contents of the response, which start with `!DOCTYPE html` and `<html>` and
I've omitted the rest because there's, like, ten pages of the stuff.

So that's how HTTP works. You ask the server a question, and give it plenty of
information, some of it it won't need, and it replies with plenty of
information, some of it you won't need, plus the actual contents of what you
asked for. So far so good.

"So, that explains a lot, but now I have something like fifty questions."

Ooh boy. Okay, to make things simpler, could you just tell me which questions
you have and I'll see what I have to answer?

"Yeah, sure. So…

- Why might the server not know about the address we've used to ask it a
  question, i.e. why is that `Host` header there?
- What's the Gecko engine? What's an engine? How is it different from a
  browser?
- What's the format of the `Accept` header? What are those `q=0.something`
  things? What's the difference between `text/html` and, say `application/xml`?
- What's the format of the `Accept-Language` header? Why is it both `en-US` and
  `en`? Where do I change that?
- What are `gzip` and `deflate` and why were those two picked instead of, say,
  WinRAR? WinRAR does compression, too, doesn't it? My friend said it was
  better than Zip.
- Can you tell me more about the caching business? Pretty please?
- Why is the response giving us the current date? We've got a computer, we know
  what today is…
- What if `Content-Type` *isn't* in the `Accept` list we sent through?
- That `Tranfer-Encoding: chunked` thing is weird. Why would the server give us
  the response in small bits? Can't it just give it whole?
- The Internet doesn't run on phones anymore, there's nothing to 'hang up' and
  'holding the line' isn't literal anymore, so what are you actually talking
  about there?
- So can you explain that `Vary` business and proxies?
- `X-UA-Compatible` might only be for Internet Explorer, but what does it mean?
- What's a frame?
- How does Varnish make big website faster?
- Earlier you said that when the browser got the response back, it displayed it
  to me. All that I see in the response is text, and not even all of it, as you
  have omitted a bunch of it. Where does the browser get the nice layout and
  pretty pictures from just a lot of text?
- In the `Content-Type` of the response, there's something that says
  `charset=utf-8`. UTF-8… I feel like I've heard that before? What is it?"

Firstly, that's not even fifty questions. More like half that.

"You're a pedant."

[Sometimes](https://blog.passcod.name/2014/mar/28/contribution-style-guide). As for answers…
