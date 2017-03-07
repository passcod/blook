---
tags:
  - entry
  - linux
  - kernel
  - software
title: LZ4 compression for ramdisk
---

A little while ago I saw that [lz4] became a new optional dependency to [mkinitcpio]. Today I decided to see why.

[lz4]: https://en.wikipedia.org/wiki/LZ4_%28compression_algorithm%29
[mkinitcpio]: https://wiki.archlinux.org/index.php/mkinitcpio

My mkinitcpio setup is a bit more complex than the Arch default. Instead of a single __/etc/mkinitcpio.conf__, I have the following structure:

``` tree
/etc/mkinitcpio
├── all.conf
├── default.conf
├── fallback.conf
└── nozip.conf
/etc/mkinitcpio.d
└── linux.preset
```

I have three ramdisks: __default__, which is the smallest I can get it, __nozip__, which is __default__ but with `cat` (no) compression, and __fallback__, which contains rescue and backup hooks. Notably, __default__ uses the `systemd` hook to do away with `base`, `udev`, etc.

My configs are hierarchical. I realised that the config files are actually bash, so one can use `source /etc/mkinitcpio/<file>` to source "parent" entries. This means that __all.conf__ contains everything that's not variable between configs: core `$HOOKS`, filesystems loaded explicitely in `$MODULES`, empty definitions for everything else. Then the rest builds up onto that. It's pretty neat.

Anyway, enough exposition. Originally I used __cat__ for both default and fallback, but then I realised a compressed image actually booted faster. So after quick informal testing, I went with gzip. I left the fallback image uncompressed because a) I don't care about speed when booting in fallback mode, and b) it's easier to open up and stitch back if I need to modify something manually. b) also led me to create a nozip image for default, just in case.

My `/boot/` looked like this:

``` plain
49M  initramfs-linux-fallback.img
13M  initramfs-linux-nozip.img
4.9M initramfs-linux.img
```

When I initially tried `lz4`, the size jumped up to `7.0M`. No great. I adjusted the options to get maximum compression, believing that would take too much CPU, and so I would have to compromised.

To my surprise, `lz4 -9` didn't compress as well as gzip:

``` plain
49M  initramfs-linux-fallback.img
13M  initramfs-linux-nozip.img
5.7M initramfs-linux.img
```

But it *seemed faster*. And that would be a big win: 800K vs. faster (de)compression? No contest. Instead of testing the total mkinitcpio time for each, I went with directly testing compression and decompression on the __nozip__ image.

## gzip

``` bash
$ time gzip initramfs-linux-nozip.img
gzip initramfs-linux-nozip.img  0.78s user 0.01s system 99% cpu 0.793 total

$ time gunzip initramfs-linux-nozip.img.gz
gunzip initramfs-linux-nozip.img.gz  0.12s user 0.01s system 71% cpu 0.182 total
```

## LZ4

``` bash
$ time lz4 -9 initramfs-linux-nozip.img
Compressed filename will be : initramfs-linux-nozip.img.lz4
Compressed 13149696 bytes into 5941253 bytes ==> 45.18%
lz4 -9 initramfs-linux-nozip.img  0.53s user 0.01s system 99% cpu 0.541 total

$ time lz4 initramfs-linux-nozip.img.lz4
Decoding file initramfs-linux-nozip.img
Successfully decoded 13149696 bytes
lz4 initramfs-linux-nozip.img.lz4  0.02s user 0.01s system 88% cpu 0.026 total
```

Ladies, gentlemen, and otherwise-gendered, I present thee `lz4`. At full compression, slightly faster. And for decompression, an order of magnitude faster. This is impressive.

Hear hear!

__Update__: [Yann Collet](https://twitter.com/Cyan4973) has kindly [informed me](https://twitter.com/Cyan4973/status/444791758376169472) of a «"hidden" option -A, which compresses a tiny bit more than -9... for "compress once, decompress plenty" scenarios», which fits the bill perfectly. Thanks Yann! I'll definitely use this.
