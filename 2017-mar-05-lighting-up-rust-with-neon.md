---
title: Lighting up Rust with Neon
tags:
  - post
  - neon
  - rust
  - blograph
  - node
---

Frustrated by the lack of easy-to-use web frameworks that support Rust
**stable**, I decided to use a stack that I know and love, and that has an
absolutely humongous amount of middleware that would do everything I wanted:
Node.js. But I wasn't about to throw all the Rust code I'd written away!
Fortunately, that's where [Neon] comes in.

**Neon** is a library and build tool that makes it drop-dead easy to expose a
Rust API as a Node.js module. Once I had that binding working and tested, it
was a breeze to use it in an Express server. Nevertheless, I hit a few gotchas,
patterns that weren't obvious at first:

## Hooking up a Neon class

The [Neon documentation][neon-docs] is a bit lacking right now. It's still Rust
documentation, which is hands down the best auto-generated documentation I've
used, and I use it _a lot_. In fact, it being so good is the _reason_ why I use
it a lot. Even without taking the time to write great documentation, the
auto-generated, no-effort, there-by-default parts are a boon to explore and
figure out a Rust API.

Still, for this I had to look at [the neon tests][neon-tests] for example code.
Then I derived a pattern that I use for all such classes:

If I have a Neon class `JsFoo` declared in `jsfoo.rs`:

```rust
declare_types! {
    pub class JsFoo for Foo {
        init(call) {
            // use one argument...
        }
    }
}
```

I'd put this at the bottom of the file (making sure to have the right number of
arguments — that caught me out once or twice):

```rust
pub fn new(call: Call) -> JsResult<JsFoo> {
    let mut scope = call.scope;
    let args = call.arguments;

    // pass through one argument
    let arg0 = args.require(scope, 0)?;

    let foo_class = JsFoo::class(scope)?;
    let foo_ctor = foo_class.constructor(scope)?;
    foo_ctor.construct(scope, vec![arg0])
}
```

And then in `lib.rs`, to hook it up to the module, it's just a simple:

```rust
mod foo;

register_module!(m, {
    m.export("foo", foo::new)?;
    // the other exports...

    Ok(())
});
```

## Constructing Neon classes with Rust data

There's a fairly common situation I ran into: I had a method on a Neon class or
a function on the module where I wanted to return another Neon class instance,
_filled with data generated in the Rust code._

In pure Rust, there's typically several ways to construct a struct. But in JS,
there's just the one constructor, and in Neon it's even worse: there's just the
one constructor, that only can take JS types as inputs.

The first thing I thought of was to modify the underlying Rust type directly.
So down I went reading through Neon source code, trying to figure out how I
could either _replace_ the Rust value of a constructed Neon class… or implement
an entirely new constuctor, by hand, that would build the class but with Rust
data instead of JS data.

Turns out, this first one was the right idea… but the wrong, over-complicated
approach. This pattern has two sides:

1. I have to make sure that my Neon class constructor is cheap, has no
   side-effect, and does not depend on anything else than what I pass in.

   I had at some point a constructor that would do disk I/O based on paths
   passed in an arguments. That's a no-go. I replaced it with a constructor
   that only built up the underlying Rust type without doing anything else, and
   a `load()` function that would do the I/O and spit out a modified class
   instance using this very pattern.

2. I have to **wrap the target type in a tuple struct**. That tuple struct
   needs to have its field marked `pub`, and that's what I target the Neon
   class at.

   ```rust
   struct WrapFoo(pub Foo);

   declare_types! {
       pub class JsFoo for WrapFoo {
           init(call) { ... }
       }
   }
   ```

With those two things done, the remaining bit is simple, especially combined
with the previous pattern:

```rust
fn load(call: Call) -> JsResult<JsList> {
    let scope = call.scope;
    let args = call.arguments;
    let base = args.require(scope, 0)?.check::<JsString>()?.value();

    let posts = all::load(PathBuf::from(base)).to_vec();

    let farg = vec![JsArray::new(scope, 0)];

    // Look at the `jslist::new`! That's the pattern shown just previously,
    // here used to construct a Neon class within a Rust function.
    let mut list = JsFunction::new(scope, jslist::new)?
        .call(scope, JsNull::new(), farg)?
        .check::<JsList>()?;

    // Here's the important bit!
    // See how the tuple struct wrapping allows you to replace the underlying
    // Rust value? That's the entire trick!
    list.grab(|list| list.0 = List::new(posts));
    Ok(list)
}
```

### Hiding the wrapping type

When I was writing tests for my binding, I found that `typeof new List()` would
return `'WrapList'`… not what I want! I'd rather expose the "nice" name of the
struct. So, instead of the above, I bound the actual Rust struct to a different
name, and named the wrapping struct as the original name, like this:

```rust
use list::List as RustList;

struct List(pub RustList);

declare_types! {
    pub class JsList for List {
        init(call) { ... }
    }
}
```

and now this works: `typeof new List() === 'List'`.

## Making a JsArray

This is much more straightforward, but I kept hitting it and then having to
either figure it out from the compiler messages and documentation all over
again, or referring to previous code.

Occasionally I want to create a JsArray. But there's no easy
`JsArray::from_vec()`. I have to create a `JsArray` with a size, then fill it
up with values, taking care to set the right indices. And there's also a lot of
boilerplate to make sure to use the correct variant of the `.set()` method, the
one with **two** parameters instead of **three**.

```rust
// Object contains the `.set()` method on JsArray.
use neon::js::{JsArray, Object};

// Required to use `.deref_mut()`.
use std::ops::DerefMut;

// This is assuming we're starting with a Vec<Handle> named `vec`.
// If that's not the case, adjust the JsArray length and the .set()`.

let mut array: Handle<JsArray> = JsArray::new(scope, vec.len() as u32);

// The extra scoping block is necessary to avoid mut/immut borrows clashing.
{
    // Here's where we borrow mutably, this is necessary to get access to
    // the underlying JsArray from the Handle, as the JsArray has the
    // 2-parameter `.set(key: Key, value: Value)` method.
    let raw_array = array.deref_mut();

    // We have to do our own indexing.
    let mut i: u32 = 0;

    for val in vec {
        // Setting an array value might fail! So we have to handle that.
        raw_array.set(i, val)?;
        i += 1;
    }
}

// And here's where we borrow immutably, and also return it in the right format.
Ok(array.as_value(scope))
```

That's that for now!

[Neon]: https://www.neon-bindings.com/
[neon-docs]: https://docs.neon-bindings.com/
[neon-tests]: https://github.com/neon-bindings/neon/tree/master/tests/
