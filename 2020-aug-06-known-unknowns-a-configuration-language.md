---
# vim: tw=100
date: 2020-08-06T01:59:42+12:00
title: "Known Unknowns: a configuration language (Dhall review)"
---

Last month I dove into [Dhall] after discovering it more than a year ago but never having the excuse
to really get stuck into it. Last month I got two different opportunities, and used it for both: an
[autoinstall template for Ubuntu 20.04][autoinstall], and a Kubernetes config template for very
similar containers that each needed a pod and a service just to vary one or two settings.

[Dhall]: https://dhall-lang.org/
[autoinstall]: https://ubuntu.com/server/docs/install/autoinstall-reference

While Dhall is good at what it does, despite many rough edges, as I progressed I realised it's
really not what I want. It and other precompilers will do as a stop gap, but this post is about a
different concept in the configuration space that fits more with my needs/wants.

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

## What I'd really want, and where this starts to seriously diverge

As, I went down this road one nebulous concept really made itself known by its lack, which I'm
calling here Known Unknowns. Beyond specific and general annoyances with Dhall, this is a pretty
fundamental thing, which could be surfaced as a different language.

Basically, I want a configuration pre-processor that is fully typed, but has a concept of "holes" or
"unknowns". As you compile your configuration, the compiler tells you if there are any unknowns it
still needs to finish the process. Furthermore, you can instruct it to "expand" the source as far as
it can go with what it has, and leave the unknowns there. You can then store or pass on this result
to some other component or system.

This is essentially full-document currying: you're filling all the variables you have, and until
every variable is filled in, the result is still a function of further inputs.

Why would this be useful? Well, think of a configuration like Ansible or Terraform, where some
variables might be remote to your local system, or be dependent on context. You could write a
network configuration, for example, that needs the name of the main interface to really proceed. You
then write a config within the typesystem, which enforces at the type level things like providing
either a static IP xor DHCP=true. You compile this config, and the compiler expands the typesystem
out to a Netplan config shaped intermediate form, and tells you its known unknowns, in this case the
interface name. You can manually check over the config to see that it's what you meant. You can then
give that to Ansible for a dry-run, which will go and fetch the interface name from the running
system (an operation with no side effects, so available in a _dry_ run), and complete the config.
With no unknowns remaining, only a Netplan config remains. You can still manually check over the
final output, before the "wet" run applies it.

Do that on a wider scale, and you get a powerful system that, instead of throwing an error if
something is missing, tells you what is missing and also provides useful output even with the
missing bits. You can have as many steps as needed: pregenerate a large config, use it to derive
where to look for missing data, ask a human for input for more unknowns, fetch more data from
places, and only once everything is filled in can you apply it.

You can install configs with known unknowns on a system, so long as the consuming application will
be able to fill those in.

You can "pass" a config along different departments, which each filling in their bits. For example
make a request for a new virtual machine, which you require to have some memory, some disk, and
running a specific OS. Pass that on to Network, which assigns an IP, subnet, virtual LAN; pass it on
to Storage, which reserves block storage and fills in which datastore it needs to be in; pass it on
to Approval which reviews and adds authentication; pass it back to the requester, who adds their SSH
keys and checks it against what they passed on originally for any modification.

You can go a bit deeper in the analysis, and figure out which _parts_ of a document depend on
unknowns, and which don't. You can have unknowns that are partially filled in by other unknowns.
You can do dead unknown elimination and get warnings when a configuration would not use an unknown
in the final output.

You could even have partial "wet" runs that do as much as possible until they find an unknown, and
because the unknowns can be known beforehand, statically, you can skip over them instead of stopping
at the first one.

You could run simulations by filling unknowns with fake values, and seeing how that behaves.
That could be really powerful to make even more advanced dry runs.

---

This is a fairly nebulous idea at this point, but I feel it would be a _lot_ more useful than a
programming typesystem applied to configuration, which requires that all types and holes are
resolved ahead of time.

Another project on the pile...
