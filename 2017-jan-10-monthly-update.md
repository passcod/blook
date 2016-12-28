---
tags:
  - monthly-update
parents:
  - "2016/dec/10/blogging-more-and-starting-on-new-year-resolutions-early"
---

## Backup & Sync

I've been outlining and tentatively speccing out my "perfect" backup and sync
solution. I briefly toyed with making it closed-source (to start with) but no,
if anything comes out of it, it will be open-source just like everything else.

The ideas mostly come from missing a decent and modern syncing and backup
daemon for Linux **and** other platforms. Something fire-and-forget, quietly
working to provide the best it can without disrupting you. Something that can
efficiently protect against ransom/encryption worms. Something that can be
paused to save bandwidth yet still sync the most important things right now so
you can work collaboratively on mobile connections and not have last night's
photos clog your upwards link. Or, even better, something that figures out that
you're on a slow connection and automatically prioritises syncs and backups
without intervention at all.

Behind it, a library and utility that efficiently and correctly syncs a local
and a remote, as a daemon and not just a single invocation (because Rsync
already exists), that works on all major platforms, and completely handles that
state may change on either side during its run. More than that, a library that
does not mandate the actual transport or endpoints, so it can be used to power
sync engines for not only my "something" above, but also Google Drive, Dropbox,
etc third-party clients.

## Rust

I've [released Cargo Watch 3.1.1][watch-3.1.1], a minor update to upgrade
dependencies, notably the Notify library to version 3. That brought event
debouncing, which should solve a few of the most common issues encountered.

Nonetheless, Cargo Watch has been more or less supplanted by [watchexec], which
I have to admit is a superior albeit more generic alternative. I'm debating
retiring Cargo Watch, and focusing instead wholly on Notify. That, or making
Cargo Watch into more of a development tool than it was, and integrating
features such as port and socket management as first-class features, perhaps
combining the essential functionality of Node's [nodemon] and Ruby's [foreman]
into a single tool for the Cargo/Rust ecosystem.

[foreman]: https://github.com/ddollar/foreman
[nodemon]: https://github.com/remy/nodemon
[watch-3.1.1]: https://twitter.com/passcod/status/813691373643698176
[watchexec]: https://github.com/mattgreen/watchexec

## 🂻

Not sure where I encountered this, but it's a Jack of Hearts. (In case you
can't see, the title of this section is the Unicode symbol for that playing
card.) Think "Jack of all trades". It means (apparently, and that's how I use
it for me) "pan/bi-amorous and poly-amorous".

## Music

I didn't listen to anything new until the New Year, as is my habit. During the
year, all the music I like goes into a big playlist called "Sort". Then at the
end of the year I pick a name for my yearly playlist based on stars (first one
was "Level Orion", then came "Rain Stars", "Llama Shepherd", and this year's
"Carrier of the Dawn"), and go through the Sort playlist sequentially, either
discarding or sorting into the yearly playlist and/or any of the few thematic
playlists I maintain ("Music for Making" for writing/coding music, "Sing",
"Music Box" for songs I'd like to cover, etc).

This year the "Sort" playlist counted over 450 songs, and took me about two
weeks to go through. The "Carrier of the Dawn" playlist now numbers NNN tracks.

While last year my listening was dominated by [Blue Man Group], [Eiffel], and
[Woodkid], this year I've enjoyed a lot of [Jin Oki], [Thomas Bergensen], [Zero
7], [Ásgeir], [Hiromi], and some 19th century compositors like Chopin and
Beethoven. Of course, the full list is much more varied than just these seven.

In the past 10 days I've started listening to new music again.

[Blue Man Group]: https://www.blueman.com/
[Eiffel]: http://www.eiffelnews.com/
[Woodkid]: http://www.woodkid.com/
[Jin Oki]: http://jinoki.net/
[Thomas Bergensen]: http://www.thomasbergersen.com/
[Zero 7]: http://zero7.co.uk
[Ásgeir]: https://www.asgeirmusic.com/
[Hiromi]: http://www.hiromiuehara.com/

## Fanfiction

