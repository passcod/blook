---
# vim: tw=80
title: "Monthly Update: September 2019"
date: 2019-09-30T20:00:00+13:00
tags:
  - monthly-update
parents:
  - "2019-aug-31/monthly-update"
---

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

## Fiction

 - {HP} [Making It Believable](https://archiveofourown.org/works/779841). {2k words}
 - {HP} **[The More You Ignore Me (The Closer I Get)](https://archiveofourown.org/works/961158)**. {12k words}
 - {HP} [Safe House](https://archiveofourown.org/works/1438828). {11k words}
 - {HP} [What We Thought We Knew](https://archiveofourown.org/works/633183). {7k words}
 - {HP} [It Was All Happenstance](https://archiveofourown.org/works/633419). {11k words}
 - {HP} [Stalking Harry Potter](https://archiveofourown.org/works/396506). {39k words}
 - {HP} [Maffy the Grumpy House-Elf](https://archiveofourown.org/works/467094). {8k words}
 - {HP} **[Angels Don't Live Here](https://archiveofourown.org/works/396535)**. {17k words}
 - {HP} **[Spring Street](https://archiveofourown.org/works/288742)**. {25k words}
 - {HP} [Meeting Severus Snape](https://archiveofourown.org/works/288711). {8k words}
 - {HP} [Quidditch in the Rough, or How Potter Got His Groove Back](https://archiveofourown.org/works/275967). {18k words}
 - {HP} [Blame it on the Rhine](https://archiveofourown.org/works/276699). {21k words}
 - {HP} **[A Love Song Like the Way It's Meant to Be](https://archiveofourown.org/works/142763)**. {30k words}
 - {HP} **[A Bit of She Said-She Said](https://archiveofourown.org/works/88027)**. {6k words}
 - {HP} [From the Ashes](https://archiveofourown.org/works/25656). {59k words}
 - {HP} [Words Written on Hands](https://archiveofourown.org/works/177887). {7k words}
 - {HP} [The Next Best Thing](https://archiveofourown.org/works/462306). {26k words}
 - {HP} [Winter Retreat](https://archiveofourown.org/works/73880). {11k words}
 - {GoT} **[Finders Keepers](https://archiveofourown.org/works/19869760)**. {6k words}
 - {HP} [Margin for Error](https://archiveofourown.org/works/16494956). {4k words}
 - {HP} [Mirror, Mirror](https://archiveofourown.org/works/18346316). {5k words}
 - {HP} [Dancing or Something](https://archiveofourown.org/works/13185630). {7k words}
 - {Meta} [The Only Unproblematic Slash Fic](https://archiveofourown.org/works/18623245). {1k words}
 - {Good Omens} **[Smoke Gets In](https://archiveofourown.org/works/19833880)**. {5k words}
 - {HP} [My Best Friend's Sister](https://archiveofourown.org/works/18157694). {2k words}
 - {HP} **[‘Catching Flies’ series](https://archiveofourown.org/series/783057)**. {17k words atow}
