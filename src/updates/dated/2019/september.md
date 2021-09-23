# September 2019

## Abandoning Notify

I made the decision to abandon Notify. I wrote lots about it, both [on Github]
and [on Twitter], but the shortest justification is this:

> \[Notify\] sparks *negative joy*, so I’m Marie-Kondo-ing it out.

Turns out however that abandoning such a large piece of software and my life
isn’t simple. I’m not taking it back, ever at all if I can manage it, but
getting to the point of it being off my hands completely is not all
straightforward. I do hope it gets there soonish, though, because otherwise
quite a few crates and part of the ecosystem will start not working anymore.

I also hope I’m making this transition less painful than other abandonments I’ve
seen in the OSS space before, though. My goal is to reclaim my own time and joy,
not to say fuck you to any part of Rust or cause misery to anyone.

[on Github]: https://github.com/passcod/notify/issues/209
[on Twitter]: https://twitter.com/passcod/status/1170626632089866240

## Storq

Hot on the heels of getting way more time, I got some motivation back! Who knew.

Anyway, I started working on Storq again. This is a rename of a project
initially called Q, which spawned from a project called Gearbox, which spawned
from another project also called Gearbox but not written in Rust. This all
started from a musing on making Gearman better, and so Storq is... not that.

Or at least, not recognisably that.

Storq is a construction on top of the Sled embedded advanced key-value store,
for the purpose of dynamic work queues with arbitrary ordering controlled by
application-provided functions.

At some point after many design drafts and documents I figured that the Gearman
queue model was a good idea, but not robust or versatile enough; Storq is the
attempt to create a new bedrock for a work processor system inspired by Gearman.

## Splash

I’ve also picked back up Splash, my ongoing HF radio propagation tooling
endeavour starting with a thoroughly-documented implementation of the ITM.

## Holiday

I went on vacation for four weeks to Europe and came back home early this month.
It was pretty great!
