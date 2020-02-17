---
date: 2020-02-18T09:39:10+13:00
title: Adventures in Overkill: DNSSEC for a private zone
frontpage: false
---

> ***Housekeeping***:
>
> _I have long-standing plans to modernise and refresh the appearance,
> organisation, and content of this blog, but I have mentally gated these plans
> on the move of this blog’s hosting to my own infrastructure, which this post
> is part of building. So please excuse the dreadful layout. As a reminder,
> given it's been quite a while, there is a small button in the bottom left to
> switch to dark mode, and no, this website doesn't (yet) respect CSS hints for
> dark mode nor reduced motion (though there is very little of it)._

## Adventures in Overkill: recap

I have been building my own local cluster, for the purpose of reducing cloud
hosting costs and dependence. While readers may have the luck to live in a
fast-and-cheap cloud region, both in terms of compute and in terms of latency,
we in New Zealand have the "fast XOR cheap" end of the stick. To the detriment
of a bit of reliability (as I'm not a team of sysadmins), security (as I don't
live in a fortress), bandwidth (as I don't have a 10G upstream), and redundancy
(as I'm not made of money), I have decided to build a local solution that can
fulfill my compute and hosting needs at a fraction of the cost (< $15 per month,
plus < $1000 upfront in gear).

However, building one's own local cluster is just the beginning! There is a lot
of infrastructure to add in, especially as I've opted to go for overkill,
overkill, and more overkill. I could go much simpler, but where would the fun
be in that? I could insert stuff about the education value here, but the truth
is that for me, going overkill sparks a whole lot of joy.

I might write some more posts to backfill the story til now, but:

 - (long ago: I have set up a Wireguard VPN to get inside my LAN)
 - I have acquired the idea (thanks Lauren) and the base hardware
 - I have assembled the components (disks, ram, switch, power, etc)
 - I have put together a common power supply solution
 - I have installed and configured Proxmox with Ceph
 - I have fiddled with networking and subnets
 - I have set up Postgres for my main data store
 - I have stood up FreeRADIUS with a bit of a circular thing so Postgres users auth with it, and it uses Postgres as its backend
 - I have synced an Archlinux package mirror and built my own base server images presetup to use it
 - I have done some preliminary setup around HTTPS and HTTP/3 ingress
 - I had set up BIND9 with a simple/default zone file source
 - I then replaced BIND9 with CoreDNS and PowerDNS for simpler config files and to have records in Postgres

Thus continues my issues:

## Problem statement

I want to have a private DNS zone. That is, inside my LAN, the zone exist,
outside my LAN, it doesn't. Except, wait, that's not overkill enough. Outside
my LAN, **the zone has different content**. Or rather, it's not a demarcated
subzone at all, but instead has some regular records with subnames of the zone
at my DNS provider.

I got that mostly working.

But it turns out, Archlinux servers use systemd networking by default, which I
knew about (and do rather like, or at least some parts of, actually), but more
as a background-consciousness kind of thing at that point. In particular,
systemd-resolved, which is systemd's "fuck you, not good enough" answer to
/etc/resolv.conf being _horrifically limited_.

Resolved supports DNSSEC, and defaults to "allow-downgrade" mode to account for
buggy DNS servers. The idea is that if the DNS server for a zone doesn't
support DNSSEC, it will respond with something that DNSSEC considers malformed
or unexpected, and Resolved can detect that and be like "okay, fine, we won't
use DNSSEC then." That's great!

However, the DNS servers I use for my private zone do definitely support
DNSSEC, both of them, and the (internet) DNS provider for my parent zone
(passcod.name) certainly also does support DNSSEC, and indeed that zone is
signed.

Thus, Resolved figures my private zone is a DNSSEC zone, attempts to verify
queries, and fails miserably. As a result, not only does that incur some
delays, but my Archlinux servers can't actually resolve in my private zone.

My initial reaction was to find a way to fake the expected unexpected malformed
DNSSEC response, thus making the server fall into the allow-downgrade path. I
nearly immediately discarded that as too much effort and, likely because it was
very late at night, instead went and changed the Resolved config to disable
DNSSEC.

In the morning though, this gave me pause: this is Adventures in Overkill!
Let's instead figure out how to have verified DNSSEC in a private zone without
leaking any of it to the internet.

## A quick overview of DNSSEC

Feel free to skip if you're already acquainted.

DNSSEC can seem a bit foreign at first, when the only cryptoscheme one is most
familiar with is TLS. DNSSEC is _not at all_ like TLS. It is a bit more like
package signing, though not _really_. Maybe the crypto(currency) folks would
appreciate that it features a tree of signatures?

However, it is a surprisingly _simple_ design.

I think many explanations try to explain all aspects at the same time, and
there's a bit of jargon, and not enough _why_, and also maybe my explanation
will no more make sense than these do, I'm a bit biased here.

In DNSSEC, you sign record _sets_. A record set is what a server returns to a
query. So, unless you know upfront all the queries that all clients are going
to make, and you can afford to perform all the signing upfront, you want to do
the signing "online" or "on the fly".

That is, client asks a question, server assembles the answer, signs it, gives
it back along with the signature, job done.

So, signing record sets must be fast. But at the same time, you want strong
security. Which generally implies slower crypto. So, you can compromise on
security, or you can add a layer to the scheme and instead compromise (but very
slightly) on complexity. That's what DNSSEC does.

> Just a note that when I say _fast_ or _slow_ I'm talking computers and scale.
> Signing even with strong keys takes much less than a second, so it's not
> human perceptible. But the difference between signing taking 100ms and 10ms,
> at scale, is enormous.

In DNSSEC, you have one key to sign all the records for the zone (the "zone
signing key", or ZSK, in DNSSEC parlance), and you make that key small,
cryptographically weaker, but much faster to use. And then you have another key
to sign that small key, and that "key to sign keys" or KSK is large, stronger,
and slower to use.

At that point, you can rotate the small key at some regular, frequent interval
(say, _weeks_), and rotate the large key basically never (or maybe every few
years), and you still have strong security!

You can also change the algorithm of the small key in response to new, faster,
cryptography (e.g. elliptic curves) without changing the large key.

This also plays into how trust is established.

With the scheme as I described, anyone can make keys for their zones and sign
their records. But how to know that the keys are valid?

TLS does this with authorities, which are trusted by browsers, and who you must
go through to get trust. GPG does this with web of trust, where keyholder Jenna
assures that they trust keyholder Karim (via signatures) and as you trust
keyholder Ilam, who trusts Jenna, you can then trust Karim. Blockchains do this
through by proof of work or stake, which generally say that at least 51% of the
system have done the work to verify this, so clearly it must be good.

DNSSEC has no authorities, no web of trust, and must remain lean and fast and
not eat the yearly electrical generation of a small country every day. But DNS
is based on hierarchies: a zone has a parent, which has a parent, which... etc,
until the root zone. So DNSSEC uses this same structure: the keys for your zone
have to be verified by your parent zone, and their keys by their parent, and so
on. The root zone DNSSEC is kind of like a TLS authority, except _you_ don't
need to go through them to get your keys verified, you only need to go to your
parent zone. That's something you already have to do for your nameservers.

And because you have large keys (rotated infrequently) that sign small keys
(rotated frequently), you can have make the parent verify the large keys only!

Beautiful.

##
