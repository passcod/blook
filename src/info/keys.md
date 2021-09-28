# Cryptographic keys

I have three kinds of keys at the moment: good old [PGP/GPG keys](#gpg-keys) that are mostly used to
sign git commits, [minisign keys](#minisign-keys) that are used to sign software (being phased out),
and [sigstore keys](#sigstore-keys) that are used to sign software (being phased in).

## GPG keys

These have an expiration date. I initially did 1-year keys, but that was too much trouble, so in
2015 I decided to use 10-year keys, possibly with more short-lived subkeys.

The keys are also available on public keyservers, e.g.:
- [pgp.mit.edu](http://pgp.mit.edu:11371/pks/lookup?search=passcod&op=vindex&fingerprint=on&exact=on)
- [keys.gnupg.net](http://keys.gnupg.net/pks/lookup?search=passcod&op=vindex&fingerprint=on&exact=on)

### Current key: passcod06 (2015–2025)

```text
pub   4096R/E44FC474 2015-04-11 [expires: 2025-04-08]
key   C24C ED9C 5790 0009 12F3  BAB4 B948 C4BA E44F C474
uid   Félix Saparelli (:passcod) <felix@passcod.name>
```

- [Public key](keys/passcod06.asc)
- [Signature by `passcod05`](keys/passcod06.asc.05.sig)

### passcod05 (2014–2015)

```text
pub   4096R/AE1ED85D 2014-03-27 [expires: 2015-03-27]
key   E49C 3114 2E3D 10A4 69F0  86DC 6B09 4637 AE1E D85D
uid   Félix Saparelli (:passcod) <felix@passcod.name>
```

- [Public key](keys/passcod05.asc)
- [Signature by `passcod04`](keys/passcod05.asc.04.sig)
- [Signature by `passcod06`](keys/passcod05.asc.06.sig)
- [Revocation](keys/passcod05.revok)
- [Signature on revocation by `passcod06`](keys/passcod05.revok.06.sig)

### passcod04 (2013–2014)

```text
pub   4096R/3C51B6EB 2013-03-27 [expired: 2014-03-27]
key   0417 E9C8 3281 CB17 E7CB  B0EA AE48 6FBE 3C51 B6EB
uid   Felix Saparelli (:passcod) <me@passcod.name>
```

- [Public key](keys/passcod04.asc)
- [Signature by `passcod03`](keys/passcod04.asc.03.sig)
- [Signature by `passcod05`](keys/passcod04.asc.05.sig)
- [Revocation](keys/passcod04.revok)
- [Signature on revocation by `passcod05`](keys/passcod04.revok.05.sig)

### passcod03 (2012–2013)

```text
pub   4096R/C2C15214 2012-09-26 [expired: 2013-03-25]
key   FE31 5C83 9FC5 0618 A49B  AEE3 8487 3386 C2C1 5214
uid   Felix Saparelli (:passcod) <me@passcod.net>
```

- [Public key](keys/passcod03.asc)
- [Signature by `passcod04`](keys/passcod03.asc.04.sig)
- [Revocation](keys/passcod03.revok)
- [Signature on revocation by `passcod04`](keys/passcod03.revok.04.sig)


## Minisign keys

In [minisign](https://github.com/jedisct1/minisign) format, used for signing software binaries.

### Software

```text
untrusted comment: minisign public key: 2264BBE425DA952E
RWQuldol5LtkIrx0khfo4Z7Y8SixwG2K8OagJSvsJNBcuLgB2oVNJFFv
```

- [Public key](keys/software.pub)


## Sigstore keys

In [sigstore](https://www.sigstore.dev)/[cosign](https://github.com/sigstore/cosign) format, used
for signing artifacts (software binary releases, container images, etc).

Eventually this will disappear as keys move to be ephemeral and generated against my identity, but
in the meantime you can use this key to verify artifacts, along these lines:

```bash
$ cosign verify \
  -key https://passcod.name/info/keys/cosign.01.pub \
  ghcr.io/org/repo:version_target.ext
```

### Cosign.01

```text
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE3LYhdTwREhG9zVKc2aI3FzR6oHto
XRYiZtQGxtlbsUMacCHdvvBmTSEg6Zsf9jflNU0slFKExLX/z+zZHykmpg==
-----END PUBLIC KEY-----
```

- [Public key](keys/cosign.01.pub)
