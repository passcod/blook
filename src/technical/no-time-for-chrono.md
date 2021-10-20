# No Time for Chrono

> October 2021

TL;DR: [Time 0.1 and 0.2 have a security notice][RUSTSEC-2020-0071] about use of the `localtime_r`
libc function, and [Chrono has a related notice][RUSTSEC-2020-0159], both issued in November 2020.
While [Time has a mitigation in place][time-293], [Chrono doesn't and doesn't plan to][chrono-499].
The security issue is very specific and can be mitigated through your own efforts; there's also some
controversy on if it is an issue at all. The Time crate has evolved a lot in the past few years and
its 0.3 release has a lot of APIs that Chrono is used for; thus it is possible for many, but not
all, Chrono users to switch to Time 0.3; this could have some additional benefit.

* auto-gen TOC;
{:toc}

## The security issue

From the advisory:

> Unix-like operating systems may segfault due to dereferencing a dangling pointer in specific
> circumstances. This requires an environment variable to be set in a different thread than the
> affected functions. This may occur without the user's knowledge, notably in a third-party library.
>
> Non-Unix targets (including Windows and wasm) are unaffected.

### Advisory notices

- RustSec:
  - [RUSTSEC-2020-0071] on Time 0.1 and 0.2.7–0.2.22
  - [RUSTSEC-2020-0159] on Chrono
- Mitre:
  - [CVE-2020-26235](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-26235)
- GitHub:
  - [GHSA-wcg3-cvx6-7396](https://github.com/time-rs/time/security/advisories/GHSA-wcg3-cvx6-7396)

### `localtime_r` and `setenv`

From the [manpage](https://man.archlinux.org/man/core/man-pages/localtime_r.3.en), edited for length:

> The `localtime_r()` function converts the calendar time `timep` to broken-down time
> representation, expressed relative to the user's specified timezone. The function acts as if it
> called `tzset(3)` and provides information about the current timezone, the difference between
> Coordinated Universal Time (UTC) and local standard time in seconds, and whether daylight savings
> time rules apply during some part of the year.

Meanwhile, [setenv](https://man.archlinux.org/man/core/man-pages/setenv.3.en):

> …adds the variable `name` to the environment with the value `value`…

The issue occurs when the environment of a program is modified (chiefly with `setenv`) at the same
time that `localtime_r` is used; in those cases, a segfault may be observed.

`localtime_r` is a fairly complex beast, which interfaces with the system's timezone files and
settings to provide localtime information and conversion. It is a very useful function that is used
pretty much everywhere that needs to interact with local/utc time and timezones. Handling timezones
is largely regarded as all programmers' bane; replacing this function with one that does not have
the behaviour is a [potentially massive endeavour][time-293-byron].

Time has mitigated the issue by removing the calls to `localtime_r`, returning errors in 0.2 and 0.3
[unless a custom `cfg` is passed to the compiler][time-4eebedd4-unsound]. That does mean that if you
_do_ want that information, you're out of luck unless you (as an application) or all your end-users
(as a library) enable that custom configuration.

### The counter view

[Rich Felker (author of musl) has another view.][env-rust-felker] He argues that the issue is not in
calling the `localtime_r` function, but in modifying the environment. The environment ought to be
immutable, and it is somewhat well known in other large projects that the footgun exists:

- [In the Julia language, also featuring Felker][env-julia-felker]
- [In C#'s CoreCLR][env-coreclr]
- [In OpenBLAS][env-openblas]
- [In GNOME][env-gnome]
- [In the POSIX standard][env-posix]

This issue is even known to the Rust project, with [a documentation PR in 2015(!) adding cautionary
language to the `std::env::set_var` function][env-rust].

I don't have nearly the same amount of knowledge in this issue, but for the record, and despite the
sections below, I do _agree_ with the view that the environment should be considered read-only.
Perhaps a clippy lint could be added.

## Replacing Chrono

Regardless of the previous discussion, there are other issues around usage of Chrono.

### Chronic pains

Its last release at writing, 0.4.19, was [more than a year ago][chrono-0.4.19]. Issues are piling
up. It's still on edition 2015 (which to be clear isn't really an issue, but more of an indicator).

It could just be that the crate is considered finished (the docs _do_ describe it as
"feature-complete").

Or it may be that maintainers have mostly checked out. (No fault on the maintainers! I've done the
same with Notify, once.)

If you're fine with this, and you're confident that you (and your dependencies) aren't writing to
the environment, then you can keep on using Chrono. There is, however, a viable alternative now:

### Time 0.3

[Time's 0.3 release adds many APIs][time-0.3], which cover a large amount of the surface that Chrono
is used for:

- No-alloc mode
- The `Month` type
- Calendar/Ordinal/ISO/Julian conversions
- Large dates (beyond +/- 9999 years)
- Parsing and serde support

There are also some features which are only supported by newer Time, not by Chrono:

- `const` functions
- the `datetime!` macro for constructing datetimes at compile-time
- Serialising non-ISO8601 representations
- Random dates/times
- [QuickCheck](https://docs.rs/quickcheck) support

Therefore, you can now reasonable replace Chrono with Time!

(In the future I hope to provide a "quick migration guide" here. For now, it's left to the reader!)

[RUSTSEC-2020-0071]: https://rustsec.org/advisories/RUSTSEC-2020-0071
[RUSTSEC-2020-0159]: https://rustsec.org/advisories/RUSTSEC-2020-0159
[chrono-0.4.19]: https://github.com/chronotope/chrono/releases/tag/v0.4.19
[chrono-499]: https://github.com/chronotope/chrono/issues/499
[env-coreclr]: https://yizhang82.dev/set-environment-variable
[env-gnome]: https://sourceware.org/bugzilla/show_bug.cgi?id=15607#c4
[env-julia-felker]: https://github.com/JuliaLang/julia/issues/34726#issuecomment-584727732
[env-openblas]: https://github.com/xianyi/OpenBLAS/issues/716
[env-posix]: https://austingroupbugs.net/view.php?id=188
[env-rust-felker]: https://twitter.com/RichFelker/status/1450300830381445121
[env-rust]: https://github.com/rust-lang/rust/pull/24741
[time-0.3]: https://github.com/time-rs/time/blob/main/CHANGELOG.md#030-2021-07-30
[time-293]: https://github.com/time-rs/time/issues/293
[time-293-byron]: https://github.com/time-rs/time/issues/293#issuecomment-909009716
[time-4eebedd4-unsound]: https://github.com/time-rs/time/blame/4eebedd48c505fb7b042ad8aff8ad7665c5545ed/src/utc_offset.rs#L330-L332


<!-- ! vim: tw=100
-->
