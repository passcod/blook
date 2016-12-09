---
tags:
  - post
  - monthly-update
---

Partly inspired by [txanatan's weekly roundup][1] that just came out right now,
I've decided to start blogging a little bit more! The first thing I noticed
while opening my blog folder is how little I've done so in the past two years:

```
2015-dec-01
2015-oct-12
2015-sep-03
2016-aug-28
2016-dec-10
2016-feb-13
2016-jul-10
2016-jun-06
2016-nov-13
2016-sep-23
```

That's it! Exactly 10 posts, counting this one, for the entire 2015–2016
period… awful. So, a New Year's resolution is to try to write more. But, you
see, I don't believe in having New Year's resolutions take effect in the _new_
year. That's just asking for trouble. Instead, I spend the last month or so of
a year reflecting and figuring out what to do better, then _start implementing
the changes right then_. That way, all I have to do the next year is keep on
doing them, i.e. the hard part.

Last year, I took the decision to have my eyes fixed permanently around this
time, and then the big day happened early this year. Guess what: it's been
great. (Okay, this time last year was also when I broke up with my then-SO, so
it wasn't all happy times, but lemons, lemonade, etc.)

So, end-of-year resolutions, then:

- **I want to improve my accent/speech.** I've identified that not being
  confident with my English pronounciation is actually a fairly big source of
  anxiety in accomplishing some tasks. I'm considered fluent, but I do have an
  accent and sometimes that makes it hard for people to understand me,
  especially if they're not used to it or distracted or, and this is the
  critical bit, when there's no body language or lip reading to help me. That
  is, I'm much better at speaking with people face to face than on the phone or
  even over VoIP. **So I've contacted a speech therapist.** I don't know yet
  whether this is something that will actually happen, because it's quite
  dependent on the right specialist being here in Whangarei and having time in
  their schedule, but I'm hoping something will be going on sometime next year.

- **I want to lose some weight and be more fit.** I'm not, by any stretch of
  the imagination, in very good physical shape. I'm not a total wreck; I can do
  an hour of moderately strenuous activity and be fine about it. I do walk five
  or ten kms every so often. In mostly flat country. With no weight on my
  shoulders. Yeah, so not great. Recently I did about 3–4 hours of kayaking
  down an estuary and back up, and it killed me. I did it, but for two days
  afterwards I hurt so bad all over that it was keeping me awake. **So I've
  started hiking up the forest behind home.** Twice a week, probably will be
  increasing that as I go. It's a 30-minute hike there and back with about 50m
  altitude difference. It's a start. My goal is to do the Tongariro Crossing
  once again — I did it last in 2011, and it erupted since, so I'd like to see
  how it changed.

- **I want to write more.** Not only in this blog, but also fiction. I give a
  fair push every year during the NaNoWriMo, but it's not really my mode of
  writing. I like to take my time, outline things, work out the direction and
  the details and all the little back references into the story. I've got a few
  outlines and a bunch of story starts. And I want to write monthly updates of
  what I've been doing. Weekly is a bit short, given I do most of my
  other-than-work stuff on weekends, but monthly could work. **So I've started
  this blog post.** And I have that one story I think I really like on a front
  burner. We'll see how it goes.

Now, as to what I've been doing in the past month or so:

## Notify

I've released version 3 of my Notify library, and started planning for a next
big refactor. There's a few features I'd really like to get in that require a
completely different architecture than is there right now, and I'd also like to
improve the testability of the entire thing. Notably, I'd like to be able to
use several backend APIs simultaneously, something that I believe would be
fairly unique among other notify libraries and tools. I'm also inspired by the
(general) way nftables is done: instead of providing interfaces that provide
what I think people want, allow them to write _filters_ that are run in the
engine and allow them to get exactly what they mean without me having too large
an API surface.

But really, while I have interesting plans, I don't have enough time to work on
it. It took me a full week to release 3.0.1 with some needed fixes. I'm
terribly grateful to the other contributors who've made this library much
stronger than it was originally. I had no idea, when I started, that this would
become my most starred project to date, _by far_. It's been pretty cool.

## Conlang

I've created a script that I now call "Legola". It's the latest iteration in my
efforts to create a script that can be read the same way no matter the
orientation or direction of the page. Consider latin script (the one you use
reading these words): put it upside down, right to left, or even mirror it and
it becomes much harder to read. Sure, you can train yourself to read in all
directions nonetheless, but still.

This time, I went for something extremely compact: a single glyph is an entire
word. It's based on a line: it starts somewhere (this is clearly marked) and
then as you follow it it turns this way or that way, or encounters some
obstacles. A counter-clockwise turn is the sound 'ey'. A clockwise turn is the
sound 'oh'. Two turns one after the other is 'ah'. A bar crossing the line is
the consonant 'L'. Two small parallel strokes on either side of the line mark
the consonant 'F'. And it goes on.

It's inspired not just by my own previous efforts, but also by two other
constructed languages: the Kelen Ceremonial Interlace Alphabet, and Hangul
(better known as South Korean). Kelen's provided the "line" concept, and Hangul
is I believe one of the only scripts that combine several subglyphs to form
larger glyphs _in 2D space_. I'll do a longer blog post on it when I'm done
hammering it all out.

## Fanfiction

I'm still on a Harry Potter fanfiction bend. Just in the last month, I enjoyed:

- Presque Toujours Pur
- Wand, Knife, and Silence
- Petrification Proliferation
- Harry Potter and the Champion's Champion
- A Second Chance at Life
- Do Not Meddle in the Affairs of Wizards
- Harry Potter and the Gift of Memories
- Harry Potter and the Summer of Change
- Angry Harry and the Seven
- Harry Potter and the Four Heirs
- Harry Potter: Three to Backstep
- Harry Potter and the Sun Source
- Harry Potter and the Invicible Technomage
- In the Mind of a Scientist
- Harry Potter and the Four Founders
- Magicks of the Arcane
- What We're Fighting For
- Partners (by muggledad)
- The Power (by DarthBill)
- Bungle in the Jungle: A Harry Potter Adventure

and I'm currently enjoying the sequel of that last one. It's not looking like
I'll slow down much, either!

## Hardware

I've acquired a HC-SR04 ultrasonic sensor, took out the Tessel 2 I'd ordered
and finally gotten a few months back, and have started on wiring them up
together with the intention of creating a gauge for our water tank, so we can
accurately and easily track our water levels. So far I'm stuck in the actual
detecting-the-signal phase, or is it the is-this-wiring-diagram-right phase? I
can't recall.

## Etc

I've done other things but I think that's the big stuff; the rest is mostly
work-related so does not really belong here. Not a bad month!

[0]: https://twitter.com/neakitten/status/807192118103916545
