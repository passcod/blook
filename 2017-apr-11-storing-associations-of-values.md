---
date: 2017-04-11T01:09:28+12:00
tags:
  - post
  - datastructure
  - hyperium
---

This is a description of an algorithm for a particular pattern I've encountered
several times throughout my programming and systems designing experience. But
the technique and algorithm is quite simple. So simple, in fact, that despite
having announced this article several times, despite having trawled through
wiki pages and scholarly articles and datastructure collections and not found
an analog, I still hesitated to publish it as I thought, _surely_, _surely_
someone has already done this before. Whether "they" have or not, though… well,
here I go.

The pattern is this: you have a set of values, let's call them _vertices_, and
you want to associate them together, let's call that association an _edge_,
such that later on, given a single _vertex_ you are able to retrieve the _edge_
and all _vertices_ it contains.

The prerequisites are a hash function, let's call it `H()`, and a key-value
store with two functions: `KV.get(key) → value` and `KV.set(key, value)`.

To store the _edge_ containing the _vertices_ `v1`, `v2`, `v3`, you:

1. Compute the hashes of _vertices_:
   - `h1 = H(v1)`
   - `h2 = H(v2)`
   - `h3 = H(v3)`
2. Concatenate these hashes and compute the hash of that:
   - `h_all = H(v1 . v2 . v3)`
3. Store the _vertices_ under that common key:
   - `KV.set(h_all, ntuple<v1, v2, v3>)`
4. Store the common key under the hashes of _vertices_:
   - `KV.set(h1, h_all)`
   - `KV.set(h2, h_all)`
   - `KV.set(h3, h_all)`

Then, to retrieve the _edge_ given a _vertex_ `v`, you:

1. Compute the hash of the _vertex_:
   - `h = H(v)`
2. Retrieve the common key:
   - `h_all = KV.get(h)`
3. Retrieve the _edge_:
   - `ntuple<v...> = KV.get(h_all)`

That's it.

Time requirements are thus `(n + 1) * (H time + KV.set time)` for **set** and
`2 * KV.get + 1 * H` for **get**, where `n` is the number of _vertices_ to be
associated.

And space requirements are `(n + 1)` KV entries, one storing exactly only the
combined size of vertices, and `n` storing exactly only a fixed-size hash.

The datastructure described can be called a "Hypermap", and is a
non-overlapping, non-directed, non-multi Hypergraph. An overlapping Hypergraph
(but still non-directed and non-multi) can be constructed trivially from this.
A Hypermap is also a generalisation of a [Bimap], which can be described as a
Hypermap where _edges_ only contain exactly two _vertices_.

[Bimap]: https://en.wikipedia.org/wiki/Bimap
