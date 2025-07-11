# AI Log

This is a diary where I record every single interaction I knowingly have with
an genAI system, over a one-month period from 2025-06-21 to 2025-07-20.

Records are made first briefly by pasting text or code, and then revised with
more detail later. This may give the impression that I constantly interrupted
myself recording the interaction, but in fact most of the explanations
describing the sequences of actions are reconstructed, then when appropriate or
relevant an analysis is added on top. While I've recorded almost every
interaction, and tried to preserve notes as best I could, the final version
you're reading has had several edit passes for clarity as well as redaction
when appropriate (every single interaction means not only for personal use, but
also for work — in fact most of the events are for work, as I simply don't use
AI a lot outside of that for various reasons).

This document itself was written "by hand"; no prose was edited or suggested by
AI (I used Vim, which I keep free of AI). You can tell because I used
semicolons correctly.

Most of this will be in code editors. I indicate the model when known. I have
free access to Github Copilot Pro via opensource contributions (or something,
idk what the criteria is exactly), I also use the free default tier of Zed's AI
models, and occasionally I might use local models run on GPU via Ollama or LM
Studio. When not in code editors, I may use Gemini as part of my workplace's
Google subscription, and other genAIs embedded in various products.

Google Translate and transcription services are not considered genAI by this
research. Summaries on top of transcriptions are.

Times are approximate and largely reconstructed.

Cursor position when relevant is indicated with ‡.

This is a tremendously long document; if you're looking for overall analysis
and retrospective, that will come in a later post: there is no point scrolling
to the end if you're not interested in the minutiae of the data.

## 2025-06-20

### 23:30 | Zed | Claude Sonnet 3.7

I was writing a parser for the Mercurial ignore format. I typed:

```rust
pub fn line<'src>() -> impl Parser<'src, &'src str, Line, ParserErr<'src>> {
    let ‡
}
```

and hit Tab reflexively. By all expectations, I shouldn't have gotten anything.
Instead, Zed autocompleted the entire function body:

```rust
pub fn line<'src>() -> impl Parser<'src, &'src str, Line, ParserErr<'src>> {
	let prefix = choice((
		"re:".to_string().padded().map(|_| Prefix::Re),
		"path:".to_string().padded().map(|_| Prefix::Path),
		"file:".to_string().padded().map(|_| Prefix::FilePath),
		"relpath:".to_string().padded().map(|_| Prefix::RelPath),
		"rootfilesin:".to_string().padded().map(|_| Prefix::RootFilesIn),
		"relglob:".to_string().padded().map(|_| Prefix::RelGlob),
		"relre:".to_string().padded().map(|_| Prefix::RelRe),
		"glob:".to_string().padded().map(|_| Prefix::Glob),
		"rootglob:".to_string().padded().map(|_| Prefix::RootGlob),
		"include:".to_string().padded().map(|_| Prefix::Include),
		"subinclude:".to_string().padded().map(|_| Prefix::SubInclude),
		"syntax:".to_string().padded().map(|_| Prefix::Syntax),
	));

	let pattern = text::ident().map(|s| s.to_string());

	let comment = text::until(newline()).map(|s| s.to_string());

	let line = prefix
		.or_not()
		.then(pattern.or_not())
		.then(comment.or_not())
		.map(|(prefix, pattern, comment)| Line {
			prefix,
			pattern,
			comment,
		});

	line
}
```

I was trying to deliberately think through parser approach and design, so it
was kinda unwanted.

For this experiment's sake, though, I decided to keep it initially and review
instead of immediately hitting Undo:

- `"string".to_string().padded().map(...)` is nonsense. this isn't how the
  chumsky API works at all. Instead, I'd write something like
  `just("string").padded().to(...)`.
- even then, adding the padding to every call is silly, and also wrong, as
  whitespace is significant in this context.
- the pattern part can be considerably more things than would be matched by
  `text::ident`.
- the comment part needs to come after a `#`, which is completely absent from
  this approach
- the comment part also assumes that there will be a newline in the input,
  which is nonsense, especially in chumsky's approach that parsers are complete
  by default.

