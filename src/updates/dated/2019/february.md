# February 2019

## Notify

There’s a bunch of work happening on Notify at the moment. I’ve basically taken
it out of being “frozen” and back into maintainership. I do _not_ want to spend
any significant amount of time on it, but I welcome anyone else to develop
features, fixes, improvements, etc, and I’m doing the actual maintainer thing of
review, advice, guidance, merging things, running rustfmt, keeping CI going, and
generally being an active project once again.

A lot of Big Names use Notify now, and it’s honestly cool. It was mostly
background radiation for a long time, like people used it and some people
contributed features, but it was very quiet, very passive consumership. Now
there’s a lot of good energy and good people doing great work on it, and I’m in
a much better place psychologically, so I think it will regain some shine!

As part of this sorta soft reboot, I went through the entire commit log and
backfilled [the entire changelog](https://github.com/passcod/notify/blob/main/CHANGELOG.md)
down to the very first release, which was fun (if a bit menially tedious).
Notify started pre-Rust-1.0, and that must seem like quite a strange period for
people who haven’t lived it, or even for _me_, now. The past is weird!

## Kai

A project I’ve been wanting to do for ages, but it’s also deceptively big and
really I just put down very minimal bones and some notes and not much else.

The idea started as a “flexible curry recipe generator.” Basically input what
ingredients you have, and it walks you through it. But then I started wanting to
integrate a lot of other things, most importantly something radical: a slider of
“how much time do you want to spend here.”

So the recipe would have all those parts that are timed and possibly ranged as
well, and would cut down the recipe steps and time based on what kind of
timeframe you’re looking at. Sure, caramelising onions makes for deliciousness,
but you _can_ skip it, and in fact you can skip the onions entirely if pressed
for time or if you don’t _have_ onions right this moment. And cutting onions as
fine as possible is an excellent way to caramelise them to perfection, but it
also takes ages, even more without practice, so just a rough chop will do nicely
if you just have to get to it. And that’s just onions! There’s so much more.

The slider would be at the very top, and it would grey out meat/veggie choices
that you just _can’t do_ with that kind of time. Carrots. Potatoes. Some meats.
Etc etc etc.

You should still have a fair amount of choice and diversity at the extreme-low
of the scale. There are some really quick ways to cook a spicy meal that looks
like a curry. But I didn’t want to limit myself to just that, so I called it
‘Kai.’

## Purple Sky

Yay another project!

Actually this one is fairly older, and I’ve been slowly working at it. I'm
ramping up research and prototyping, and some people know what this is, but I’m
also keeping it way under wraps for now. This is something that might actually
turn into something profitable! So that’s exciting.
