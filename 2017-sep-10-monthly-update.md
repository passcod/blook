---
# vim: tw=80
title: "Monthly Update: September 2017"
tags:
  - monthly-update
parents:
  - "2017/aug/10/monthly-update"
---

## Poetry imports

I “imported” (as in, moved/copied from elsewhere onto this blog) three poems,
one song, and one very short piece of absurd fiction:

- [Only One Left](https://blog.passcod.name/2009/jul/28/only-one-left)
- [Slowly](https://blog.passcod.name/2013/nov/24/slowly)
- [so many alone at night](https://blog.passcod.name/2014/aug/16/so-many-alone-at-night)
- [Up Up And Away](https://blog.passcod.name/2014/feb/08/up-up-and-away)
- [ali.vei.nth.eni.ght](https://blog.passcod.name/2015/jan/10/alive-in-the-night)

## Dawnverse

I published another snippet, but this time not from Naema. I feel like posting
more of these, but for now that’s all I have that’s not full of "TK" editing
annotations and placeholders, and that’s standalone enough that it actually
makes sense without too much context.

[In that bright land from which I come](http://archiveofourown.org/works/11809908).

Writing Naema is going well, despite work being more tiring than I'd thought
this past two weeks, which has slowed down writing a bit. Nonetheless, I stick
for now by my estimate of being done by Yule.

## Cogitare

After unsuccessfully trying, for two weeks, to create a backend for Cogitare
first in Node.js, and then in Rust, I turned to PHP and pumped out a working
read-only backend with all the bells and whistles in four hours, with the rest
of the features to be finished today.

I've also rebranded all components of Cogitare to have consistent naming: they
are now all named after the nominative gerund of a Latin verb that could be a
metaphor for what is is they do. (Nominative gerund = "Verbing" used as a noun.)

Doing so, I've noticed that the entire thing comes together as using each of my
four main languages, that I know in reasonable depth and use often.

- **Cogitare: thinking.** The ensemble (and the website, by association). _Node_
- **Legare: reading.** Parsing and normalising services. _Rust_
- **Dicere: telling.** API and backend. _PHP_
- **Rogare: asking.** IRC bot. _Ruby_

Cogitare as it stands can be seen at [cogitare.nz](https://cogitare.nz).

## Meta

Someone asked how I edit those updates. Here's how:

![A list of commits that have gone into this update so far](https://i.imgur.com/dqHeo63.png)

I have two scripts that I use extensively:

- `.bin/monthly` opens the current monthly update, creating it if needed
- `.bin/fanficline` takes any fanfic URL, fetches and parses metadata, and
  outputs a line of markdown formatted according to my conventions. It's used
  with vim's `r!` command, which inserts the output of a command in the buffer.

Each fanfic entry is written and committed (using the initials of the fic)
shortly (often _immediately_) after I read it.

For everything else, I write up what I've done in the month as I think of
including it, per section. Everything is pushed to the blog posts' repo as I
write, which updates the live blog instance.

Blograph supports future-dated posts, so provided I know the URL of a post, I
can see how it renders before it actually gets published. Publication is a
passive process: when the time rolls over, new requests to the blog's front
page, tags, feeds, previous and parent posts, etc get the “new” link. There's no
manual intervention at all.

I generally schedule a tweet with the update's link and a few words about its
contents at 1pm NZ time on the day it publishes, and use that morning to check
over the post, its render, and links, to make sure it's fine. Sometimes I miss a
few things, which I fix and push out very soon after publication.

I find that this mode of updating not only makes sure I write things as they are
fresh in mind, but also makes sure that I write _continuously_ throughout each
month, instead of only doing a burst of writing up an update at the end of a
month. It also makes the commitment much easier to bear, given I only ever have
to write in tiny blobs of relevant-now content, and not write an entire
multi-thousand-word update in one go.

While some updates have been lighter in content than others, I haven't missed
any. I've spent the year so far writing more each month than I did in the
entirety of 2016, and that feels absolutely awesome.

## Donations

I started my round of selecting organisations and making donations for this
year. I have chosen to give 5% of my average gross salary for the year, which
adds up to $2750, and exclude Patreon from that.

## Fanfiction

As usual, only “good enough to be listed” newly-read fics are, well, listed, and
not everything I’ve read during the month. Especially recommended fics are in
**bold**.

 - {SW} [The Exchange](https://archiveofourown.org/works/8911009). {58k words atow}
 - {SW} [Pay it Forward](https://archiveofourown.org/works/9470711). {20k words atow}
 - {SW} [Righteous](https://archiveofourown.org/works/8362984) and sequels: [The Framing of a Braid](https://archiveofourown.org/works/9212000), [Many Blood Sucking Creatures](https://archiveofourown.org/works/10676829), [Too Many Pirates](https://archiveofourown.org/works/11086128). {2K + 3k + 4k + 18k words atow}
 - {SW} [Burnt Edges](https://archiveofourown.org/works/2536406). {33k words}
 - {SW} [Lingering Doubt](https://archiveofourown.org/works/11786151). {10k words}
 - {Avatar} [Touch and Go](https://archiveofourown.org/works/240250). {4k words}
 - {Avatar} [Cauterize](https://archiveofourown.org/works/240262). {13k words}
 - {Avatar} [The Compass Points North](https://archiveofourown.org/works/240279). {32k words}
 - {Avatar} [Toward The Rising Sun](https://archiveofourown.org/works/240285). {31k words atow}
 - {SW} **[Cataclasm](https://archiveofourown.org/works/10803201)**. {43k words atow}
 - {SW} [The Right Path](https://archiveofourown.org/works/5571483). {5k words}

 - {SW} [Amid the Shadow](https://archiveofourown.org/works/10756650).

   There really ought to be a rating in between ‘Teen and up’ and ‘Adult’.
   {33k words atow}

 - {SW} [Of marriage](https://archiveofourown.org/works/8451358). {10k words atow}

 - {SW} **[Lead Me From Fear To Love](https://archiveofourown.org/works/7394932)**.

   This is an excellent fic, if very graphic given its premise and content.
   There is little that I dislike about it: most of that is the lack of
   proofreading consistent throughout. It’s not badly written, but there’s words
   missing, awkward wording, common typos, etc. The story is well-organised into
   arcs and subarcs and side-stories, with very good blending and threading so
   while you can see the different arcs, they don’t feel disjointed at all. The
   principles that the Jedi are orienting themselves towards is also a great
   boon to me, as it is exactly the kind of thing one group in my Dawnverse is
   going for, so it’s giving me both confirmation and ideas on how to write it.
   Heartily recommend, albeit with warnings for very graphic violence and abuse.
   {218k words atow}

 - {SW} [Master Kenobi](https://archiveofourown.org/works/8828086). {1k words}
 - {SW} [Course Correction](https://archiveofourown.org/works/8339320). {3k words atow}
 - {SW} [Offset](https://archiveofourown.org/works/7735549). {65k words}
 - {SW} [Deadeye](https://archiveofourown.org/works/5621677). {73k words atow}
 - {SW} [Where Shall We Three Meet Again?](https://archiveofourown.org/works/7490736). {47k words atow}
 - {SW} [Everyone Deserves Someone Who Cares](https://archiveofourown.org/works/6029284). {12k words atow}
 - {SW} [Champion of the Force](https://archiveofourown.org/works/6186844). {18k words atow}
 - {SW} [Deviation](https://archiveofourown.org/works/7665625). {48k words atow}
 - {SW} [I Didn't Believe Them/When They Called You/A Hurricane Thunderclap](https://archiveofourown.org/works/5276975). {32k words}
 - {SW} [these are the good old days](https://archiveofourown.org/works/7534435) and [set this dance alight](https://archiveofourown.org/works/8402176). {2k + 3k words atow}
 - {SW} **[In a Lonely Place](https://archiveofourown.org/works/259403)**. My dear heart, it has fluttered off and gone upon the reading of this fic. {81k words}
 - {SW} [Kindling](https://archiveofourown.org/works/8991613), [Fuel](https://archiveofourown.org/works/9305006), [Smolder](https://archiveofourown.org/works/9375212), [Flare](https://archiveofourown.org/works/9395333), [Stoke](https://archiveofourown.org/works/9534137/chapters/22083500), [Furnace](https://archiveofourown.org/works/10685739). {17k + 1k + 2k + 8k + 18k + 20k words}
 - {HP/SW} **[rise like a phoenix in the desert winds](https://archiveofourown.org/works/8624473)**. {39k words}
 - {HP/SW} [like a phoenix from the ashes](https://archiveofourown.org/works/8779825). {9k words}
 - {HP/SW} [they say that life is full of second chances](https://archiveofourown.org/works/8797453). {6k words}
 - {SW} [Against the odds](https://archiveofourown.org/works/8915611). {31k words}

 - {SW} **[On the Edge of the Devil's Backbone](https://archiveofourown.org/works/4417469)**.

   I'm running out of nice things to say about fics. Assume the details: it's a
   great fic, well-written, good arcs, awesome concept, etc. What I found really
   interesting about it is the point of view of people under an authoritarian
   regime. There's not much by people who enjoy serving under it, and not much
   by people who resist, although there's a bit of both. No, what's there most
   is people who believe they're doing the right thing, for very good reasons,
   who are _loyal_ to the regime, when they really really shouldn't be. There's
   people destroying themselves to survive, at any cost. It's a story about
   shades of people operating in a shady world where no circumstance, no
   decision, is ever black and white, right or wrong, wholly good or wholly
   evil. It's a convincing and chilling perspective, especially here, today.
   {282k words atow}

 - {SW} [A Million More Deaths](https://archiveofourown.org/works/8995900). {3k words}
 - {SW} [What's An Angel?](https://archiveofourown.org/works/2802527). {5k words}
 - {SW} [who cares about your lonely heart](https://archiveofourown.org/works/4177608). {28k words}
 - {SW} [Clarity](https://archiveofourown.org/works/6369427). {74k words atow}
 - {SW} [semantics series](https://archiveofourown.org/series/631220). {13k words}
 - {SW} [once there was series](https://archiveofourown.org/series/411522). {54k words atow}
 - {SW} [Though I Never Dared Dream](https://archiveofourown.org/works/5109065). {40k words atow}
 - {SW} [Livewire](https://archiveofourown.org/works/8916019). {28k words}

 - {SW} **[On Ebon Wings, Ere I Breathe](https://archiveofourown.org/works/259396)**.

   There are many good fanfictions, and many good books, but there are few great
   ones. This is one of them. Like many, it was written over a long time,
   refined and cultivated. It marries story, originality, and emotion in one big
   happy polyamorous family, and the climaxes are exhalting if terribly shaking.
   And of course, nothing is a coincidence, and everything is fucking poetry. A
   delight. {117k words}

 - {SW} [We've Been Here Before](https://archiveofourown.org/works/9338369). {6k words}
 - {SW} [Five](https://archiveofourown.org/works/6598681). {31k words atow}

## Films

This is a new section, where I’ll list films and movies I watched this month and
think are good enough to be listed.

 - [After the Storm](https://en.wikipedia.org/wiki/After_the_Storm_(2016_film)),
   _Hirokazu Koreeda_.

 - [Queen of Katwe](https://en.wikipedia.org/wiki/Queen_of_Katwe),
   _Mira Nair_.

 - [The Tale of the Princess Kaguya](https://en.wikipedia.org/wiki/The_Tale_of_the_Princess_Kaguya),
   _Studio Ghibli_.

 - [Hidden Figures](https://en.wikipedia.org/wiki/Hidden_Figures),
   _Theodore Melfi_.

 - [Moonrise Kingdom](https://en.wikipedia.org/wiki/Moonrise_Kingdom),
   _Wes Anderson_. (A rewatch.)
