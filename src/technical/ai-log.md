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

Searched for `stray digicode safe`. The "AI assist" feature returned two codes, one of which I already had. The second worked in game, so I didn't look further.

