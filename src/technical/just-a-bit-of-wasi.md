# Just a bit of wasi

> July 2022

## Background

I've been working and helping with [cargo-binstall](https://github.com/ryankurte/cargo-binstall) a lot recently. We're
currently discussing [how to support WASI applications](https://github.com/ryankurte/cargo-binstall/issues/246).

As part of this, one idea for detecting if the host (your computer) supports running WASI programs was to make a small
WASI program, embed it in cargo-binstall, and then we can try running it: if it works, WASI runs on your machine, if
there are any errors, we'll call that a no.

(This means that so far the only way to pass the test is to have an OS which can run WASI programs directly. On Linux,
you can configure that! using [binfmt\_misc](https://en.wikipedia.org/wiki/Binfmt_misc). The hope is that other OSes
will eventually get native WASI support, or something like that Linux capability. We discussed having cargo-binstall
handle making a wrapper that calls a WASI runtime, but haven't yet decided if that's something we want to do. This is
very fresh! We're in the middle of it. Join the discussion on the ticket if you have ideas/desires/commentary! 😸)

So: we need to make a small WASI program. Small enough that we can embed it without suffering. Cargo-binstall has
recently had a big push towards both fast compile times and small binary size, and we don't want to undo that.

## Hello, World!

First idea: start from a [Rust WASI Hello World](https://bytecodealliance.github.io/cargo-wasi/hello-world.html) and
optimise from there.

That tutorial goes to install cargo-wasi, but I thought, hmm, I think we can do simpler.

```console
$ cargo new hello-wasi
$ cd hello-wasi
$ echo "fn main() {}" > src/main.rs
$ rustup target add wasm32-wasi
$ cargo build --target wasm32-wasi --release
```

That's it! No cargo plugin needed. Let's see how small that got...

```console
$ exa -l target/wasm32-wasi/release/hello-wasi.wasm
.rwxr-xr-x@ 2.0M passcod 26 Jul 19:53 target/wasm32-wasi/release/hello-wasi.wasm
```

Gah! Two whole megabytes?!

We could probably optimise this, but it seems like it would be easier to...

## Start from a smaller base

How about we get rid of the standard library? That would help, right? Let's google for
[smallest no\_std program rust](https://docs.rust-embedded.org/embedonomicon/smallest-no-std.html)...

```rust,ignore
#![no_std]

use core::panic::PanicInfo;

#[panic_handler]
fn panic(_panic: &PanicInfo<'_>) -> ! {
    loop {}
}
```

Ok, a program that does nothing, and does nothing on panic, which it won't because it does nothing. I'm sure this will
be smaller. Right?

```console
$ cargo build --target wasm32-wasi --release
$ exa -l target/wasm32-wasi/release/hello-wasi.wasm
.rwxr-xr-x@ 281 passcod 26 Jul 20:01 target/wasm32-wasi/release/hello-wasi.wasm
```

281 BYTES. Ok, now we're cooking.

So, what does it do when run?

```console
$ pacman -S wasmtime
$ wasmtime target/wasm32-wasi/release/hello-wasi.wasm
Error: failed to run main module `target/wasm32-wasi/release/hello-wasi.wasm`

Caused by:
    0: failed to instantiate "target/wasm32-wasi/release/hello-wasi.wasm"
    1: unknown import: `env::__original_main` has not been defined
```

Uhhhhh. That's not good.

## Maybe we do need a main

That program above doesn't have a `fn main()`. Maybe that's what it's complaining about? Let's see:

```rust,ignore
#![no_std]
#![feature(start)]

use core::panic::PanicInfo;

#[panic_handler]
fn panic(_panic: &PanicInfo<'_>) -> ! {
    loop {}
}

#[start]
fn main(_argc: isize, _argv: *const *const u8) -> isize {
    0
}
```

That took [a bit to figure out](https://doc.rust-lang.org/unstable-book/language-features/lang-items.html), but we got
there:

```console
$ cargo build --target wasm32-wasi --release
   Compiling hello-wasi v0.1.0 (/home/code/rust/hello-wasi)
error[E0554]: `#![feature]` may not be used on the stable release channel
 --> src/main.rs:2:1
  |
2 | #![feature(start)]
  | ^^^^^^^^^^^^^^^^^^

For more information about this error, try `rustc --explain E0554`.
error: could not compile `hello-wasi` due to previous error
```

Ah, right:

```console
$ cargo +nightly build --target wasm32-wasi --release
   Compiling hello-wasi v0.1.0 (/home/code/rust/hello-wasi)
error[E0463]: can't find crate for `core`
  |
  = note: the `wasm32-wasi` target may not be installed
  = help: consider downloading the target with `rustup target add wasm32-wasi`
  = help: consider building the standard library from source with `cargo build -Zbuild-std`

error[E0463]: can't find crate for `compiler_builtins`

error[E0463]: can't find crate for `core`
 --> src/main.rs:4:5
  |
4 | use core::panic::PanicInfo;
  |     ^^^^ can't find crate
  |
  = note: the `wasm32-wasi` target may not be installed
  = help: consider downloading the target with `rustup target add wasm32-wasi`
  = help: consider building the standard library from source with `cargo build -Zbuild-std`

error: requires `sized` lang_item

For more information about this error, try `rustc --explain E0463`.
error: could not compile `hello-wasi` due to 4 previous errors
```

What now? ...oh, the target I added earlier was for stable, not for nightly.

```console
$ rustup target add --toolchain nightly wasm32-wasi
$ cargo +nightly build --target wasm32-wasi --release
$ wasmtime target/wasm32-wasi/release/hello-wasi.wasm
Error: failed to run main module `target/wasm32-wasi/release/hello-wasi.wasm`

Caused by:
    0: failed to instantiate "target/wasm32-wasi/release/hello-wasi.wasm"
    1: unknown import: `env::exit` has not been defined
```

Well, at least that's a different error ***I guess***.

## Looking back

Wait, we never tested that first program. Does _it_ work?

```console
$ cp src/main.rs src/not-working.rs
$ echo "fn main() {}" > src/main.rs
$ cargo build --target wasm32-wasi --release
$ wasmtime target/wasm32-wasi/release/hello-wasi.wasm
$ echo $?
0
```

Yep. Sure does.

## Opening it up

How about we disassemble the WASM into WAST (like "assembly" for other targets) and have a look, maybe we can grep for
these `env::exit` and `env::__original_main` to see what they're defined to in the WASI that works, and if they're there
in the WASI that doesn't.

```console
$ pacman -S binaryen
$ wasm-dis target/wasm32-wasi/release/hello-wasi.wasm -o wasi-goes.wast

$ cp src/not-working.rs src/main.rs
$ cargo build --target wasm32-wasi --release
$ wasm-dis target/wasm32-wasi/release/hello-wasi.wasm -o wasi-nope.wast
```

```console
$ rg __original_main wasi-goes.wast -C3
42-   (br_if $label$1
43-    (i32.eqz
44-     (local.tee $0
45:      (call $__original_main)
46-     )
47-    )
48-   )
--
984-  )
985-  (return)
986- )
987: (func $__original_main (result i32)
988-  (local $0 i32)
989-  (local $1 i32)
990-  (local $2 i32)
--
1008- (func $main (param $0 i32) (param $1 i32) (result i32)
1009-  (local $2 i32)
1010-  (local.set $2
1011:   (call $__original_main)
1012-  )
1013-  (return
1014-   (local.get $2)
```

Well, it's definitely in there in the working WASI. Let's look at the not working one:

```console
$ rg __original_main wasi-nope.wast -C3
20-   (br_if $label$1
21-    (i32.eqz
22-     (local.tee $0
23:      (call $__original_main)
24-     )
25-    )
26-   )
--
30-   (unreachable)
31-  )
32- )
33: (func $__original_main (result i32)
34-  (i32.const 0)
35- )
36- (func $main (param $0 i32) (param $1 i32) (result i32)
37:  (call $__original_main)
38- )
39- ;; custom section "producers", size 28
40-)
```

It's definitely in there too. I guess that makes sense, given the first error went away. What about `exit`?

```console
$ rg exit wasi-goes.wast
22: (import "wasi_snapshot_preview1" "proc_exit" (func $__imported_wasi_snapshot_preview1_proc_exit (param i32)))
49:   (call $exit
24306:  (call $__wasi_proc_exit
24573: (func $__wasi_proc_exit (param $0 i32)
24574:  (call $__imported_wasi_snapshot_preview1_proc_exit
24585: (func $exit (param $0 i32)
```

```console
$ rg exit wasi-nope.wast
6: (import "env" "exit" (func $exit (param i32)))
27:   (call $exit
```

Uhh, well, it's different, but it does exist on both sides.

## Or does it?

Actually, with a bit of squinting, the wasmtime error makes sense! In that `wasi-nope.wast` program, we "import"
`env::exit`. And what wasmtime is saying it "nope, I don't have that available." But in the `wasi-goes.wast` program,
we import something else:

```wast
(import "wasi_snapshot_preview1" "proc_exit"
  (func $__imported_wasi_snapshot_preview1_proc_exit
    (param i32)))
```

_That_ looks like it's part of the WASI API, and wasmtime has no issue providing it.

## Do we even need them?

Before we get too far, since we have a small program that fits in one screenful in WAST, and we can assemble WAST into
WASM, we can do some quick and dirty experimentation.

```wast
(module
 (type $none_=>_i32 (func (result i32)))
 (type $i32_=>_none (func (param i32)))
 (type $none_=>_none (func))
 (import "env" "__original_main" (func $fimport$0 (result i32)))
 (import "env" "exit" (func $fimport$1 (param i32)))
 (global $global$0 i32 (i32.const 1048576))
 (global $global$1 i32 (i32.const 1048576))
 (memory $0 16)
 (export "memory" (memory $0))
 (export "_start" (func $0))
 (export "__data_end" (global $global$0))
 (export "__heap_base" (global $global$1))
 (func $0
  (local $0 i32)
  (if
   (local.tee $0
    (call $fimport$0)
   )
   (block
    (call $fimport$1
     (local.get $0)
    )
    (unreachable)
   )
  )
 )
 ;; custom section "producers", size 28
)
```

Let's start by removing the `__original_main` and `exit` imports, and removing mention of these imports (`$fimport$0`
and `$fimport$1`) from what looks like the main function, `func $0`, at the bottom there:

```wast
(module
 (type $none_=>_i32 (func (result i32)))
 (type $i32_=>_none (func (param i32)))
 (type $none_=>_none (func))
 (global $global$0 i32 (i32.const 1048576))
 (global $global$1 i32 (i32.const 1048576))
 (memory $0 16)
 (export "memory" (memory $0))
 (export "_start" (func $0))
 (export "__data_end" (global $global$0))
 (export "__heap_base" (global $global$1))
 (func $0(local $0 i32))
)
```

Does that work?

```console
$ wasm-as hello-wasi.wast -o wasi-reborn.wasm
$ wasmtime wasi-reborn.wasm
$ echo $?
0
```

Whoop! yes it does.

And can we trim that even more?

```wast
(module
 (global $global$0 i32 (i32.const 0))
 (global $global$1 i32 (i32.const 0))
 (memory $0 16)
 (export "memory" (memory $0))
 (export "_start" (func $0))
 (export "__data_end" (global $global$0))
 (export "__heap_base" (global $global$1))
 (func $0 (local $0 i32))
)
```

We sure can. I got there by carefully removing and tweaking things one at a time, but that's what I ended up with. So.
How big is that?

```
$ exa -l wasi-reborn.wasm
.rw-r--r--@ 93 passcod 26 Jul 20:36 wasi-reborn.wasm
```

93 bytes. Well, we can call that done, and

## Is it really WASI though?

Uhh. Well, I guess not? It's "just" WASM stuff, no WASI API. So we'd really be testing for a _WASM_ runtime, not WASI.

Hey, we have that exit function import above, there, can we use that?

```wast
(module
 (global $global$0 i32 (i32.const 0))
 (global $global$1 i32 (i32.const 0))
 (memory $0 16)
 (export "memory" (memory $0))
 (export "_start" (func $0))
 (export "__data_end" (global $global$0))
 (export "__heap_base" (global $global$1))
 (import "wasi_snapshot_preview1" "proc_exit" (func $exit (param i32)))
 (func $0
  (call $exit (i32.const 0))
  (unreachable)
 )
)
```

```console
$ wasm-as hello-wasi.wast -o wasi-revolution.wasm
$ wasmtime wasi-revolution.wasm
$ echo $?
0

$ exa -l wasi-revolution.wasm
.rw-r--r--@ 137 passcod 26 Jul 20:43 wasi-revolution.wasm
```

Okay! 137 bytes, _and_ we're calling a WASI import. Sounds good to me.

## Extra credit

Do we even need the `__data_end`, `__heap_base`, and `memory`? Let's try without:

```wast
(module
 (export "_start" (func $0))
 (import "wasi_snapshot_preview1" "proc_exit" (func $exit (param i32)))
 (func $0
  (call $exit (i32.const 0))
  (unreachable)
 )
)
```

```
$ wasm-as hello-wasi.wast -o wasi-reprisal.wasm
$ wasmtime wasi-reprisal.wasm
Error: failed to run main module `wasi-reborn.wasm`

Caused by:
    0: failed to invoke command default
    1: missing required memory export
       wasm backtrace:
           0:   0x4f - <unknown>!<wasm function 1>
```

That's a nope on the memory, so let's restore that:

```rust
(module
 (memory $0 16)
 (export "memory" (memory $0))
 (export "_start" (func $0))
 (import "wasi_snapshot_preview1" "proc_exit" (func $exit (param i32)))
 (func $0
  (call $exit (i32.const 0))
  (unreachable)
 )
)
```

```console
$ wasm-as hello-wasi.wast -o wasi-renewal.wasm
$ wasmtime wasi-renewal.wasm
$ echo $?
0

$ exa -l wasi-renewal.wasm
.rw-r--r--@ 97 passcod 26 Jul 20:43 wasi-renewal.wasm
```

Full points for me!
