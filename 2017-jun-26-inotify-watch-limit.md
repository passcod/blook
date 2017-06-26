---
date: 2017-06-26T11:57:05+12:00
title: INotify watch limit
tags:
  - documentation
  - notify
  - linux
---

On Linux, INotify might sometimes hit its internal watch limit. In applications
like [dropbox], [guard], [tail], my own [notify], and tools depending on it:
[watchexec], [cargo watch], [alacritty]… this error may manifest like this:

 - Unable to monitor filesystem Please run:
   `echo 100000 | sudo tee /proc/sys/fs/inotify/max_user_watches`
   and restart Dropbox to correct the problem.

 - No space left on device - Failed to watch "…": The user limit on the total
   number of inotify watches was reached or the kernel failed to allocate a
   needed resource. (Errno::ENOSPC)

 - unable to create watcher:
   `Io(Error { repr: Os { code: 28, message: "No space left on device" } })`

 - tail: cannot watch '/path/to/dir': No space left on device

 - Failed to watch /path/to/dir; upper limit on inotify watches reached!

## What the manual says

As per [inotify(7)]:

> The following interfaces can be used to limit the amount of kernel memory
> consumed by inotify:
>
>     /proc/sys/fs/inotify/max_queued_events
>
> The value in this file is used when an application calls `inotify_init(2)` to
> set an upper limit on the number of events that can be queued to the
> corresponding inotify instance. Events in excess of this limit are dropped,
> but an `IN_Q_OVERFLOW` event is always generated.
>
>     /proc/sys/fs/inotify/max_user_instances
>
> This specifies an upper limit on the number of inotify instances that can be
> created per real user ID.
>
>     /proc/sys/fs/inotify/max_user_watches
>
> This specifies an upper limit on the number of watches that can be created
> per real user ID.

## Why this occurs

INotify watches have to be specified for each directory; there is no way to
specify that a directory _and all its subdirectories_ should be monitored using
a single call or watch. Thus, libraries and applications implement their own
recursive descent into directories and simply add watches to each folder they
find. Some do that more efficiently than others.

Another issue is that the limit for those watches is specified _per user_, not
_per application_, so the "pool" of available watches may be consumed by
different applications at the same time, leading to an application that may
consume a completely reasonable amount of watches failing because the _rest_ of
the pool was exhausted by something else running as the same user.

The default limit on most Linux distributions is **8192**.

This is regularly blown up by watching dependency folders, like `node_modules`
or `vendor`, or more extreme, by watching your entire `$HOME` folder.

## Fix considerations

For most users, the default limit is much too low. **65536** is a good start on
a more reasonable limit. Increasing to further than that is governed by more
low-level details and your own concerns:

An INotify watch costs 540 bytes of kernel memory on 32-bit architectures, and
1080 bytes on 64-bit architectures. Kernel memory is _unswappable_. In addition
to that, the library or application will use more memory to store the handle and
other information (this time in _swappable_ memory). [Notify][notify] uses about
10 bytes plus the full path of the watched entry.

There are recorded instances of people using _millions_ of watches. It just
means they are okay with potentially spending gigabytes of kernel and userspace
memory on that.

## Adjusting the limit

You can either write directly to /proc or use `sysctl` (recommended):

 - `echo 65536 | sudo tee /proc/sys/fs/inotify/max_user_watches`

 - `sudo sysctl fs.inotify.max_user_watches=65536`

To do it permanently, you should put `fs.inotify.max_user_watches=65536` in the
sysctl configuration, which is either a new file (descriptively named) in
`/etc/sysctl.d/` (recommended) or a line in `/etc/sysctl.conf`.

[alacritty]: https://github.com/jwilm/alacritty
[cargo watch]: https://github.com/passcod/cargo-watch
[dropbox]: https://www.dropbox.com/
[guard]: https://github.com/guard/guard
[inotify(7)]: https://linux.die.net/man/7/inotify
[notify]: https://github.com/passcod/notify
[tail]: https://linux.die.net/man/1/tail
[watchexec]: https://github.com/mattgreen/watchexec
