# Known Unknowns: a configuration language

> 8 August 2020

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
[programming typesystem applied to configuration][Dhall], which requires that all types and holes
are resolved ahead of time.

Another project on the pile...

[Dhall]: ../technical/dhall-review.md
