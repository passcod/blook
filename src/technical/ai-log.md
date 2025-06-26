# AI Log

This is a diary where I record every single interaction I knowingly have with an genAI system,
over a one-month period from 2025-06-21 to 2025-07-20.

Records are made first briefly by pasting text or code, and then revised with more detail later.
This may give the impression that I constantly interrupted myself recording the interaction, but
in fact most of the explanations describing the sequences of actions are reconstructed, then when
appropriate or relevant an analysis is added on top. While I've recorded almost every interaction,
and tried to preserve notes as best I could, the final version you're reading has had several edit
passes for clarity as well as redaction when appropriate (every single interaction means not only
for personal use, but also for work — in fact most of the events are for work, as I simply don't
use AI a lot outside of that for various reasons).

Most of this will be in code editors. I indicate the model when known. I have free access to Github
Copilot Pro via opensource contributions (or something, idk what the criteria is exactly), I also
use the free default tier of Zed's AI models, and occasionally I might use local models run on GPU
via Ollama or LM Studio. When not in code editors, I may use Gemini as part of my workplace's Google
subscription, and other genAIs embedded in various products.

Google Translate and transcription services are not considered genAI by this research. Summaries on
top of transcriptions are.

Times are approximate and largely reconstructed.

Cursor position when relevant is indicated with ‡.

This is a tremendously long document; if you're looking for overall analysis and retrospective, that
will come in a later post: there is no point scrolling to the end if you're not interested in the
minutiae of the data.

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

I was trying to deliberately think through parser approach and design, so it was kinda unwanted.

For this experiment's sake, though, I decided to keep it initially and review instead of immediately hitting Undo:

- `"string".to_string().padded().map(...)` is nonsense. this isn't how the chumsky API works at all. Instead, I'd write something like `just("string").padded().to(...)`.
- even then, adding the padding to every call is silly, and also wrong, as whitespace is significant in this context.
- the pattern part can be considerably more things than would be matched by `text::ident`.
- the comment part needs to come after a `#`, which is completely absent from this approach
- the comment part also assumes that there will be a newline in the input, which is nonsense, especially in chumsky's approach that parsers are complete by default.

All in all, this was an unwanted interaction that had the right general structure but was utterly wrong on most details.
I scrapped it and continued by hand, as I'd initially intended.

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

including an entire body. This was not what I wanted at all, so I had to kill the suggestion and continue by hand.

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

I accepted [a commitable suggestion from a review comment](https://github.com/beyondessential/tamanu/pull/7867#discussion_r2160628686). The diff it was showing was unnecessarily long for the one-line change it proposed, but I figured it was just a generation error.

However, after apply I went to check its work and found out that it had indeed completely fucked up, duplicating lines and breaking the build:

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

I was looking for the correct journalctl incantation to get just the messages, not the timestamps.
I initially made a couple of regular DDG searches, but wasn't getting good results:

- journalctl without timestamps
- journalctl just the message

So I asked the chat-UI panel in my editor with the following prompt:

> give me the journalctl command to print logs with just the message content, not other information like timestamp and unit

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

I downloaded a CSV from figure.nz but it wasn't in the format I wanted, so I got lazy and thought, okay, I'm gonna ask an AI to tell me how:

> given this CSV, write a Linux command line to extract only the rows of "Number of people earning a wage/salary" for 2024

As I finished typing, I realised this was actually pretty easy, so I went to do this:

```console
rg 2024.+earning file.csv > output.csv
```

However, I checked back and the AI had done basically the same thing, but also given me an extra option:

> If you want to include the header row as well, you can use:
>
> ```console
> awk -F',' 'NR==1 || ($1 == "2024" && $3 == "Number of people earning a wage/salary")' file.csv
> ```

That seemed even better, so I used it instead.


