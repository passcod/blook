---
date: 2018-02-02T22:40:18+13:00
title: A little elegant state machine with Async Generators
---

Today at work I made this up:

```js
async function* init_process (steps) {
   for (let step of steps) {
      while (true) {
         try {
            await step.run()
            break
         } catch (error) {
            handle_error({ step, error })
            yield
         }
      }
   }
}
```

What this does is it takes a list of `steps`, which are async tasks (in our
case a request and some processing), runs through them, and if there is an
error at some point it hands back to the caller... and then the caller can
choose to _retry the failed step and go on_.

All in 10 lines of code.

Beyond brevity, what I like about this code is that as long as you know the
behaviour of an async generator, of `break` inside a loop, of a `try`-`catch` —
which are all, to the possible exception of the async generator, fairly
elemental language structures — you can understand what this little machine
does simply by running through it line by line, iteration by iteration.

Here's how you'd use this:

```js
// load the steps, do some prep work...

// Prepare the little machine
const process = init_process(steps)

// Hook up the retry button
$('.retry-button').click(() => process.next())

// Start it up
process.next()
```

And that's it!

---

Let's run through this a bit:

1. `async function* init_process (steps) {`

   This is an Async Generator that takes a list of `steps`. Generators, and
   Async Generators, gets their arguments and then start _frozen_. They don't
   do any processing until you first call `.next()`.

   An Async Generator is just a Generator! All it does special is that you can
   use `await` inside it and if you want the results of what it `yield`s, you
   have to await those. (But we don't use that here so you don't even need to
   keep that in mind.) There's no extra magic.

2. `for (let step of steps) {`

   We're going to iterate through all the steps, one at a time.

3. `while (true) {`

   This is the first "aha!" moment. To make it possible to _retry_ the current,
   failed, step, we start an infinite loop. If we have a success, we can break
   out of it, dropping back into... the `for` loop, and thus continuing onto
   the next step. If we have a failure, we _don't_ break out, and the `while`
   loop will naturally start that step over.

4. `try { await step.run(); break`

   We `try` the `step.run()`, and then we `break`. Because of the way
   exceptions work, `break` will _only run if nothing was thrown_. That is, if
   `step.run()` ended successfully.

5. `catch (error) { handle_error({ step, error })`

   We want to immediately handle the error. We _could_ `yield` the error and
   let the caller handle it, but this way there's no need for an extra wrapping
   function: we can just call `process.next()` to start and resume the machine,
   without needing to care about its output.

6. `yield`

   The piece of magic that brings it all together. If and when we get to that,
   we _freeze_ the generator state and hand back execution to the caller. It's
   now up to it to tell the little machine to continue, and it can do that at
   any time. There's no need for complex state management, of preserving and
   restoring progress: the language itself is taking care of it.

7. Outside: `process.next()` (the first time)

   Recall that the Generator starts _frozen_ (see 1). The first thing we do is
   call `next()`, and that unfreezes the machine. It starts processing steps,
   and eventually will either get to the end, or stop at an error.

8. To retry: `process.next()`

   When we hit a snag, `handle_error()` does its job of telling the user and
   figuring out problems... and then it can choose to display a retry button.
   Or maybe it will want to automatically retry a step if it deems it safe to
   do so. Or maybe the error was very bad, and it just wants to abort. It can
   do all these things, and it can take its time: the little machine will wait
   patiently until it's told to get going again.

And that's all there is to it!
