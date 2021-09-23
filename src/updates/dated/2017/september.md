# September 2017

## Poetry imports

I “imported” (as in, moved/copied from elsewhere onto this blog) three poems,
one song, and one very short piece of absurd fiction:

- [Only One Left](https://blog.passcod.name/2009/jul/28/only-one-left)
- [Slowly](https://blog.passcod.name/2013/nov/24/slowly)
- [so many alone at night](https://blog.passcod.name/2014/aug/16/so-many-alone-at-night)
- [Up Up And Away](https://blog.passcod.name/2014/feb/08/up-up-and-away)
- [ali.vei.nth.eni.ght](https://blog.passcod.name/2015/jan/10/alive-in-the-night)

// TODO: fix links

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
metaphor for what it is they do. (Nominative gerund = "Verbing" used as a noun.)

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
