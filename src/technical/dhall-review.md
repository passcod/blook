# Dhall: not quite it

> 8 August 2020

Last month I dove into [Dhall] after discovering it more than a year ago but never having the excuse
to really get stuck into it. Last month I got two different opportunities, and used it for both: an
[autoinstall template for Ubuntu 20.04][autoinstall], and a Kubernetes config template for very
similar containers that each needed a pod and a service just to vary one or two settings.

[Dhall]: https://dhall-lang.org/
[autoinstall]: https://ubuntu.com/server/docs/install/autoinstall-reference

While Dhall is good at what it does, despite many rough edges, as I progressed I realised it's
really not what I want.

## What Dhall does well

**Types.** Dhall is fully typed in the Haskell fashion, and every Dhall document is an expression,
which contains types or values, or trees of types and trees of values. Dhall does structural typing,
so two types `A = { an: Integer }` and `B = { an: Integer }` are actually the _same_ type.

**Safety.** Dhall is strictly non-Turing-complete, and most notably is guaranteed to complete (no
halting problem here). Functions have no side effects, and while input can be done from files, the
environment, and remote URLs (!), output is only through whatever structure is left at the end.

**Reproducibility.** Dhall includes concepts and tools that can enforce the integrity of imports,
and verify that one expression is equivalent to another, such that you can refactor how that
expression is constructed and authoritatively assert that your refactor is correct.

**Library.** As an established project, there are libraries that are built up for various projects,
such as for Kubernetes manifests, Terraform, GitHub actions, OpenSSL, Ansible... additionally, the
built-in function and keyword set is very small, so everything is accessible, inspectable, etc.

## Where I found it lacking

**Errors.** Good erroring is hard, I'll acknowledge. Dhall erroring isn't _terrible_... but it's
often obscure and mislaid me many times. Dhall often stops at the first error, which might be a
_consequence_ or a _symptom_ of the actual mistake, and gaining that visiblity is hard.

**Familiarity.** and layperson-friendliness. Is basically zero. Dhall errors require familiarity
with Dhall errors: they're not very approachable unless you're already familiar with them. Dhall
itself is foreign at times, and some of its syntax quirks are downright baffling (in one pet peeve,
it bills itself as whitespace insensitive, but what it really means is that as long as whitespace is
in the right place, it doesn't care what that whitespace _is_... but `a(b c)` is still different to
`a (b c)`, to hilariously-hard-to-debug effects.) While I can use Ruby, Rust, and advanced Bash in
work projects, I would _never_ use Dhall because it would add more barriers than it adds value.

**Inconsistency.** For a language with a tiny built-in library, it's quite surprising. Everything in
Dhall is an expression... except some things that look like expressions but aren't (like the `merge`
keyword). The whitespace thing. Imports get an optional argument for a checksum, something that
_nothing else_ can do (no optional or default arguments, though the record pattern approximates some
of it). Some things are keywords, some things are symbols, and some things are nothing at all, with
little rhyme or reason. It makes hard to develop intuition.

**Information loss.** There's a bug open for at least three years where the _formatting_ tools of
Dhall will silently erase all comments except those at the top of a file. Dhall is bad at respecting
ordering. This is surprising for a configuration tool: while the consuming application might not
care, order can be very important for _humans_. Some tools may even interpret ordering, for example
overriding earlier identical keys in a JSON map, or keeping the first one, and re-ordering may
actually change meaning.

**Inference.** Because Dhall does structural typing with named and anonymous members, and because it
has no generics, there's many situations where it _knows_ the type of something, but will refuse to
compile unless you explicit it, which can be very repetitive and/or require refactorings to put a
name on a previously-anonymous type.

**Inheritance or extensibility.** While I _like_ the lack of class-based inheritance in
_programming_ languages like Rust and instead embrace the wrapping and trait and composition types
concepts, _configuration_ is a different space. It's not uncommon for a configuration schema to have
a general shape for a stanza that is specialised in many different variants, and representing that
in Dhall is painful, repetitive, or both.

**Translation.** Somewhat related or an alternative to the above. Dhall makes it easy to create
type-friendly structures, but offers little to translate those structures back into what the actual
consumer expects. This ranges from key/value translation, where a Dhall-idiomatic spelling would be
`StorageKind` but the configuration requires `storage-kind`, to flattening, where you could express
a structure as a `Action<Specifics>` where `Action` has a type and id, and `Specifics` is an
enum/union for `AddPartition` or `WriteFilesystem` but the required structure has type and ids and
all specific properties on the same level, to different translations for different outputs.

**Postel's Law.** Or robustness principle. The one that goes "Be conservative in what you do, be
liberal in what you accept from others." Dhall is conservative in what it does, certainly, and also
very strict in what it accepts. This would not be so much a problem if the tooling/erroring was
better: JSON can also be said to be strict on the input, and tooling exists that will point to where
the error is quite precisely; YAML can be said to be quite lax, and may silently do the wrong thing.
Dhall, however, doesn't improve one way or the other.
