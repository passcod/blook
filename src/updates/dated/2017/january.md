# January 2017

## New Keyboard

I finally caved and [pre-ordered][kb-tweet] a [Keyboard.io Model 01][kb]. This
is an incredible-looking keyboard, carved out of solid wood, with an ergonomic
split configuration, individually-sculpted keycaps, and all the trimmings. It's
a treat. I've been lusting over it for over a year, following their production
newsletter. I've finally decided just before the new year (the "deadline" in
the tweet refers to them giving away an extra keycap set if pre-ordered before
the end of 2016) that I deserve to spend a bit of money on myself, so let's go.

They're hoping for a delivery around Q1 2017, I'm hoping to have it before May.

[kb]: https://shop.keyboard.io
[kb-tweet]: https://twitter.com/passcod/status/814001529057226755

## New laptop?

Not for me, yet. But my brother is looking into an upgrade before starting his
second year at Uni (he got into med!) and was especially interested in the
Surface Pro. One hitch: they're _very_ expensive.

We may have just found out a trick, though: by getting it [through Amazon US]
and shipping it here, we save about $600 NZD off the in-NZ price, even if we
get it at the cheapest source here. We're looking hard to see if there's a
catch, but so far everything looks a-ok.

So if you're looking for a Surface Pro…

[through Amazon US]: https://www.amazon.com/gp/product/B01606IDL0?tag=laptop-magazine-20&th=1

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

(This isn't new this month, but I got a question about it the other day.)

Not sure where I encountered this, but it's a Jack of Hearts. (In case you
can't see, the title of this section is the Unicode symbol for that playing
card.) Think "Jack of all trades". It means (apparently, and that's how I use
it for me) "pan/bi-amorous and poly-amorous".

## Music

I didn't listen to anything new until the New Year, as is my habit. During the
year, all the music I like goes into a big playlist called "Sort". Then at the
end of the year I pick a name for my yearly playlist based on stars (first one
was "[Level Orion]", then came "[Rain Stars]", "[Llama Shepherd]", and this
year's "[Carrier of the Dawn]"), and go through the Sort playlist sequentially,
either discarding or sorting into the yearly playlist and/or any of the few
thematic playlists I maintain ("[Music for Making]" for writing/coding music,
"Sing", "Music Box" for songs I'd like to cover, etc).

This year the "Sort" playlist counted over 450 songs, and took me about two
weeks to go through. The "Carrier of the Dawn" playlist now numbers 224 tracks.

While last year my listening was dominated by [Blue Man Group], [Eiffel], and
[Woodkid], this year I've enjoyed a lot of [Jin Oki], [Thomas Bergensen], [Zero
7], [Ásgeir], [Hiromi], and some 19th century compositors like Chopin and
Beethoven. Of course, the full list is much more varied than just these seven.

In the past 10 days I've started listening to new music again.

[Blue Man Group]: https://www.blueman.com/
[Carrier of the Dawn]: https://play.spotify.com/user/passcod/playlist/4ROxOg5BYFe4SXo8YLEXrR
[Eiffel]: http://www.eiffelnews.com/
[Hiromi]: http://www.hiromiuehara.com/
[Jin Oki]: http://jinoki.net/
[Level Orion]: https://play.spotify.com/user/passcod/playlist/5wS0AZ6nQ5BUGt36jYbvo0
[Llama Shepherd]: https://play.spotify.com/user/passcod/playlist/5NtXFS8YFZtnDRvPNmKPOy
[Music for Making]: https://play.spotify.com/user/passcod/playlist/15G3i15GTFluL6jgwj7f70
[Rain Stars]: https://play.spotify.com/user/passcod/playlist/5zkHK8ynwd3NdiAbA7Q8lK
[Thomas Bergensen]: http://www.thomasbergersen.com/
[Woodkid]: http://www.woodkid.com/
[Zero 7]: http://zero7.co.uk
[Ásgeir]: https://www.asgeirmusic.com/
