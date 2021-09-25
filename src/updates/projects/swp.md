# Swp

> May to June 2019

## Pitch

A utility to swap two files atomically, or as close as.

On Linux 3.15+, the `renameat2` call. On macOS, the `exchangedata` call. On Windows that supports
Transactional NTFS, that. On WSL2 (potentially), the `renameat2` call. On other platforms, a
fallback method or two.

## Outcome

<https://github.com/passcod/swp>

I decided there’s other tools and projects that do that and I’m not going to spend more time on it.
