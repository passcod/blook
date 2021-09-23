# March 2018

## Constellationd

I've been writing a prototype/MVP for a server agent that uses an on-demand
cluster-wide consensus algorithm rather than a Raft-like always-on consensus of
only a few master nodes plus a bunch of clients.

I have set myself fairly strict resource limits so that it can be set up easily
from one to many hundred machines, and use the least amount of memory it
comfortably can so it can be deployed to 512MB VMs (or even those tiny 256MB ARM
servers that some hosts in Europe offer) without eating half the machine's RAM.

The goal is to be able to monitor and manage any number of machines, or even to
use it locally for development, testing, or tooling purposes.

Beyond the software itself, the project is a way to get a lot more comfortable
with Tokio.rs as well as learn more about networking, distributed setups, and
protocol design + parsing.

The repo is here: https://github.com/passcod/constellationd

And I've been tweeting about development here: https://twitter.com/passcod/status/970813314354720768