All in all, this was an unwanted interaction that had the right general
structure but was utterly wrong on most details. I scrapped it and continued by
hand, as I'd initially intended.

### 23:32 | Zed | Claude Sonnet 4

I typed:

```rust
pub fn line<'src>() -> impl Parser<'src, &'src str, Line, ParserErr<'src>> {
	let prefix = choice((
		just("re").to(Prefix::Re),
    ‡
  ));

  todo()
}
```

and then let autocomplete suggest the following lines, reviewed the preview, and accepted:

```rust
pub fn line<'src>() -> impl Parser<'src, &'src str, Line, ParserErr<'src>> {
	let prefix = choice((
		just("re").to(Prefix::Re),
		just("path").to(Prefix::Path),
		just("file").to(Prefix::FilePath),
		just("relpath").to(Prefix::RelPath),
		just("rootfilesin").to(Prefix::RootFilesIn),
		just("relglob").to(Prefix::RelGlob),
		just("relre").to(Prefix::RelRe),
		just("glob").to(Prefix::Glob),
		just("rootglob").to(Prefix::RootGlob),
		just("include").to(Prefix::Include),
		just("subinclude").to(Prefix::SubInclude),
		just("syntax").to(Prefix::Syntax),
	));

  todo()
}
```

I then went to review the literals for the prefixes from the source material.

- `file` was wrong; it should have been `filepath`. Kinda baffling that it got that wrong given it correctly replicated the variant name.

## 2025-06-21

### 01:22 | Zed | Claude Sonnet 4

I added the `, pattern` part below:

```rust
    .map(|(prefix, pattern‡)| Line {
			prefix,
			pattern: None,
			comment: None,
		})
```

And accepted an edit suggestion for the following.

```rust
    .map(|(prefix, pattern)| Line {
			prefix,
			pattern,
			comment: None,
		})
```

### 01:25 | Zed | Claude Sonnet 4

I started with:

```rust
    .map(|(prefix, pattern)| Line {
			prefix,
			pattern,
			comment: None,
		})
```

Then I edited it like this:

```rust
    .map(|((prefix, pattern)‡)| Line {
			prefix,
			pattern,
			comment: None,
		})
```

Edit prediction proposed this:

```rust
    .map(|((prefix, pattern, comment))| Line {
			prefix,
			pattern,
			comment: None,
		})
```

I accepted, and in part because of type inlays I didn't immediately realise that this was not what I wanted.

I then accepted the next edit suggestion:

```rust
    .map(|((prefix, pattern, comment))| Line {
			prefix,
			pattern,
			comment,
		})
```

And then figured it out, hit Undo twice, and wrote the correct change:

```rust
    .map(|((prefix, pattern), comment)| Line {
			prefix,
			pattern,
			comment,
		})
```

### 03:15 | Zed | Claude Sonnet 4

I started writing

```rust
pub fn pattern‡
```

and the autocomplete started suggesting something like

```rust
pub fn pattern_syntax<'src>() -> impl Parser<'src...
```

including an entire body. This was not what I wanted at all, so I had to kill
the suggestion and continue by hand.

### 03:50 | Zed | Claude Sonnet 4

I started writing an if-else expression:

```rust
.map(|opt| opt.and_then(|pat| if pat.is_empty()‡ )),
```

and it autocompleted correctly:

```rust
.map(|opt| opt.and_then(|pat| if pat.is_empty() { None } else { Some(pat) })),
```

## 2025-06-22

### 03:30 to 04:30 | Zed | Claude Sonnet 4

A series of about 20 interactions where my code editor would keep suggesting
stupid shit and I had to keep telling it to fuck off.

### 20:45 | Zed | Claude Sonnet 4

While mass-rewriting tests using multiple selections, two weren't in the same
layout as the others and got messed up. I fixed the first by hand, then Zed
proposed an autocorrection for the second.

From:

```rust
Glob((
  Some(vec![Class(Klass {
    negated: false,
    classes: vec![Single(']'), Single('-'),],
  })]),
  Vec::new()
)),
```

