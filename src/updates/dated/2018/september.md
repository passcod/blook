# September 2018

## Medical

I got some dental surgery done at long last early this month, and the recovery
was somewhat longer than I'd thought, which didn't help with projects. I'm all
good now, though! (And two teeth lighter.)

## Watchexec

This month I volunteered to take on the [Watchexec] project, to ensure that pull
requests and issues and new features would be finally tackled. Matt Green, the
project's originator and principal author up til now, has recently gotten more
busy at work and most importantly, become a first-time parent. Congratulations
to him! That did mean that there was no more time for the project.

I spent a few evenings reviewing the entire source and looking through all
issues and pull requests, then made my first release on Sunday 19th, and another
one on Sunday 9th after a little more coding to smooth over old PRs. I hope to
work through more of the issues as we go through, but I am very aware that this
is yet another project on top of my stack of already pending stuff, so I'm
pacing myself with a lot of care.

[Watchexec]: https://github.com/mattgreen/watchexec

## Notify

Notify advances slowly. This is mostly a matter of time, now: most of the
framework is ready and awaits only filling up the gaps.

I am getting very interesting snapshots of futures 0.3 and the async/await
support in Rust itself, which could mean improved ergonomics and better
development. In the meantime, though, I'm keeping with what I have.

The Rust inotify wrapper has recently [gained a feature] to use futures and Tokio
Reform, which might make it a lot easier to integrate, although it may be that
the access I require for the Backend is too advanced for the nicely-wrapped
version. To be seen.

A [wonderful contributor] has spent some time upgrading all of the libraries in
the **v4 branch**. This will likely be the last release with the old code!

[gained a feature]: https://github.com/inotify-rs/inotify/pull/105
[wonderful contributor]: https://github.com/passcod/notify/pull/162

## Splash

My mysteriously-named project is a foray into some really old code, and a
documentation effort more than a coding effort. It's a nice change of pace, even
though it can be really intense… I like it for the different _kind_ of work.

Perhaps it will see a release this summer, but with everything else piled on,
I'm making myself no promises.

## [Certainly]

Frustrated by the awful state of certificate tooling, especially for such common
things as generating self-signed certificates, I made [a small tool][Certainly]
that makes the whole thing as easy and simple as possible! It especially excels
at multidomain certificates, and has an extra feature to be able to create a
local CA and sign certificates that way. All in minimal fuss and no ambiguity:

```text
$ certainly test.com
Writing test.com.key
Writing test.com.crt
```

I also took what I learned from Watchexec and Cargo Watch, and set up prebuilt
binaries for Linux, Windows, macOS, as well as a Debian deb... for ease of use!

[Certainly]: https://github.com/passcod/certainly

## 10 minutes

My star wars fanfic is stalled!

...no, it's not. It's just that with everything else, I thought I would get the
chance to work at the chapter last month, but I didn't. So it's still getting
pushed away to the next opportunity.