- {HP} [Prodigy](https://www.fanfiction.net/s/3415504/1/Prodigy).

  Pretty good. I liked the modern take. A bit *too* prodigious perhaps, but
  that's what the title announced so who's complaining? Waaay crazy story. Do
  not read in more than one sitting, because there is SO MUCH SHIT HAPPENING
  and you'd end up horribly confused. Great stuff. {135k words}

- {HP} [Yet Another Universe](https://www.fanfiction.net/s/6320683/1/Yet-Another-Universe).

  Well written. The sequel is good too, albeit much more brutal, and abandoned.
  {65k words + 33k sequel}

- {HP} [893](https://www.fanfiction.net/s/7161848/1/893).

  Great story, good writing. Unsure how accurate the Japanese/Yakuza details
  are (but it's gotta be better than Rowling's own attempts at representing
  asian ~~stereotypes~~ characters), and the large amount of Japanese words and
  phrases embedded in the text make it somewhat tougher to read than usual.
  {360k words}

- {HP} [Return of the Marauders](https://www.fanfiction.net/s/5856625/1/The-Return-of-the-Marauders).

  Consistently bad spelling and borderline grammar, but enjoyable story.
  Interesting original material. A bit too much angst at times. {370k words}

- {HP} [Harry Potter and the Connection Reversed](https://www.fanfiction.net/s/9132770/1/Harry-Potter-and-the-Connection-Reversed).

  Very amusing little short. A bit of a Deus Ex on that Horcrux business, but
  nevermind the details, there's not enough space for them anyway. {9.5k words}

- {HP} [Harry Potter and The Acts of Betrayal](https://www.fanfiction.net/s/3807777/1/Harry-Potter-and-The-Acts-of-Betrayal).

  Short and sweet. Yes, the story manages to be sweet even while including
  graphic depictions of sexual assault. Cathartic ending and skillful munchkin
  lawyering. The last author note illustrates well the utter ridiculousness and
  sheer contrarian nature of some of the cretinous parts of fandom. {78k words}

- {HP/Dresden} The Denarian Trilogy: [Renegade](https://www.fanfiction.net/s/3473224/1/The-Denarian-Renegade), [Knight](https://www.fanfiction.net/s/3856581/1/The-Denarian-Knight), and [Lord](https://www.fanfiction.net/s/4359957/1/The-Denarian-Lord).

  Good writing, great humour, manageable gore and satisfying battle scenes. Oh,
  and let's not forget the lore and world-building of epic proportions. The
  finale in **Lord** was exactly what was needed. There are supposedly
  continuations, but do yourself a favour and ignore both **Variation** and
  **Apocalypse**. They're unfinished, apparently abandoned, and reek of Bad
  Sequel Syndrome. The only worthwhile point of note is that indeed (rot13)
  Nznaqn Pnecragre unq n puvyq sebz ure rapbhagre jvgu Uneel. Fur'f anzrq Yvyl
  Pnecragre naq vf nccneragyl cerggl phgr. And with that, the last plot point
  of the series is concluded. {235k + 190k + 245k + 23k words}

- {HP} The Firebird Trilogy: [Son](https://www.fanfiction.net/s/8629685/1/Firebird-s-Son-Book-I-of-the-Firebird-Trilogy), [Song](https://www.fanfiction.net/s/9646669/1/Firebird-s-Song-Book-II-of-the-Firebird-Trilogy), and [Fury](https://www.fanfiction.net/s/10373959/1/Firebird-s-Fury-Book-III-of-the-Firebird-Trilogy).

  Despite claiming, as is usual, that all belongs to Rowling, this fic really
  only uses the characters and some general elements of plot. The universe is
  one of the most original I have ever read. It is an utterly different world,
  and extremely well built and detailed. Not content to be defined over a few
  departure points, it is rich of several dozen centuries of history with a
  particular focus, due to the story, around Europe, the British Isles, and the
  Americas. But this world is dark and cruel and bleak, and that itself is a
  terrible understatement. Content warnings for sexual and otherwise abuse,
  exploitation, horror... and yet that feels like too little said. It is a very
  good work. It surpasses many original, published, novels I have read in the
  genre. But while it hooked me and wouldn't let me go as I devoured it, each
  further installment shook me deeper. Even with an active imagination and few
  of the 'moral' blockers on thought most my peers have, this world and its
  inhabitants shocked me in their depravity and casual evil, but most
  importantly, in the way it showed every single cause and character as
  believing they were in the right, even while performing and perpetuating
  wickedness, resulting in institutionalised malevolence in every situation and
  at every level of society. Even the heroes, the protagonists, the good ones,
  those trying to quite literally save the world from itself, are merely
  _questionably good_ most of the time. It is a dark, dark work, but it is
  very, very good. It'll haunt me for a while. If you at all can, **read it.**
  {170k + 150k + 170k words}

- {Naruto} [Life in Konoha's ANBU](https://www.fanfiction.net/s/7977390/1/Life-in-Konoha-s-ANBU).

  Interesting format, with distinct arcs corresponding to Naruto's missions
  instead of a single continuity of plot. It makes the whole thing more
  approachable, and sets clear expectations around the progression of a
  particular writing stint. Unfinished, but not abandoned; there are long-term
  plot lines still in suspens (and I'm not talking about the canon plot lurking
  in the background, rather about the original plot lines that make it all
  interesting). {370k words at time of writing}

- {HP} [Gryffindors Never Die](https://www.fanfiction.net/s/6452481/1/Gryffindors-Never-Die).

  That was fun! {75k words}

- {HP} [To Be Loved](https://www.fanfiction.net/s/5599903/1/To-Be-Loved).

  Interesting prompt, and although the latter plots were a bit simplistic, I
  liked the politics, as well as the occasional insight into Dumbledore's
  thinking. {95k words}

- {HP} [The Bonds of Blood](https://www.fanfiction.net/s/5435295/1/The-Bonds-of-Blood).

  I really like Darth Marrs' writing. The emotions and complexity of every
  character are well-rendered, the plots are well-rounded, and the suspens is
  heart-wrenching. Yes, I have shed some tears and my heart has hurt. It's not
  the best fic on this list, and it was a short fun read, despite all the
  feels, but it was pretty good. {190k words}

