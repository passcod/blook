---
date: 2018-09-10T20:35:14+12:00
title: Lightweight PKI for single-purpose keys
frontpage: false
tags:
   - introduction
   - crypto
   - signify
---

BSD devs do signing differently: ED25519 key pairs. The keys are lightweight.
The usage is pretty simple. There's very few options. The tooling only tries to
do what it knows it's good at: signing and verifying.

I wanted a way to sign releases and other things. Here's my scheme:

## Priming keys

Prime keys are my personal keys. Their only use is signing other keys. The
secret keys are password-protected on an encrypted and backed-up volume/folder.
The public keys are [published on my website][gh-primes].

I have a little script to generate new primes. Minus some fluff, it does this:

```bash
name="$1"
if [[ -z "$name" ]]; then
  name=$(date +%Y)
fi

path="prime/$name"

# Make new prime
signify -G -c "$comment" -p "$path.pub" -s "$path.sec"

# Sign new prime public with current prime
signify -S -x "$path-signedwith:$current.sig" -s "$prime.sec" -m "$path.pub"
```

1. Make a new prime (defaulting its name to the current year)
2. Sign the new prime's public key with the current prime

That's it. Then I publish the publics and signatures.

The first key (named 2018) will obviously have no signature. I've [put it on
twitter][tw-prime] instead. Subsequent ones can be generated at any interval I
want, and it's just running a script, but even if I lose the script (and this
post), I can redo it pretty easily.

[gh-primes]: https://passcod.name/keys
[tw-prime]: https://twitter.com/passcod/status/1039122063003459584

## Signing keys

Actual signing is done by single-purpose keys. The public keys, and the
signatures of the publics by the current prime, are to be distributed along
the projects they're signing. The private keys can be kept here, or encrypted in
repos, or in secure storage on CI servers, or...

"Single-purpose" means, for example:

 - all revisions of one document or set of documents, but not unrelated ones
 - a single project
 - CI-automated releases of a project (that would be a different key as manual releases!)

To create a key, I have a simple script:

```bash
path="$1"
shift

comment="$*"
if [[ -z "$comment" ]]; then
  comment="$path"
fi

# Generate, no passphrase
signify -G -n -c "$comment" -p "$path.pub" -s "$path.sec"

# Sign public key with prime
signify -S -x "$path-signedwith:$current.sig" -s "$prime.sec" -m "$path.pub"
```

## Checking signatures

To check a signature on a release/document/whatever you need to:

1. [Get signify](https://github.com/aperezdc/signify)
2. [Get my current prime key][gh-primes] (or whichever prime signed the release key)
3. Verify the release key: `signify -V -p prime.pub -x key-signedwith:2018.sig -m key.pub`
4. Verify the release: `signify -V -p key.pub -x release.sig -m release.whatever`

You can script that, and you can cache the release key once verified. These
instructions should also be provided along the release.