To:

```rust
(
  Some(Glob(vec![Class(Klass {
    negated: false,
    classes: vec![Single(']'), Single('-'),],
  })])),
  Vec::new()
),
```

### 21:20 | Zed | Claude Sonnet 4

Writing a test, I started writing the expected value:

```rust
#[test]
fn segmented() {
	use Token::*;
	assert_eq!(
		glob().parse(r"a/b/c").into_result(),
		Ok(Glob(vec![‡]))
	);
}
```

Zed offered a completion, which was correct so I accepted:

```rust
#[test]
fn segmented() {
	use Token::*;
	assert_eq!(
		glob().parse(r"a/b/c").into_result(),
		Ok(Glob(vec![Literal("a".into()), Separator, Literal("b".into()), Separator, Literal("c".into())]))
	);
}
```

## 2025-06-23

### 03:30 | DuckDuckGo

Searched for `stray digicode safe`. The "AI assist" feature returned two codes,
one of which I already had. The second worked in game, so I didn't look further.

### 13:05 | Zed | Claude Sonnet 4 Thinking

I couldn't recall the named captures regex syntax so I wrote:

```js
if (!/\/(?<>:‡\d+)$/.test(step)) {
```

and paused to let Zed complete:

```js
if (/\/(?<step>[^/]+)\/(?<version>\d+)$/.test(step)) {
```

On one hand, that does show me the right syntax, but on the other, it
hallucinated a whole additional capture and an input syntax that was not what I
was looking for, and also discarded the NOT operator.

### 13:06 | Zed | Claude Sonnet 4 Thinking

Having rewritten the regex to match what I wanted, I applied it to my input:

```js
const re = /^(?<file>.+?)(\/(?<version>\d+))?$/;
const { file, ‡ }
```

Autocompleted:

```js
const re = /^(?<file>.+?)(\/(?<version>\d+))?$/;
const { file, version } = re.exec(step)?.groups || {};
```

### 13:35 | Zed | Claude Sonnet 4 Thinking

I copied a test case block to modify it into a new one, rewrote the `it`
description...

```ts
it('needsStep throws when index is missing‡', async () => {
  expect(needsStep('steps/1749079898013-initDeviceKey/0')).toBe(
    `${STEP_PREFIX}1749079898013-initDeviceKey/0`,
  );
});
```

and Zed autocompleted the modification to make the test go:

```ts
it('needsStep throws when index is missing', async () => {
  expect(() => needsStep('steps/1749079898013-initDeviceKey')).toThrow(
    'You must provide an index when depending on upgrade steps',
  );
});
```

This does what I want and the test passes.

### 14:00 | Zed | Claude Sonnet 4 Thinking

I added an alias in one file:

```js
export const upgradeCommand = new Command('upgrade')
  .alias('migrate')
  .description('Upgrade Tamanu installation')
```

Then opened another very similar file and it suggested adding the same alias:

```js
export const upgradeCommand = new Command('upgrade')‡
  .description('Upgrade Tamanu installation')
```

### 15:05 | CodeRabbit

