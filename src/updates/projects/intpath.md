# IntPath

> June 2018 to May 2020

## Pitch

A new library for interned path segments and paths with structural sharing.

String interning is actually a few different programming techniques, which can go from static string
interning, where a bunch of strings that will be used by the application are constants — generally
this is on a larger and more systematic scale than defining a bunch of consts — to language-level
(or VM-level) interning, like Ruby symbols which only exist once in the program, to fully-dynamic
interning with a little runtime.

IntPath is that last one.

Or rather, _IntSeg_ is that last one. IntSeg is based on a global concurrent hash map, which is
initialised on program start. An IntSeg, an interned (path) segment, is an OsString that is stored
uniquely but weakly inside the map, and where every “actual” copy is actually a strong pointer to
that interned value. So every segment is only stored once, no matter where it’s created or accessed
from, and unused segments take up no (actually some, but very little) space.

Then _IntPaths_ are built on top of that as, essentially, a `Vec<IntSeg>`. That makes paths `/a/b/c`
and `/a/b/d` use up only 4 path segments, instead of six. And 100 absolute paths with a common
prefix of 10 segments and a unique suffix of 1 segment will only use 110 segments total.
Additionally, segments don’t care about their position in the string, so the path `/a/a/a/a/a` uses
one segment.

There’s more, but that’s the general idea.

## Media

- <https://twitter.com/passcod/status/1143499298815954944>
- <https://twitter.com/passcod/status/1144899073062735872>

## Outcome

<https://github.com/passcod/intpath>

Idea discontinued once I stopped being involved with Notify, and thus mostly lost the motivation/reason for this.
