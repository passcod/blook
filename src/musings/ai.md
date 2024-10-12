# On generative AI for programming Rust

> October 2024

_This was originally posted as [a comment on r/rust](https://www.reddit.com/r/rust/comments/1g1vwxj/comment/lrjkz2x/), but I felt like it belonged here too._

---

**Question**: I think [AI tools] can be helpful and save developer time when
used correctly, but you cannot trust them to generate correct code. That's why
strong type systems (like Rust's) are still very important for checking program
correctness (combined with unit tests etc.).

---

**My comment:**

(Disclaimer: I have free Github Copilot via the OSS maintainer program)

I agree that compared to a JavaScript codebase, Rust does help catch the most
egregious AI mistakes. However, what I've found is that AI codegen is often
either subtly wrong in the nitty gritty logic (makes sense, it can't reason),
or correct in mechanistic execution but wrong in approach (say I wanted an
implementation that did the least amount of expensive copies, and the AI
codegen'd something that Arc'd everything).

I find that the older dumber AI models were in fact more productive, in that
they were more like pattern-replicating tools (give it an example impl and a
list of types and it will generate an impl per type with the correct
substitutions, even if there's differing cases and plurals/singulars transforms
to do, which editor macros have difficulty with, or would take comparitively
too long).

As a result I've gone from "ignore suggestions 95% of the time" to "disable
copilot globally and enable it for singular tasks." I find that I have a
renewed productivity and heightened enjoyment of solving problems; that indeed
Copilot, even if I ignored its solutions, would influence my direction. While
initially it feels like a productivity upgrade, in the end it's like slogging
against the machine, trying to make it do what I want.

I very much feel like I'm in a science fiction novel of the last millenium in
saying that, but using AI codegen or chat is handing off your thought process
to a computer and being in this forever fog of frustration and feeling _wrong_
but surely you can't unplug, for unplugging would be coming back to the last
great age where we still banged rocks together.

I find that I improve my craft less or not at all when using AI codegen,
because I'm not _using my brain to solve problems from scratch._

I am moderately worried — moderately because I don't have good data on it —
that this whole experiment is going to spell disaster for knowledge industries.
I am by no means a beginner. In fact I find that I am in some ways so far
removed from the experience of learning Rust basics that I completely fail at
_teaching_ it, which not a humble brag but rather a distressing realisation. If
*I* feel like using AI is preventing *me* to effectively keep improving
*myself*, then what happens to someone who spent their entire programming life
with AI?

Yet I see a lot of beginners who say they're helped by AI, especially AI chat,
because they're able to ask questions and have instant answers. Those might be
wrong to an extent, but so might a human mentor. I don't really know what to
feel here. I am no longer at a stage where talking to a chatbot genuinely helps
me solve problems, because the problems I have cannot be answered by a language
model. They require reason and empathy. And yes, I _am_ talking of software
development problems. So I can't relate to this need, but that doesn't mean it
doesn't exist.

I find it profoundly sad that Stack Overflow and related sites now have a
reputation, deserved or not, for being hostile and unapproachable. I do believe
that, compared to inscrutable Discords, interminable GitHub Issues threads,
disorganised wikis, or unfocused forum and reddit and social posts, the Stack
Overflow Q&A model was (in 2010-2015 at least) the best at providing short and
long term resources in a fairly lightweight community-building format. The
rules made it hard for newbies, but they cannot be removed, for it is the rules
that force you to _learn how to ask a question._ To learn to think through your
problem. There were many times when I found my solution while writing a
question; a kind of rubber duck but into a textbox.

The problem I have with chat AI is that it doesn't know how to say *"I don't
know."* It is the ultimate rubber duck programming tool, but where a rubber
duck can't answer if you yourself cannot solve your own problem, and where a
well-run Q&A site will eventually find the right answer (and the right person
to answer the question), chat AI will confidently invent utter bullshit. And it
will do so in a way that is indistinguishable from when it gives the correct
answer. *And* it might, at random, answer simple questions wrong because it got
tripped up by an irrelevant word.

Another thing I find is that colleagues at work spend time asking Claude the
same question again and again. They'll do prompt engineering for fifteen
minutes if they're not satisfied, instead of going "ah well, let me just think
for three minutes instead of getting an instant answer." They'll eschew more
precise tools, including their own mind, for the all-doing box of averages.

So yes, I think that Rust gives you a marginal advantage against say, JS or PHP
or C when using it with AI. But while I do use Copilot for specific
pattern-replicating tasks, where it excels, I think it is a net negative to use
for general purpose programming, regardless of language.

Of course, your experience may vary.
