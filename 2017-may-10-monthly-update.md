---
title: "Monthly update: May 2017"
tags:
  - monthly-update
parents:
  - "2017/apr/10/monthly-update"
---

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

## npm 5 beta

I ran npm4 and npm5 installs on some of our actual codebases at work and some
of my own personal ones, and measured the timings and differences. The results
are very exciting! [Read the full post][npm5-diffs].

[npm5-diffs]:

## [Catflap]

A small single-purpose development tool for server reloading. Initially from a
[feature request on Cargo Watch][cw-43], I wrote it instead as a separate tool
for Linux/Mac/Unix. The name [Catflap] is both because it's a small door that
you install so that you don't have to constantly open and close and open and
close a door, and as a play on the `netcat` tool.

[Catflap]: https://github.com/passcod/catflap
[cw-43]: https://github.com/passcod/cargo-watch/issues/43

## Fanfiction

I'm going on a strong Star Wars (all eras confounded) bender. I avoid Kylo/Rey
(extra ew) and Kylo/Hux fics because ew, and I like time travel fix-it fics.
Mostly I've been impressed at the depth and breadth of the verses crafted, and
the large currency held by Queer-abundant fics. It "makes sense" to have
genderqueer and varied sexualities in a universe where there's several dozen
_species_ cohabiting with each other, among a few _thousand_ worlds (sometimes
the scale of it all boggles the mind), but it's heartwarming every time.

I'll certainly be adding a bunch of references and homages to some of the best
fics out there into _my_ fic, mostly in passing-by references to names and
places. If you've been in the fanficdom, you should be able to pick out a few!

Something that's been interesting to notice is fics and authors that were
influenced by the Re-Entry fanfic epic. You see, in Canon (and Legends)
Coruscant has a 24-hour day. In the Re-Entry fanon, though, Coruscant has a
26-hour day. Well, in many non-Re-Entry fics that should AU from Canon or
Legends, and that state it as such, you get mentions of "25th hour" or "there
isn't more than 26 hours in the day" while in the Coruscanti Jedi Temple (or
elsewhere on planet)!

- {SW Legends} The entire [Re-Entry](https://archiveofourown.org/series/10129) and [Journey of the Whills](https://archiveofourown.org/series/11260) corpus. An epic masterpiece. {50k + 1k + 11k + 37k + 18k + 30k + 32k + 27k + 25k + 23k + 25k + 53k + 55k + 2k + 76k + 16k + 28k + 21k + 24k + 7k + 1k + 1k + 17k + 33k + 3k + 6k + 10k + 33k + 9k + 10k + 6k + 36k + 14k + 6k + 7k + 5k + 8k + 10k + 11k + 13k + 12k + 7k + 7k + 10k + 9k + 19k + 8k + 13k + 13k + 12k + 8k + 13k + 11k + 15k + 12k + 7k + 10k + 9k + 20k + 18k + 11k + 21k + 26k + 20k + 21k + 24k + 27k + 33k + 3k + 79k + 22k + 24k + 33k + 2k + 11k words atow}
- {SW} [More Than Our Makers Intended](https://archiveofourown.org/series/392674). Excellent fic both in the romance/ship side and in the PTSD side. Notably, _actually gets_ that Rey comes from a desert-world where water is precious and food was scarce and she is used to work and also not used to have food be guaranteed. Similarly, that Finn was a trooper in an extremely harsh and conditioned army, where even trivial-for-bacta medical issues were more often than not resolved with blaster-aided disappearances. Also great at non-binary and queer genders and sexualities in a wider universe without making it be a super minor discreet story element (like some novels do, like they want to have it but also are afraid to bring it front and center). {26k + 26k + 4k words atow}
- {SW} [Sigh No More](https://archiveofourown.org/works/7916152). Very NSFW, a bit too binary, but sweet. {160k words atow}
- {SW} [Fonder](https://archiveofourown.org/works/6510361). Great representation of Rey as a recovering scavenger and desert-dweller, if a bit too childlike, perhaps. {7k words}
- {SW} [Measure of Force](https://archiveofourown.org/works/7964788). Could be a good prompt, but I'm pretty sure I like Re-Entry's way better (in this metaphor, mixing the two teas until they're balanced). {2k words}
- {SW} [hope lives on](https://archiveofourown.org/works/9005656). Well, that was… interesting. Weird. But, interesting. {7k words}
- {SW} [heart in a headlock](https://archiveofourown.org/works/8987779). Well-written, really, and has good emotions… I would have liked Rogue One to go more like this, I think. The depiction of Leia in this fic helped me re-evaluate a plot point that always bothered me in my fic, and that I'm going to change now. {53k words atow}
- {SW} [Back From the Future: Episode IV The Clone Wars](https://archiveofourown.org/works/10129274). Has a fairly unique narrative style and form that I'm going to liberally borrow from, and not just because it seems tailor-made for my style and cadence of writing. I had been despairing of the glueing work I'd have to do to make my fic work, and the rewriting of scenes to comply with One Narrative, but this is much better. Story-wise, this is well done, both in plot that is organised and yet still surprising, in style which is "crack that takes itself seriously" and manages that perfectly, in humour both wordplay and plot irony and situational, in character development as well as characters stubbornly refusing to change, for good and bad. {107k words}
- {LotR} [Sansûkh](https://archiveofourown.org/works/855528). Another incredible epic fanfic. I really like both the concept and the execution, and have healthy respect for the huge amounts of research and outright creation that must have gone into it. The character growth shown and told for everyone involved is first-rate. The use of Sindarin and Khuzdul is appropriate and not overbearing, which is very well done indeed. And the language style itself, that manner of speaking… I love that. (Also the massive amounts of recursive fanart displayed throughout is both heartening and frankly quite cute.) _AND DID I MENTION the vast diversity of cast!_ Gay/bi are merely common, colour is varying and fine, neuro-atypicals are well-represented, and a/bi/trans-gender characters! That's right, with a plural! Not just two, either. Now _that_'s greatness._ {518k words atow}
