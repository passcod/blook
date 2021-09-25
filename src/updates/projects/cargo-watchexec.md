# Watchexec family

> Since August 2014

## Pitch

The watchexec family of Rust crates:
- Watchexec the library, to build programs that (by and large) execute commands in response to filesystem events.
- Watchexec the CLI tool, a general purpose tool which does this.
- Cargo Watch CLI tool, a Cargo extension which does this for Rust projects.
- ClearScreen, a library for clearing the terminal screen (which is not as simple as you’d think).
- Command Group, a library to launch programs in a process group (unix) or under job control (windows).

## Current work

A large refactor/rewrite of the Watchexec library to support many long-desired features and future development:
<https://github.com/watchexec/watchexec/issues/205>
