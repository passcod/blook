# Reasonable

> March to June 2019

## Pitch

An everything-encrypted database and service of reasons for actions on twitter.

This is both about this frustration with not having reasons for following, or blocking, or not
following, or muting, etc... accounts on Twitter, and a challenge to design and write a service with
the most amount of encryption while still being able to offer something that works.

Really, the philosophy is that I don’t want to be able, as an admin operator, to read any of the
reasons, or see any of the people affected by the reasons, or even, if possible, access the social
media usernames of the people using the service, at least not without some willful modifications to
the service, or a trace on the process, something like that.

Someone obtaining an entire copy of the database should not be able to determine anything beyond the
number of users, and the number of reasons. Someone otaining that plus either the source or the
binary of the service should also have that same amount of access. That means layering and chaining,
and careful design thought, especially as putting all user data in one encrypted blob is not going
to work efficiently with potentially tens or hundred of thousands of reasons per.

Making data queryable without looking inside is an interesting challenge.

## Media

- <https://twitter.com/passcod/status/1103222271181635589>
- <https://twitter.com/passcod/status/1103960778133037056>
- <https://twitter.com/passcod/status/1104185957513744384>
- <https://twitter.com/passcod/status/1104256323611291648>
- <https://github.com/passcod/reasonable.kiwi>

## Outcome

In the end, I decided that instead of a public service, I would add tools to omelette. The
cryptographic challenge is interesting, but the best way to keep data private is to not actually put
it on someone else’s cloud, really.

(Then I lost interest in Omelette, but that's another story.)
