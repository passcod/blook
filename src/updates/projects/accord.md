# Accord

## Pitch

A Discord middleware for writing Discord bots.

The principle is to eat the Discord API and output it as structured requests to a local HTTP server.
The server can then respond, generating events in return that are translated and sent back up to
Discord. The advantage lies in using the HTTP server stack, which means notably that the Accord
target could be an nginx server, which could then direct different requests to different backends,
add caching, load-balancing, a/b and canary deployments, etc... without having to write that common
code (as it’s built in to nginx).

Furthermore, client implementations become restartable with no downtime, it's possible to write
parts of servers in different languages and stacks, and everything speaks an extremely common
protocol, which means there are _tonnes_ of tooling.

## Outcome

It works: <https://github.com/passcod/accord/>

## Future

The concept of having an intermediary gateway worked well. The advantages in regard to routing,
tooling, load-balancing, and having a common stack were borne out. However, HTTP is the wrong medium
for this. Particularly missing is bidirectionality, especially in the form of requests initiated on
the "client" / bot side, rather than always responding to events from Discord.

Further, the headers / body data dichotomy is awkward. Headers are available for proxies to route
with, but are a flat, untyped list of key-values. Information may be duplicated. It's also hard to
establish compatibility.

A future exploration space with much of the same advantages but resolving the issue of bidi and
helping with the data aspect could be to use gRPC instead of plain HTTP.
