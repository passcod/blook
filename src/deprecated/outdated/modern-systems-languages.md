# Modern systems languages

> 6 December 2013

A year or so ago, I started getting interested in two new, modern systems programming languages: [Rust] and [Go]. After playing around a bit with both, I chose **Go** to program a few things I had floating around at the time: [plong], a pseudo-p2p server which is essentially a WebSocket relay and signaling server; [poële], a very simple queue / task processor using Redis; and [double-map], a new kind of data-structure which solves the problem of slow hashmap search for specific scenarios.

Enthused by my success with a fast, modern, typed, compiled, systems language, I started having ideas of more ambitious things: **imaku-latte** was about a novel DE/WM for X11, **thesides** was about an EC2-like service for micro tasks and scripts.

More recently, **aldaron** is a tree editor, and **pippo** is my long-standing attempt at designing an ever-better [DBMS] (current features include graphs, content-addressable low-level block store, powerful abstraction capabilities, transparent versioning and [COW], stream writes, and being truly distributed).

**thesides** died for various reasons. The others didn't, really, they were aborted and/or infinitely delayed because Go is too high level. It doesn't allow easy low-level memory manipulation, the C interface is annoying both ways, and other nitpicks.

I still like Go, but I think I'm going to try out Rust for these projects where low-level access, where a real C replacement, is needed. We'll see how that goes.

[Rust]: http://rust-lang.org
[Go]: http://golang.org/
[plong]: https://github.com/passcod/plong-server
[poële]: https://github.com/passcod/poele
[double-map]: https://github.com/passcod/double-map
[DBMS]: https://en.wikipedia.org/wiki/Dbms
[COW]: http://en.wikipedia.org/wiki/Copy-on-write
