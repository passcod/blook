# Rust crimes: Enum ints

1. > cursed thought: rust enums are expressive enough that you dont really need "built in" types. you can express everything with just enums...

    ~[Boxy](https://twitter.com/EllenNyan0214/status/1443349026624126979)

2. > does this mean u8 can move to a crate?

    ~[Kate](https://twitter.com/thingskatedid/status/1443442125002080257)

3. > Please Kate, this is my worst nightmare. I have dependency minimization brain along with use-the-smalleet-int-possible brain. They are terminal and often co-morbid.

    ~[genny](https://twitter.com/gennyble/status/1443444518758621188)

4. > dw we can't actually do this as there's no way to disambiguate the values.

    ~[jubilee](https://twitter.com/workingjubilee/status/1443449846501765126)

Okay, so, what does this mean?

Well, in Rust you can wildcard import names into your scope:

```rust
use std::sync::atomic::*;

let a = AtomicU8::new(0);
a.store(1, Ordering::Relaxed);
```

And sometimes different things have the same name:

```rust
use std::cmp::*;

assert_eq!(
    max(1, 2).cmp(&3),
    Ordering::Less
);
```

So if you try to wildcard import names where there's an overlap…

```rust
# #![allow(unused_imports)]
use std::sync::atomic::*;
use std::cmp::*;
# fn main () {}
```

```text
$ rustc wild.rs

[Exit: 0]
```

Huh.

Oh, right, you have to actually use something that's ambiguous:

```rust,ignore
# #![allow(unused_imports)]
use std::sync::atomic::*;
use std::cmp::*;

# fn main () {
dbg!(Ordering::Relaxed);
# }
```

And now you get an error:

```text
$ rustc wild.rs

error[E0659]: `Ordering` is ambiguous (glob import vs glob import in the same module)
 --> wild.rs:7:8
  |
7 |   dbg!(Ordering::Relaxed);
  |        ^^^^^^^^ ambiguous name
  |
note: `Ordering` could refer to the enum imported here
 --> wild.rs:3:5
  |
3 | use std::sync::atomic::*;
  |     ^^^^^^^^^^^^^^^^^^^^
  = help: consider adding an explicit import of `Ordering` to disambiguate
note: `Ordering` could also refer to the enum imported here
 --> wild.rs:4:5
  |
4 | use std::cmp::*;
  |     ^^^^^^^^^^^
  = help: consider adding an explicit import of `Ordering` to disambiguate

error: aborting due to previous error

For more information about this error, try `rustc --explain E0659`.

[Exit: 1]
```

So, if you were to try to make integers be an external crate that you wildcard-imported into the
scope, which could potentially look like this:

```rust,ignore
use ints::u8::*;
# fn main () {
assert_eq!(1 + 2, 3);
# }
```

That would work, but as soon as you try to use multiple integer widths:

```rust,ignore
use ints::u8::*;
use ints::u16::*;
# fn main () {
assert_eq!(1 + 2, 3);
# }
```

You'd run into issues, because both `ints::u8` and `ints::u16` contain 1, 2, 3…

Also, currently integer primives in Rust would totally clash:

```rust,ignore
use u2::*;
enum u2 { 0, 1, 2, 3 }
# fn main () {
assert_eq!(0, 0);
# }
```

```text
$ rustc nothing-suspicious-here.rs
error: expected identifier, found `0`
 --> nothing-suspicious-here.rs:3:11
  |
3 | enum u2 { 0, 1, 2, 3 }
  |           ^ expected identifier

error: aborting due to previous error

[Exit: 1]
```

Right, it doesn't even let us out of the gate, because identifiers cannot be digits.

Hmm, maybe we can add an innocent-looking suffix there to bypass that silly restriction?

```rust,ignore
use u2::*;
enum u2 { 0_u2, 1_u2, 2_u2, 3_u2 }
# fn main () {
assert_eq!(0_u2, 0_u2);
# }
```

```text
$ rustc nothing-suspicious-here.rs
error: expected identifier, found `0_u2`
 --> nothing-suspicious-here.rs:3:11
  |
3 | enum u2 { 0_u2, 1_u2, 2_u2, 3_u2 }
  |           ^^^^ expected identifier

error: aborting due to previous error
```

Denied.

Looks like we can't do it.

---

But what if we wanted to look as if we'd side-stepped the issue and made crated integers work?

Well, first we need to figure out this identifier thing. Who even decides what identifiers can look
like?!

The [Rust Reference](https://doc.rust-lang.org/reference/identifiers.html) does:

> An identifier is any nonempty Unicode string of the following form:
>
> Either
> - The first character has property [`XID_start`](http://unicode.org/cldr/utility/list-unicodeset.jsp?a=%5B%3AXID_Start%3A%5D&abb=on&g=&i=).
> - The remaining characters have property [`XID_continue`](http://unicode.org/cldr/utility/list-unicodeset.jsp?a=%5B%3AXID_Continue%3A%5D&abb=on&g=&i=).

Alright. So there's a restricted set of Unicode characters that can _start_ an identifier, and
numbers aren't in that set. But can we find something discreet enough that _is_ `XID_Start`?

Why yes. Yes we can:

Enter the [Halfwidth Hangul Filler](https://util.unicode.org/UnicodeJsps/character.jsp?a=FFA0).
This character is `XID_Start`, and (provided you have Hangul fonts) renders as…  either a blank
space, or nothing at all.

Does it work?

```rust
#[derive(Debug)]
enum Foo { ﾠBar }

# fn main () {
println!("{:?}", format!("{:?}", Foo::ﾠBar));
println!("{:?}", format!("{:?}", Foo::ﾠBar).as_bytes());
# }
```

```text
$ rustc notacrime.rs
warning: identifier contains uncommon Unicode codepoints
 --> notacrime.rs:5:12
  |
5 | enum Foo { ﾠBar }
  |            ^^^^
  |
  = note: `#[warn(uncommon_codepoints)]` on by default

warning: 1 warning emitted

[Exit: 0]

$ ./notacrime
"ﾠBar"
[239, 190, 160, 66, 97, 114]

[Exit: 0]
```

Right, first, we can't have Rust ruin the game so quickly, so we want to suppress that pesky warning
about uncommon codepoints which points directly at our deception:

```rust
#![allow(uncommon_codepoints)]

#[derive(Debug)]
enum Foo { ﾠBar }

# fn main () {
println!("{:?}", format!("{:?}", Foo::ﾠBar));
println!("{:?}", format!("{:?}", Foo::ﾠBar).as_bytes());
# }
```

```text
$ rustc notacrime.rs

[Exit: 0]

$ ./notacrime
"ﾠBar"
[239, 190, 160, 66, 97, 114]

[Exit: 0]
```

Much better.

So, we're printing the Debug representation of that `Bar` variant which starts with the Hangul
character we found, and the debug representation of the slice of bytes which underly that string.

The bytes, in hex, are:

```text
[EF, BE, A0, 42, 61, 72]
```

0x42 0x61 0x72 are Unicode for `B`, `a`, and `r`, so our Hangul character must be 0xEF 0xBE 0xA0!

Indeed, that's the [UTF-8 representation](https://en.wikipedia.org/wiki/UTF-8#Encoding) of
[0xFFA0](https://util.unicode.org/UnicodeJsps/character.jsp?a=FFA0).

So, we've got something that is a valid start of an identifier, and (fonts willing) is completely
transparent. Let's try this again:

```rust,ignore
#![allow(uncommon_codepoints)]
use u2::*;
enum u2 { ﾠ0, ﾠ1, ﾠ2, ﾠ3 }
# fn main () {
assert_eq!(ﾠ0, ﾠ0);
# }
```

```text
$ rustc not-technically-illegal.rs
warning: type `u2` should have an upper camel case name
 --> not-technically-illegal.rs:4:6
  |
4 | enum u2 { ﾠ0, ﾠ1, ﾠ2, ﾠ3 }
  |      ^^ help: convert the identifier to upper camel case (notice the capitalization): `U2`
  |
  = note: `#[warn(non_camel_case_types)]` on by default

error[E0369]: binary operation `==` cannot be applied to type `u2`
 --> not-technically-illegal.rs:8:1
  |
8 | assert_eq!(ﾠ0, ﾠ0);
  | ^^^^^^^^^^^^^^^^^^^
  | |
  | u2
  | u2
  |
  = note: an implementation of `std::cmp::PartialEq` might be missing for `u2`
  = note: this error originates in the macro `assert_eq` (in Nightly builds, run with -Z macro-backtrace for more info)

error[E0277]: `u2` doesn't implement `Debug`
 --> not-technically-illegal.rs:8:1
  |
8 | assert_eq!(ﾠ0, ﾠ0);
  | ^^^^^^^^^^^^^^^^^^^ `u2` cannot be formatted using `{:?}`
  |
  = help: the trait `Debug` is not implemented for `u2`
  = note: add `#[derive(Debug)]` to `u2` or manually `impl Debug for u2`
  = note: this error originates in the macro `assert_eq` (in Nightly builds, run with -Z macro-backtrace for more info)

[Exit: 1]
```

Whoa there.

Okay, so we're going to rename our enum to uppercase, and add some derived traits:

```rust,ignore
#![allow(uncommon_codepoints)]

use U2::*;

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
enum U2 { ﾠ0, ﾠ1, ﾠ2, ﾠ3 }

# fn main () {
assert_eq!(ﾠ0, ﾠ0);
# }
```

```text
$ rustc not-technically-illegal.rs
warning: variant is never constructed: `ﾠ1`
 --> not-technically-illegal.rs:6:15
  |
6 | enum U2 { ﾠ0, ﾠ1, ﾠ2, ﾠ3 }
  |               ^^
  |
  = note: `#[warn(dead_code)]` on by default

warning: variant is never constructed: `ﾠ2`
 --> not-technically-illegal.rs:6:19
  |
6 | enum U2 { ﾠ0, ﾠ1, ﾠ2, ﾠ3 }
  |                   ^^

warning: variant is never constructed: `ﾠ3`
 --> not-technically-illegal.rs:6:23
  |
6 | enum U2 { ﾠ0, ﾠ1, ﾠ2, ﾠ3 }
  |                       ^^

warning: 3 warnings emitted

[Exit: 0]
```

Well, it succeeded, but let's suppress those warnings as well:

```rust,ignore
#![allow(uncommon_codepoints)]

use U2::*;

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
#[allow(dead_code)]
enum U2 { ﾠ0, ﾠ1, ﾠ2, ﾠ3 }

# fn main () {
assert_eq!(ﾠ0, ﾠ0);
# }
```

```text
$ rustc not-technically-illegal.rs

[Exit: 0]

$ ./not-technically-illegal

[Exit: 0]
```

Much better.

---

Now, we're not going to get far with a 2-bit int. But writing out all the variants of a wider
integer is going to get old fast. So let's make a generator for our Rust crimes:

```rust
println!("enum U8 {{ {} }}",
    (0..256).map(|n| format!("\u{FFA0}{}", n)).collect::<Vec<_>>().join(", ")
);
```

The output is very long and it's only going to get longer, so from now you can run these yourself
with the little ⏵ play icon on the code listing.

Let's just go ahead and add all the other decoration we've established to that little generator,
but do something a little more interesting: addition.

```rust
# fn main() {
println!("#![allow(uncommon_codepoints)]\n\n");

println!("use U8::*;

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
#[allow(dead_code)]
enum U8 {{ {} }}",
    (0..256).map(|n| format!("\u{FFA0}{}", n)).collect::<Vec<_>>().join(", ")
);

println!("

fn main() {{
    dbg!(\u{FFA0}1 + \u{FFA0}2);
}}");
# }
```

```text
$ rustc crime-scene.rs && ./crime-scene > crime.rs && rustc crime.rs && ./crime
error[E0369]: cannot add `U8` to `U8`
 --> crime.rs:9:13
  |
9 |     dbg!(ﾠ1 + ﾠ2);
  |          -- ^ -- U8
  |          |
  |          U8
  |
  = note: an implementation of `std::ops::Add` might be missing for `U8`

error: aborting due to previous error

For more information about this error, try `rustc --explain E0369`.

[Exit: 1]
```

Now what?

Ah, right, we haven't defined how addition works for our new integer type. Let's do that:

```rust
# fn main() {
# println!("#![allow(uncommon_codepoints)]\n\n");
#
# println!("use U8::*;
#
# #[derive(Clone, Copy, Debug, PartialEq, Eq)]
# #[allow(dead_code)]
# enum U8 {{ {} }}",
#     (0..256).map(|n| format!("\u{FFA0}{}", n)).collect::<Vec<_>>().join(", ")
# );
#
# println!("
#
# fn main() {{
#     dbg!(\u{FFA0}1 + \u{FFA0}2);
# }}");
#
println!("
use std::ops::Add;

impl Add for U8 {{
    type Output = Self;
    fn add(self, other: Self) -> Self {{
        U8::from(u8::from(self) + u8::from(other))
    }}
}}");
# }
```

...what?

Right, I've skipped a few things.

So, it may be technically possible to define addition without making any reference to Rust's core
integer types. But that seems _very_ out of scope for an article which is already pretty long.
Instead, we're going to implement arithmetic by converting our custom enum integers to their
corresponding native ints, do maths, and then go back.

How do we convert?

Well, going from our type to a primitive is pretty simple:

```rust
# fn main() {
# println!("#![allow(uncommon_codepoints)]\n\n");
#
# println!("use U8::*;
#
# #[derive(Clone, Copy, Debug, PartialEq, Eq)]
# #[allow(dead_code)]
# enum U8 {{ {} }}",
#     (0..256).map(|n| format!("\u{FFA0}{}", n)).collect::<Vec<_>>().join(", ")
# );
#
# println!("
#
# fn main() {{
#     dbg!(u8::from(\u{FFA0}0));
# }}");
#
println!("

impl From<U8> for u8 {{
    fn from(n: U8) -> Self {{
        n as _
    }}
}}");
# }
```

Going back, however, requires a few more pieces:

```rust
# fn main() {
# println!("#![allow(uncommon_codepoints)]\n\n");
#
println!("use U8::*;

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
#[allow(dead_code)]
#[repr(u8)] // <===================== this thing
enum U8 {{ {} }}",
    (0..256).map(|n| format!("\u{FFA0}{}", n)).collect::<Vec<_>>().join(", ")
);
#
# println!("
#
# fn main() {{
#     dbg!(U8::from(0));
# }}");
#
println!("
#
# impl From<U8> for u8 {{
#     fn from(n: U8) -> Self {{
#         n as _
#     }}
# }}

impl From<u8> for U8 {{
    fn from(n: u8) -> Self {{
        unsafe {{ std::mem::transmute(n) }}
    }}
}}");
# }
```

UNSAFE?!?!?

Well, not quite.

Say we have an enum with four variants. We can safely convert it to a number, because the compiler
knows statically which variant corresponds to which number. However, we can't safely go the other
way all the time, because what if we try to convert 32 into that enum? There's no 33rd variant, so
the program may crash, or worse.

In our case, though, we know that there are exactly 256 variants, as many values as there are in an
`u8`, so we can assure the compiler that yes, we know what we're about, please transmute.

And we tell the compiler that the enum must fit in and have the same layout as a `u8` with the
`repr` annotation, which lets us have peace of mind while transmuting, that an optimisation isn't
going to come along and mess up our assumptions.

Now that we can go back and forth between `U8` and `u8`, we can get back to implementing addition:

```rust
# fn main() {
# println!("#![allow(uncommon_codepoints)]\n\n");
#
# println!("use U8::*;
#
# #[derive(Clone, Copy, Debug, PartialEq, Eq)]
# #[allow(dead_code)]
# #[repr(u8)]
# enum U8 {{ {} }}",
#     (0..256).map(|n| format!("\u{FFA0}{}", n)).collect::<Vec<_>>().join(", ")
# );
#
println!("
#
fn main() {{
    dbg!(\u{FFA0}1 + \u{FFA0}2);
}}");

println!("
#
# impl From<U8> for u8 {{
#     fn from(n: U8) -> Self {{
#         n as _
#     }}
# }}
#
# impl From<u8> for U8 {{
#     fn from(n: u8) -> Self {{
#         unsafe {{ std::mem::transmute(n) }}
#     }}
# }}
#
use std::ops::Add;

impl Add for U8 {{
    type Output = Self;
    fn add(self, other: Self) -> Self {{
        U8::from(u8::from(self) + u8::from(other))
    }}
}}");
# }
```

```text
$ rustc crime-scene.rs && ./crime-scene > crime.rs && rustc crime.rs && ./crime

[crime.rs:9] ﾠ1 + ﾠ2 = ﾠ3

[Exit: 0]
```

It works!

In the same vein, we can implement `-`, `/`, and `*`:

```rust
# fn main() {
# println!("#![allow(uncommon_codepoints)]\n\n");
#
# println!("use U8::*;
#
# #[derive(Clone, Copy, Debug, PartialEq, Eq)]
# #[allow(dead_code)]
# #[repr(u8)]
# enum U8 {{ {} }}",
#     (0..256).map(|n| format!("\u{FFA0}{}", n)).collect::<Vec<_>>().join(", ")
# );
#
# println!("
#
# fn main() {{
#     dbg!(\u{FFA0}1 + \u{FFA0}2 * \u{FFA0}3 / \u{FFA0}4);
# }}");
#
println!("
#
# impl From<U8> for u8 {{
#     fn from(n: U8) -> Self {{
#         n as _
#     }}
# }}
#
# impl From<u8> for U8 {{
#     fn from(n: u8) -> Self {{
#         unsafe {{ std::mem::transmute(n) }}
#     }}
# }}
#
# use std::ops::Add;
#
# impl Add for U8 {{
#     type Output = Self;
#     fn add(self, other: Self) -> Self {{
#         U8::from(u8::from(self) + u8::from(other))
#     }}
# }}
#
use std::ops::Sub;

impl Sub for U8 {{
    type Output = Self;
    fn sub(self, other: Self) -> Self {{
        U8::from(u8::from(self) - u8::from(other))
    }}
}}

use std::ops::Div;

impl Div for U8 {{
    type Output = Self;
    fn div(self, other: Self) -> Self {{
        U8::from(u8::from(self) / u8::from(other))
    }}
}}

use std::ops::Mul;

impl Mul for U8 {{
    type Output = Self;
    fn mul(self, other: Self) -> Self {{
        U8::from(u8::from(self) * u8::from(other))
    }}
}}");
# }
```

With that, we can implement something a little less trivial than base arithmetic:

```rust
# fn main() {
# println!("#![allow(uncommon_codepoints)]\n\n");
#
# println!("use U8::*;
#
# #[derive(Clone, Copy, Debug, PartialEq, Eq)]
# #[allow(dead_code)]
# #[repr(u8)]
# enum U8 {{ {} }}",
#     (0..256).map(|n| format!("\u{FFA0}{}", n)).collect::<Vec<_>>().join(", ")
# );
#
println!("

fn fibonacci(n: U8) -> U8 {{
   match n {{
       \u{FFA0}0 => \u{FFA0}1,
       \u{FFA0}1 => \u{FFA0}1,
        _ => fibonacci(n - \u{FFA0}1) + fibonacci(n - \u{FFA0}2),
    }}
}}

fn main() {{
    dbg!(fibonacci(\u{FFA0}8));
}}");
#
# println!("
#
# impl From<U8> for u8 {{
#     fn from(n: U8) -> Self {{
#         n as _
#     }}
# }}
#
# impl From<u8> for U8 {{
#     fn from(n: u8) -> Self {{
#         unsafe {{ std::mem::transmute(n) }}
#     }}
# }}
#
# use std::ops::Add;
#
# impl Add for U8 {{
#     type Output = Self;
#     fn add(self, other: Self) -> Self {{
#         U8::from(u8::from(self) + u8::from(other))
#     }}
# }}
#
# use std::ops::Sub;
#
# impl Sub for U8 {{
#     type Output = Self;
#     fn sub(self, other: Self) -> Self {{
#         U8::from(u8::from(self) - u8::from(other))
#     }}
# }}
#
# use std::ops::Div;
#
# impl Div for U8 {{
#     type Output = Self;
#     fn div(self, other: Self) -> Self {{
#         U8::from(u8::from(self) / u8::from(other))
#     }}
# }}
#
# use std::ops::Mul;
#
# impl Mul for U8 {{
#     type Output = Self;
#     fn mul(self, other: Self) -> Self {{
#         U8::from(u8::from(self) * u8::from(other))
#     }}
# }}");
# }
```

```text
$ rustc crime-scene.rs && ./crime-scene > crime.rs && rustc crime.rs && ./crime

[crime.rs:17] fibonacci(ﾠ8) = ﾠ34

[Exit: 0]
```

---

Alright, so we've got maths on a single, non-primitive, enum-based integer type. Can we add another
type and sidestep the ambiguity issue?

Yes, by adding another Hangul Filler as prefix!

First let's move some of our machinery into functions so we're a bit more generic when generating:

```rust
fn main() {
    println!("#![allow(uncommon_codepoints)]

    use U8::*;

    fn fibonacci(n: U8) -> U8 {{
       match n {{
           \u{FFA0}0 => \u{FFA0}1,
           \u{FFA0}1 => \u{FFA0}1,
            _ => fibonacci(n - \u{FFA0}1) + fibonacci(n - \u{FFA0}2),
        }}
    }}

    fn main() {{
        dbg!(fibonacci(\u{FFA0}8));
    }}");

    define_enum("U8", "u8", "\u{FFA0}", 0..256);
}

fn define_enum(name: &str, repr: &str, prefix: &str, range: std::ops::Range<usize>) {
println!("
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
#[allow(dead_code)]
#[repr({repr})]
enum {name} {{ {def} }}",
    name=name,
    repr=repr,
    def=range.map(|n| format!("{}{}", prefix, n)).collect::<Vec<_>>().join(", "),
);

println!("

impl From<{name}> for {repr} {{
    fn from(n: {name}) -> Self {{
        n as _
    }}
}}

impl From<{repr}> for {name} {{
    fn from(n: {repr}) -> Self {{
        unsafe {{ std::mem::transmute(n) }}
    }}
}}

impl std::ops::Add for {name} {{
    type Output = Self;
    fn add(self, other: Self) -> Self {{
        {name}::from({repr}::from(self) + {repr}::from(other))
    }}
}}

impl std::ops::Sub for {name} {{
    type Output = Self;
    fn sub(self, other: Self) -> Self {{
        {name}::from({repr}::from(self) - {repr}::from(other))
    }}
}}

impl std::ops::Div for {name} {{
    type Output = Self;
    fn div(self, other: Self) -> Self {{
        {name}::from({repr}::from(self) / {repr}::from(other))
    }}
}}

impl std::ops::Mul for {name} {{
    type Output = Self;
    fn mul(self, other: Self) -> Self {{
        {name}::from({repr}::from(self) * {repr}::from(other))
    }}
}}",
    name=name,
    repr=repr,
);
}
```

So now we can define another enum integer:

```rust,ignore
define_enum("U16", "u16", "\u{FFA0}\u{FFA0}", 0..65536);
```

If you try to compile this, you're going to hit a limitation of the compiler: it gets very very
slow to compile... whoa, _seven hundred kilobytes_ of source?

Right, so that's a **lot**. In the interest of keeping this demo-able, let's define our own type to
be a little smaller. Let's say we want a `U12`, which goes from 0 to 4095, backed by a `u16`:

```rust
fn main() {
    println!("#![allow(uncommon_codepoints)]

    use U8::*;
    use U12::*;

    fn fibonacci(n: U8) -> U8 {{
       match n {{
           \u{FFA0}0 => \u{FFA0}1,
           \u{FFA0}1 => \u{FFA0}1,
            _ => fibonacci(n - \u{FFA0}1) + fibonacci(n - \u{FFA0}2),
        }}
    }}

    fn main() {{
        dbg!(fibonacci(\u{FFA0}8));
    }}");

    define_enum("U8", "u8", "\u{FFA0}", 0..256);
    define_enum("U12", "u16", "\u{FFA0}\u{FFA0}", 0..4096);
}

fn define_enum(name: &str, repr: &str, prefix: &str, range: std::ops::Range<usize>) {
println!("
# #[derive(Clone, Copy, Debug, PartialEq, Eq)]
# #[allow(dead_code)]
# #[repr({repr})]
# enum {name} {{ {def} }}",
#     name=name,
#     repr=repr,
#     def=range.clone().map(|n| format!("{}{}", prefix, n)).collect::<Vec<_>>().join(", "),
# );
#
# println!("
#
# impl From<{name}> for {repr} {{
#     fn from(n: {name}) -> Self {{
#         n as _
#     }}
# }}
#
// ...
impl From<{repr}> for {name} {{
    fn from(n: {repr}) -> Self {{
        assert!(n < {max});
        unsafe {{ std::mem::transmute(n) }}
    }}
}}
// ...
#
# impl std::ops::Add for {name} {{
#     type Output = Self;
#     fn add(self, other: Self) -> Self {{
#         {name}::from({repr}::from(self) + {repr}::from(other))
#     }}
# }}
#
# impl std::ops::Sub for {name} {{
#     type Output = Self;
#     fn sub(self, other: Self) -> Self {{
#         {name}::from({repr}::from(self) - {repr}::from(other))
#     }}
# }}
#
# impl std::ops::Div for {name} {{
#     type Output = Self;
#     fn div(self, other: Self) -> Self {{
#         {name}::from({repr}::from(self) / {repr}::from(other))
#     }}
# }}
#
# impl std::ops::Mul for {name} {{
#     type Output = Self;
#     fn mul(self, other: Self) -> Self {{
#         {name}::from({repr}::from(self) * {repr}::from(other))
#     }}
# }}
",
    name=name,
    repr=repr,
    max=range.last().unwrap(),
);
}
```

Notice we add an assert to the transmuting conversion as now we can't guarantee at compile time that
the entire possible range of an `u16` will fit in a `U12`, so we check the value at runtime, just to
be safe.

```text
$ rustc crime-scene.rs && ./crime-scene > crime.rs && rustc crime.rs && ./crime
warning: unused import: `U12::*`
 --> crime.rs:4:9
  |
4 |     use U12::*;
  |         ^^^^^^
  |
  = note: `#[warn(unused_imports)]` on by default

warning: 1 warning emitted

[crime.rs:15] fibonacci(ﾠ8) = ﾠ34

[Exit: 0]
```

We get a warning, but notice how we're allowed to wildcard-import both sets of numbers (because of
course, from Rust's point of view, they're different identifiers).

With bigger ints, we can go for bigger maths:

```rust
fn main() {
    println!("#![allow(uncommon_codepoints)]

    use U8::*;
    use U12::*;

    fn fibonacci(n: U8) -> U8 {{
       match n {{
           \u{FFA0}0 => \u{FFA0}1,
           \u{FFA0}1 => \u{FFA0}1,
            _ => fibonacci(n - \u{FFA0}1) + fibonacci(n - \u{FFA0}2),
        }}
    }}

    fn factorial(n: U12) -> U12 {{
        match n {{
          \u{FFA0}\u{FFA0}0 | \u{FFA0}\u{FFA0}1 => \u{FFA0}\u{FFA0}1,
          _ => factorial(n - \u{FFA0}\u{FFA0}1) * n
        }}
    }}

    fn main() {{
        dbg!(fibonacci(\u{FFA0}8));
        dbg!(factorial(\u{FFA0}\u{FFA0}6));
    }}");

    define_enum("U8", "u8", "\u{FFA0}", 0..256);
    define_enum("U12", "u16", "\u{FFA0}\u{FFA0}", 0..4096);
}
#
# fn define_enum(name: &str, repr: &str, prefix: &str, range: std::ops::Range<usize>) {
# println!("
# #[derive(Clone, Copy, Debug, PartialEq, Eq)]
# #[allow(dead_code)]
# #[repr({repr})]
# enum {name} {{ {def} }}",
#     name=name,
#     repr=repr,
#     def=range.clone().map(|n| format!("{}{}", prefix, n)).collect::<Vec<_>>().join(", "),
# );
#
# println!("
#
# impl From<{name}> for {repr} {{
#     fn from(n: {name}) -> Self {{
#         n as _
#     }}
# }}
#
# impl From<{repr}> for {name} {{
#     fn from(n: {repr}) -> Self {{
#         assert!(n < {max});
#         unsafe {{ std::mem::transmute(n) }}
#     }}
# }}
#
# impl std::ops::Add for {name} {{
#     type Output = Self;
#     fn add(self, other: Self) -> Self {{
#         {name}::from({repr}::from(self) + {repr}::from(other))
#     }}
# }}
#
# impl std::ops::Sub for {name} {{
#     type Output = Self;
#     fn sub(self, other: Self) -> Self {{
#         {name}::from({repr}::from(self) - {repr}::from(other))
#     }}
# }}
#
# impl std::ops::Div for {name} {{
#     type Output = Self;
#     fn div(self, other: Self) -> Self {{
#         {name}::from({repr}::from(self) / {repr}::from(other))
#     }}
# }}
#
# impl std::ops::Mul for {name} {{
#     type Output = Self;
#     fn mul(self, other: Self) -> Self {{
#         {name}::from({repr}::from(self) * {repr}::from(other))
#     }}
# }}
# ",
#     name=name,
#     repr=repr,
#     max=range.last().unwrap(),
# );
# }
```

```text
$ rustc crime-scene.rs && ./crime-scene > crime.rs && rustc crime.rs && ./crime

[crime.rs:22] fibonacci(ﾠ8) = ﾠ34
[crime.rs:23] factorial(ﾠﾠ6) = ﾠﾠ720

[Exit: 0]
```

---

All that's left to do is take the generated crime, stick it in a playground, add some whitespace to
confuse unexpecting visitors and… sit back to enjoy the profits:

<https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=f6d61baf31e9a9f4f97f07d334f56f12>