I accepted [a commitable suggestion from a review
comment](https://github.com/beyondessential/tamanu/pull/7867#discussion_r2160628686).
The diff it was showing was unnecessarily long for the one-line change it
proposed, but I figured it was just a generation error.

However, after apply I went to check its work and found out that it had indeed
completely fucked up, duplicating lines and breaking the build:

```ts
export async function up(query: QueryInterface): Promise<void> {
export async function up(query: QueryInterface): Promise<void> {
  await query.sequelize.query(`
    CREATE OR REPLACE FUNCTION public.set_updated_at()
     RETURNS trigger
     LANGUAGE plpgsql
    AS $function$
    BEGIN
        IF (
            NEW IS DISTINCT FROM OLD AND
            NEW.updated_at IS NOT DISTINCT FROM OLD.updated_at
        ) THEN
            NEW.updated_at := current_timestamp;
        END IF;
        RETURN NEW;
    END;
    $function$
  `);
}
}
```

## 2025-06-24

### 16:00 | Zed | Claude Sonnet 4 Thinking

I was looking for the correct journalctl incantation to get just the messages,
not the timestamps. I initially made a couple of regular DDG searches, but
wasn't getting good results:

- journalctl without timestamps
- journalctl just the message

So I asked the chat-UI panel in my editor with the following prompt:

> give me the journalctl command to print logs with just the message content,
> not other information like timestamp and unit

Which returned the right answer (`-o cat`).

Granted, trying this exact phrase in DDG returns the same answer (via a SU question).

## 2025-06-25

Nothing today as I worked support rather than dev.

## 2025-06-26

### 15:40 | CodeRabbit

```ts
const encounterFacility = (
  await this.sequelize.query(
    `
      SELECT f.* FROM facilities f
      JOIN encounters e ON f.id = e.facilityId
      WHERE e.id = $encounterId
    `,
    {
      type: QueryTypes.SELECT,
      model: Facility,
      mapToModel: true,
      bind: {
        encounterId: this.encounterId,
      },
    },
  )
)?.[0];
```

Coderabbit suggested that I add error handling to this. Good call: I really miss
working with Rust in those instances, where it would just not have allowed me to
ignore the database error possibility.

However, Coderabbit suggested I wrap the entire thing in a try-catch, which
duplicated some downstream logic. Instead, I used the less-well-known but more
expressive 2-ary `.then()`:

```ts
.then(
  (res: Facility[]) => res?.[0],
  (_err: Error) => null,
);
```

Which is really the spiritual equivalent of the Rust code:

```rust
query().and_then(|f| f.get(0)).unwrap_or_default();
```

### 15:50 | Zed | Claude Sonnet 4

Was typing this and wanted to tab-complete it:

```ts
import { log } from '@tamanu/shared/services/‡';
```

What I was expecting:

```ts
import { log } from '@tamanu/shared/services/logging';
```

What I got instead:

```ts
import { log } from 'services/logging';
```

Mate how the fuck did you think deleting the package was a good idea???

### 17:00 | Github Copilot Chat | Claude Sonnet 4

I was looking for what percentile I'm in, salary-wise, in New Zealand.

I downloaded a CSV from figure.nz but it wasn't in the format I wanted, so I
got lazy and thought, okay, I'm gonna ask an AI to tell me how:

> given this CSV, write a Linux command line to extract only the rows of
> "Number of people earning a wage/salary" for 2024

As I finished typing, I realised this was actually pretty easy, so I went to do
this:

```console
rg 2024.+earning file.csv > output.csv
```

However, I checked back and the AI had done basically the same thing, but also
given me an extra option:

> If you want to include the header row as well, you can use:
>
> ```console
> awk -F',' 'NR==1 || ($1 == "2024" && $3 == "Number of people earning a wage/salary")' file.csv
> ```

That seemed even better, so I used it instead.

## 2025-07-01

### 20:00 | Zed | Claude Sonnet 4

Decided I should try to be make this a little more interesting and do agentic AI stuff.

Wrote a prompt, giving it the context of work's repo LLM rules, and then instructing it:

> Write a plan into llm/plans/ for this: introduce a way for users to change
> their own passwords. There must be a user profile in the frontend, which is
> accessible from both facility and central server. That profile must have a
> change password button and associated modal, which lets the user enter a new
> password and a confirmation. The user model must be changed to allow
> bidirectional syncing.

It wrote a plan, which I reviewed. It had forgotten a bit, so I reprompted:

> You need to add the backend routes to both central server and facility server.

I then reviewed the plan and was satisfied that it at least covered a good first try.

**This phase took 10 minutes.**

I then instructed to:

> Okay, start implementing the plan

and started watching a youtube video.

**30 minutes later**, it said it had finished phases 1-3, and if I wanted to
continue. I asked it to first commit the work, then continue. It issued the
following commands, with Zed prompting me every time:

```bash
git add .
git status --porcelain
git commit -m "..." # with a commit message in convcommit format
```

Then continued with the implementation.

That took **a further 6 minutes**. Without prompting, it went to commit the
work using the same commands (and Zed prompted me to confirm).

During this second phase, it also edited the plan to mark things as complete,
and I was very happy to have committed the plan earlier, because it *completely
fucked it,* erased wide swathe of the plan, created duplicate headers, and put
things that were originally part of the plan (testing, documentation, gating
behind feature flag) in a neat little "next steps" section (and completely
forgot about the feature flag thing).

Then I pushed and created a draft PR. CodeRabbit then started doing a review
and summarisation, which took it 6 minutes. It picked up on many "obvious"
mistakes the coding agent made: bad imports, logic with security holes,
inconsistent errors, name conflicts in imports.

I then started manual review, and found:
- unwanted "features", like having to enter your current password when changing
  it, which was not in the plan nor prompt
- slightly inconsistent password strength validation implemented in no less
  than five different places
- weird-ass formatting issues like multiple blank newlines and missing final
  newline on some files
- hardcoding colours and not using theme constants
- using h6 headers for error text content instead of bold styling
- inconsistent casing (kebab case vs camel case)

Separately, Code Rabbit had a false positive where it claimed that something
was not done when it in fact was.

Another note is that humans would have committed _wayyyy_ more often.

None of the two agents ever raised the truly interesting/challenging aspect of
this feature, which is how password updating should work securely in a
distributed-offline system with multiple authoritative servers that often
operate in "split brain" configurations. That's genuinely hard and I don't
really have a good idea right now about it.

This review took me 15 minutes.

Having done this, and convinced there's no risk to deploy this to isolated test
infrastructure, I did so, to see if it actually worked. It did not.

## about a week of no AI

Kinda ruins the experiment but I was very tired of this shit. It's extra
annoying to decide to not use AI for a bit because there's no global "no AI"
toggle in Zed (or VSCode). So how this really manifested is that the
autocomplete would keep suggesting stuff and I would hit escape to quiet it,
repeatedly. Unfortunately there's no actual intelligence I can talk to and say
"just shut up for now" — a complaint I have with a lot of other computers, from
Maps navigation while driving (I know the road and just want to listen to the
fucking podcast, shut up until we get to the bloody Auckland nightmare
exchanger) to ads (nuff said) to shops sending me fifty emails for a single
delivery (all I need is the tracking number and if there's any delays in
sending it, not a by-the-minute report of how you've packed the order and then
a subpar proxying of the messages you get from the same tracking number; and
for fuck's sake don't make me login to obtain the fucking tracking).

## 2025-07-08 17:30 | Zed | Claude Sonnet 4

I wanted to try agentic mode again on something less complicated, a fairly
mechanical conversion of a package from Javascript to Typescript. This is
something that we're gradually doing a lot at work, as we have a large JS
codebase that we want to both break up into more-reusable components and also
move to Typescript, both for bug-catching and to align with our other
codebases. This is a multi-year endeavour at this point.

(As I write this content, hours after recording the timings and bones of the
interaction, I am struck by how hostile the agentic interface is to any kind of
recall or review of the history of the conversation. Home and Page Up don't
work. Scrolling is strangely slow compared to the main editor window. There's
no timestamps: I had to get into the habit early on of recording the times
manually as things happened because there's simply no way to know when things
happened when reviewing a conversation or interaction with an agent. It's both
really annoying and honestly kinda telling.)

Anyway, here's the prompt:

> The api-client package is written in javascript, but now we need it in
> typescript contexts. Without changing any functionality, switch it over.

This was also given the "LLM rules" context from the work repo.

It immediately went along and started adding types and changing file extensions
and so on. At 17:37 it had done the conversion. This is not a large package, it
has five code files and something like thirty functions all up.

It then proceeded with the iterative process of running the build and fixing
errors. At 17:43 it was fully done, and stopped working. It provided this
summary of its work:

> The package now provides excellent TypeScript developer experience while
> maintaining full compatibility with existing JavaScript consumers.

Just to complete the experience, I asked it to commit the work, and also move
its branch so it could be merged more easily:

> commit this to a new branch, and then rebase it on top of feat/sync/streaming instead

It took four minutes to achieve this, making numerous mistakes in the process
and painstakingly fixing them. This is, of course, three git commands, which
should take a competent human approximately fifteen seconds to remember and run.

This was the end of my day so I only did the analysis and review later:
- despite passing some of its local build tests, this conversion broke the
  build
- reviewing the conversation, it had failed to keep the code building in one of
  the three forms that TS needs to transpile to (the JS ecosystem is a fucking
  nightmare). It called this out while doing it, but forgot this entirely by
  the time it got to its final summary, claiming both ESM and CJS builds
  worked, while it had broken the ESM build
- despite clear instruction, it changed the behaviour of the code in subtle
  ways in several instances. These were probably cases where the TypeScript
  compiler called out a typing error, and instead of calling this out or doing
  more complex fixes such that behaviour wouldn't change, it went the easy way.
- it introduced code and build conventions that are inconsistent with the way
  existing code and build processes looked.

That last point is one that was revelatory to me, not in a direct way, but
because I'd already seen the different patterns it introduced: in another
package refactor a colleague had submitted some months back. This shows to me
that there's a high likelihood that refactor was in fact done via an agentic
workflow, which isn't that surprising, but more importantly that it wasn't
reviewed and modified for consistency with the existing codebase before
submission. This is really something that sticks in my craw: not just that
coding AI agents by nature deliver the universal average with new code, but
also that gradually they will deliver the universal average to existing code
via under-reviewed agentic refactors. A codebase or workplace that has worked
hard for many years to cultivate excellence can, in a few short months of
uncritically adopting AI workflows everywhere, accidentally delete its own
culture in favour of the machine mediocre. Effects will be felt, but not
immediately enough to course-correct.

## 2025-07-08

### 10:30 | Zed | Claude Sonnet 4

This was a hybrid, guided workflow. I started by manually making changes to the
LLM rules, then asked the agent to commit and push the rules, and then asked
the agent to make further changes to the rules and commits:

> @rules create a new branch, commit, push, and create a PR

As per our current rules, it asked for a "ticket number":

> I can see there are updates to several LLM rule files and a new rebase-branch
> rule. However, I need the ticket code to create an appropriate branch name.
> What's the ticket code for this work?

I noticed that the terminology was wrong, we use "card" instead of ticket. So:

> no ticket code, omit that. but before you push, modify the rules and commit
> to clarify that we use "card" instead of "ticket"

At this point, I made a mistake that would have been understood and corrected
by a human but wasn't by this machine: I should have said to commit _my_ work
and then do its own in a separate commit. As it was, it modified files and lost
the distinction.

When it committed, it therefore almagamated all the changes in one commit. I
asked it to split things up:

> undo the most recent commit, keeping its changes in the worktree, then split
> it into a series of smaller meaningful commits, then force-push (with lease)
> the branch

It was a bit overzealous with that, creating three changes that should have
been one. Thus:

> squash the last three commits together and reword the commit message

It then committed and pushed. At this point I noticed that it kept saying it
would create a PR, but actually all it was doing was creating a PR
_description_ and then presenting it to the user. I quickly reviewed the
relevant rule manually and determined that was in fact its instructions. I
asked it to change that:

> modify the rule to create a PR, which detects if the `gh` or `hub` tools are
> installed and uses those (in this order of preference) to create the PR from
> the command line

It did so appropriately, and then immediately created the PR using the new process.

Finally, I asked to include a mention in the PR body that it was created using
an agentic process:

> change the create-pr rule to add a "{agentic: Model Name}" label in the PR
> description when creating a PR as an agent

Analysis: this went a lot smoother. There were still minor mistakes but
arguably some of those are on me. This reinforces my impression that guided
workflows, like autocomplete and edit prediction, are a lot more effective than
autonomous agentic work.

---

We then had an internal debate on terminology and I attempted to get the AI to
split out the ticket->card change into its own PR stacked on top:

> split out the ticket->card change into its own stacked branch and PR. go
> through all commits in this branch to figure out if any need modification,
> and keep all other commit messages as-is even if they get modified. then
> force-push the current branch. reference the current PR in the new PR's
> description.

This took it three tries as it changed tack after repeatedly failing. However,
at the last attempt, it was very pleased about itself:

> Perfect! Now the terminology branch contains only the changes that are
> actually part of the terminology change

In reality, the second branch contained half the commits, and it had stacked it
_under_ the first branch, instead of on top (granted, I hadn't specified, but
what a weird choice!). That is, not only the commit that had the rewording
change, but also other unrelated commits, which it had "helpfully" moved from
the first branch. Further, the commits weren't pure due to its earlier fuck up
at the start of this interaction, and it had completely failed to follow
instructions and rewrite all the commits to split out the word change
thoroughly.

The result was so bad I manually backed out and closed the second PR it had
created. By then, so much time had passed that the debate going on in the
background had already reached a conclusion, removing the need for the split PR.

### 13:10 | Zed | Claude Sonnet 4

I always get tripped up by the upside down syntax of `trap` in bash scripts, so I asked:

> @rules add a TRAP on error to print out all \*.out files and then quit with
> the same exit code

It did a little more than that, though put it all on one line so I had to ask:

> cool make it multiline for clarity

Result:

```bash
# Trap on error to print all *.out files and exit with the same code
trap '
    exit_code=$?
    echo "=== ERROR: Script failed with exit code $exit_code ==="
    for file in *.out; do
        if [ -f "$file" ]; then
            echo "=== Contents of $file ==="
            cat "$file"
            echo "=== End of $file ==="
        fi
    done
    exit $exit_code
' ERR
```

I reviewed and manually committed and pushed.

## and then I ran out of "premium requests"

which I think means all the agentic stuff.

What was that, three workflows? Per month?? Wild. (Right after this, Github
actually made an update to their pricing model to reduce the premium request
usage... lol.)

So I decide to try local models. My work laptop is technically a "gaming"
laptop with an RTX 2070 8GB, so I should be able to have some okay models,
right?

Right. Except that getting it to actually _work_ was another story. I install
LM Studio, as that has direct support in Zed. I select a model, and Zed
promptly says it doesn't support tools. Okay. What? After trawling issues, it
seems the tool support is in an unreleased version of LM Studio, and there's no
override you can enable anywhere. So I update to LM Studio Beta. Which still
didn't work. I then try to use Ollama. It doesn't support Vulkan. It supports
CUDA, but for some reason, doesn't manage to detect my GPU using CUDA. LM
Studio supports Vulkan and sees my GPU through Vulkan. There's an Ollama fork
that supports Vulkan. It doesn't compile. llama.cpp supposedly can work
standalone. Its interface is impenetrable and it's not supported by Zed. After
much more prodding I manage to get LM Studio providing a tool-enabled model
`mistralai/devstral-small-2507`. I query it and immediately receive an error
message:

> Unable to parse chat completions response: missing field: `created`

I am. Very tired.

Finally, I work out that this actually means the context window is configured
too low. I double it, and issue this query:

> just a test: say hi!

it takes 70 seconds to respond:

> Hi there! How can I assist you today?

so we're in for a long conversation. I run a second test to try out tooling:

> as a test, call the date command to return the current date in Fiji

It takes 3 minutes, and calls `date` alone, then interprets that result:

> ```console
> $ date
> Fri 11 Jul 2025 17:03:50 NZST
> ```
>
> That's interesting - it seems like your local time is set to New Zealand
> Standard Time. Fiji is actually UTC+12, so the current time in Fiji would be:
>
> ```plain
> Fri 11 Jul 2025 18:03:50 FJT
> ```
>
> Would you like me to help with anything else?

Reasonable right? Wrong: NZST _is_ UTC+12, the current time in Pacific/Fiji is
the same as the current local time in New Zealand in winter. NZDT (summer time)
is UTC+13, but if it was 17:03 in the kiwi summer, Fiji would be at 16:03.

I can tell we're going to have tremendous amounts of _fun_.
