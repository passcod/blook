# May 2017

I only started writing this update on the 28th April, so it might be a little
shorter than usual.

## Birthday

May 4th was my birthday, which I learned a few years ago coincides with the
(unofficial) Star Wars Day ("May the Fourth be with you"). I turned 24 this
year. I don't really _feel_ twenty-four, but oh well.

## Star Wars fic

New working title is: **In the pale Darkness of Dawn**. Casing tbc.

Due to conferencing and traveling and [the effect that has on my
writing][tw-writing] as well as a very unfortunate (and frustrating) bout of
flu or cold or whatever in the last week of April, I didn't get as much writing
done as I'd hoped.

I have about 6k of material written, but I do have a fairly large amount of
notes and a good outline for two of the four threads in the fic. So it's not
too bad. And now that I'm nearing the final design of this fic (or have already
achieved it? it's hard to tell), it should go much faster.

The _form_ of the fic has also evolved from more traditional prose in long
sections and chapters, towards smaller single-scene sections ranging from 600
to 1500 words in length each, and then organised in semi-chronological order
and grouped in chapters. It's a particular form, and it provides interesting
possibilities, like making it very easy to present the same scene from multiple
point of views, almost in a side-by-side manner. It's also much closer to my
own 'natural' writing style.

[tw-writing]: https://twitter.com/passcod/status/857427137925529600

## Play By Play

I went to [Play By Play]! Both the festival (for two of the days) and the
conference. I [tweeted a bunch][tw-pbp]. Honestly, I'm not a game developer. I
think it's something I might want to do later on?

Mostly, I went because I wanted to do something different, it sounded like a
cool event, and I knew there would be some great talks at least. (There were!)

So soon after NZ.js(con), it might have been too much city and crowd at once,
though. I was mostly fine during the festival days, which I spent sometimes at
the expo space and a lot walking around Wellington (eating stuff and drinking
coffee and climbing up Mt Victoria like I try to do everytime I go to Welly),
but on the day of the con… I think I blanked out for most of the morning
shuffle, at least until talks started really going. And after the con, I was
definitely frazzled; I was so out of it and wanting _away_ that I walked in
completely the wrong direction for a good kilometre before I realised!

So, I won't be going down to cities and crowdy events for a little bit.

I did get a nice haircut out of it, though.

[Play by Play]: http://playbyplay.co.nz/
[tw-pbp]: https://twitter.com/search?f=tweets&q=%23pbp17%40passcod

## Cargo Watch

I [released Cargo Watch v5.0.0][cw-5]. It's bittersweet because it's kinda
giving up on the original project that made Notify a reality, but I eventually
realised that I really had no interest in implementing and maintaining the
intricacies of process groups and restarting servers on three different
platforms, and that Cargo Watch is a _cargo tool_.

So now we embed [watchexec], which does all the stuff I don't want to do way
better than I would ever have done, and leaves me to crafting a cargo-focused
experienced, with cargo-specific features, and geared precisely at development
workloads and use cases. It feels like a breath of fresh air.

[cw-5]: https://github.com/passcod/cargo-watch/releases/tag/v5.0.0
[watchexec]: https://github.com/mattgreen/watchexec

## Docker on BSD

I briefly attempted to get Docker running on FreeBSD (the native
implementation) in the view of running Kubernetes on FreeBSD on Digital Ocean,
but quickly got disabused of that notion when I tried running trivial
containers and got fatal and critical errors straight out of the gate. So much
for that idea.

## [Catflap]

A small single-purpose development tool for server reloading. Initially from a
[feature request on Cargo Watch][cw-43], I wrote it instead as a separate tool
for Linux/Mac/Unix. The name [Catflap] is both because it's a small door that
you install so that you don't have to constantly open and close and open and
close a door, and as a play on the `netcat` tool.

I was initially skeptical of the benefits, but testing it convinced me!

[Catflap]: https://github.com/passcod/catflap
[cw-43]: https://github.com/passcod/cargo-watch/issues/43
