# Trebuchet

> March to October 2019

## Pitch

A deploy tool / experiment using Btrfs volume archives.

The actual deploy tool is a client/server/agent suite with some neat features but aiming to be
extremely light on resources, at least compared to many other tools I’ve tried.

But the core underpinning, the main idea, comes from playing around with btrfs volumes/snapshots and
the export/import commands on the tool. Essentially you can ask for an export of a volume, and you
can ask for an export of a volume *based on another volume*, then on import, which can be on a
completely different filesystem/disk/machine, as long as you have that same base volume, you can
restore.

So you can have filesystem-level diff archives on demand, with no awareness from the application
being built/deployed, and everything is already in standard linux tools.

It "just" needs some wrapping and managing.

## Media

- <https://twitter.com/passcod/status/1110037271439261696>
- <https://twitter.com/passcod/status/1110890661413187584>

## Outcome

<https://github.com/passcod/trebuchet>

The btrfs stuff added too many constraints; abandoned.
