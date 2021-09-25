# February 2017

## Writing

I've spent a lot of my weekends writing a Star Wars fanfic. I'm going to finish
it before I publish, to avoid publishing and then abandoning it when I
eventually realise I've written myself into a corner. It's completely outlined,
and I've got some willing and eager proofreaders waiting for it, so I have
hope.

I've already got ideas for a sequel; if there's interest I might be
working on that for a while, too. The sequel will contain [a certain ship].

No title as of yet, working title of my file was SW:E:SI at the beginning of
the month, but what it stood for was already outdated by the time I got to the
middle of the outlining, so I changed it to the non-commital "Master Kylo".
Maybe it will stay that.

[a certain ship]: https://twitter.com/passcod/status/822330577307086849

## 300 Shorts

I've moved my "300 Shorts" collection entirely to this blog, instead of its
previous home on Medium. I've also added an introductory post, which
additionally serves as a common 'parent post' for all the shorts, taking
advantage of my blog engine's capabilities: it will add a link from each entry
to the main post, and add a list (with links) of all the entries onto that main
post.

I've also published two so-far-unpublished pieces from 2016 into this collection.
The first is a short poem written last year: [Unlit]. The second is a sci-fi
story originally written for a contest: [Regulus]. It is accompanied by a few
pages of [notes and commentary].

[Unlit]: ../../../fiction/poetry/unlit.md
[Regulus]: ../../../fiction/shorts/regulus.md
[notes and commentary]: ../../../fiction/shorts/regulus-notes.md

## Backup and Sync

Discovered a very interesting paper, algorithm, and software: [MetaSync]. It
provides a sync utility that can store data across several services and even
replicate this data for maximum reliability and synchronisation speed. I have
yet to evaluate the solution in-depth for my needs, but it certainly sounds
promising.

Ultimately, though, the software is not quite as maintained nor modern as I
would wish it. For this reason, my next large Rust project will be to implement
the pPaxos algorithm, the core metasync library, a CLI frontend and a sync
Daemon, as well as some remote storage adapters (probably starting with
Dropbox, Google Drive, MEGASync), and some local storage middleware (selective
encryption, compression).

I'll probably choose a different name, though, not only to avoid stepping on
toes, but also because I don't quite believe "meta sync" to be a good
descriptor for what this does.

[MetaSync]: https://haneul.github.io/papers/metasync.pdf

## Hyperion

After several years (at least four, but it gets fuzzy before then) of quiet
research and occasional thought, I finally got the last insight into my very own
algorithm for hypergraphs (and their somewhat-optimised subset hypermaps).

My hypergraphs are optimised for a specific query: "give me all the vertices of
all the edges that contain the given vertex." Hyperion executes that for any
arbitrary vertex with the same time complexity as the underlying substrate. For
a HashMap, that's O(1).

Hyperion is also fairly good at memory space: it incurs only a small fixed
overhead per-vertex and per-edge. Other implementations of bimaps, hypermaps, or
hypergraphs use about twice the amount of memory as is input into them.

Using Hyperion is mostly about thinking differently about some data. Once you
understand that you essentially have a structure which can store _associations_
of objects and then retrieve the entire association given _any value within_,
in constant time… once you really understand the idea and start being able to
apply it to problems, that's when it becomes interesting.

Hyperion is not quite ready for publication, but the concept is finished and a
full description of its algorithms — for insert, for query, for modification —
is done in pseudocode. An initial implementation in Rust, some analysis, a few
measurements, and better documentation remain to be completed.
