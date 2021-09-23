# March 2017

## NZ.js

As this is published, I am at [a JavaScript conference][NZ.js] in Wellington.

Now, as I write this, I have _no idea_, but I'm pretty sure I'm going to love
the talks and keynotes by [@aurynn], [@rockbot], [@riblah], and others.

[NZ.js]: http://conference.javascript.org.nz/
[@aurynn]: https://twitter.com/aurynn
[@rockbot]: https://twitter.com/rockbot
[@riblah]: https://twitter.com/riblah

## Health

In January, I weighed about 87kg. [In February][health-tweet], I got down to
85kg. At the 1st of March, I weighed 84kg. Three weeks prior, my brother, who
is an accomplished (if only by hobby) sportsman, and a second-year Med student,
made the comment that given my stature and eating habits, he expected I could
be _slim_ if I did just a little bit more exercise. Thus, in March, I am upping
my exercise from a 30-minute walk three times a week to the same, but every
day… and with an eye to increase again in, say, two months.

[health-tweet]: https://twitter.com/passcod/status/828706886107082752

## Ops School

I found this: [http://www.opsschool.org/](http://www.opsschool.org/) and have
started on it.

I don't think I want to pivot onto Sysadmin / Syseng roles, but I am always in
quest of knowledge to both make me more effective and combat my (waning,
thankfully) impostor syndrome.

## Master Kylo

Currently going through a second round of detailed outlining, after changing
the start point of the story and some perspective details, as well as a
deepening of the original style. I'm still aiming for at least a beta release
on Star Wars Day, but I may miss the mark.

## Blograph

The engine this blog runs on is a custom-built server designed and implemented
over three years ago when I tired at not having the options I needed, and just
decided to make it my way. However, I also didn't touch it much in those three
years. Over time, some bugs were discovered, a few missing features exposed,
and one large element of the design was never actually used — while creating a
performance limiter nonetheless.

Also, I needed an exercise to get back into Rust.

So I did a blackbox reimplementation of my blog, plus a few missing features,
minus two obsolete ones. I made it a hybrid of Rust and JavaScript, using Neon
to bridge the two. I [blogged about some patterns][neon-post] I encountered
when wrangling the Neon bindings.

The new version has upwards of 300 tests (170 on the Rust side, and more than
that on the JS side), sports a **5x** performance boost, has up-to-spec
CommonMark rendering and new footnote support, and is a lot more _consciously
designed_ instead of haphazardly put together. It's live; you're reading this
article on an instance right now.

[Blograph]: https://github.com/passcod/blograph
[neon-post]: https://blog.passcod.name/2017/mar/05/lighting-up-rust-with-neon

// TODO fix link