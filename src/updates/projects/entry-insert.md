# Hashmap Entry Insert

> September 2020 —

## Pitch

Someone in the community discord wanted a feature and I was like “hey, why not try to implement it,
that could be fun” (based on an existing but obsoleted PR).

```rust,ignore
impl<'a, K, V> Entry<'a, K, V> {
    pub fn insert(self, value: V) -> OccupiedEntry<'a, K, V> {…}
}
```

## Media

- <https://twitter.com/passcod/status/1178568262310879232>
- <https://twitter.com/passcod/status/1180312263925780480>

## Outcome

Currently implemented behind the `#![feature(entry_insert)]` flag.

- <https://github.com/rust-lang/rust/pull/64656>
- <https://github.com/rust-lang/rust/issues/65225>

## Future

The library team has approved it for stabilisation, pending some minor changes. I will get to that…
soonish.
