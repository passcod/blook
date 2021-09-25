# Sassbot

A Discord bot for a local writer/nanowrimo group.


## Rogare (Ruby)

> May 2014 to December 2020

### Pitch

It’s a custom Ruby bot with its own custom framework. Originally it grew from an IRC bot using the
Cinch framework, but when the community moved to Discord the framework got adapted, and then
refactored. The bot has a low key sassy attitude, provides a bunch of common small tools (like dice,
random pickers and choosers, writing prompts, etc), but also has a pretty good “wordwar”
implementation, and its prized jewel: a name generator seeded from some 150 000 actual names from
various sources.

### Outcome

Served us well, now at rest: <https://github.com/storily/rogare>.


## Garrīre (Rust, Serenity)

> July 2019 to April 2020

### Pitch

I wanted to get locales in there as well as voice, and the Ruby implementation just wasn't solid
enough for this kind of thing. There’s also a lot of cruft in rogare I’d like to avoid, bringing
over only the Good Parts.

### Outcome

<https://github.com/storily/garrire/tree/serenity>

Superseded by [Accord](accord.md)-based implementation.


## Garrīre (PHP, Ruby, Rust)

> Since September 2020

### Pitch

With Accord, the bot is polyglot, so parts can be written in whatever makes the most sense for it:

- Top level routing: Nginx.
- PHP for most commands. Cool features: every request, ie. every command run, is isolated; standard library is large and ecosystem very mature; changes are live instantly.
- Static help files generator: Ruby.
- `!calc` command: [Rhai](https://rhai.rs), via Rust, via PHP FFI.

### Outcome

<https://github.com/storily/garrire>

In production.


## Future

If Accord moves to a gRPC model, Sassbot will of course follow.
