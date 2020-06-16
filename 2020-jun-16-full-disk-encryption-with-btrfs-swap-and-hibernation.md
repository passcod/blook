---
# vim: tw=100
date: 2020-06-16T21:30:39+12:00
title: Full-disk encryption with Btrfs, swap, and hibernation
---

I set up a laptop this month and it had been several years since the last time! In the meantime, I
have set up many servers, tho, and I have switched my practice from an ext4 system partition and
btrfs home partition to putting the full disk as btrfs, often eschewing a partition scheme.

On servers, doing so makes it extremely easy to increase disk space without incurring downtime: all
that's needed is to add a disk, join it to the btrfs pool, and optionally run a balance. All online,
no fuss.

So, for this laptop, I figured I would go for a full-disk btrfs. However, it's a laptop. I also need
encryption. And I want hibernation. The Arch pages are very complete, but full of many many warnings
with a lot of the information strewn about over five different places. So here I'm documenting this.

## Some terminology, just in case

 - **Arch** is Linux, Hard Mode, Easy Submode. Like, there's a lot of things that are a lot tougher
   than Arch, and Arch's documentation is good enough that _other linux distributions point to it_.
   A friend remarks frequently that this actually means that _everyone else's docs are unfathomably
   awful_ and it's pretty true that Arch's are just "good enough" and not, like, _actually good_.
   Anyway, the base comparison is that when you install Windows or Ubuntu, you have a GUI that asks
   a few questions and an hour later you're running, and when you install Arch you're given a
   command prompt, and abandoned in the wilderness and the darkness with only your fingers, your
   wit, and if you're lucky, an internet connection. Good luck, and may the gods have mercy.
   However, if you do manage to get going, you're rewarded with the ultimate advantage: a rolling
   release Linux distribution with the very latest software all the time. In Ubuntu, upgrades are
   every 6 to 24 months, and good luck getting new versions... in Arch they're whenever the fuck
   you want, and new versions typically appear within _hours_ of the vendor/developer putting them
   out. There's no lengthy full upgrade process that may break your computer, no waiting for your
   a blank screen and spinner and a "please do not shut down" message, no gibberish, and little
   mess. You do upgrades while you're running, then you reboot normally _once_, if you want, when
   you want, with no nagging, and oftentimes rebooting isn't even necessary. Ubuntu and Windows
   people upgrade, and things have moved, changed dramatically, because it's been a year and the
   world has moved on from rounded corners. Arch people upgrade and they notice a new thing, say
   "neat!" and move on, because it's been a month and things haven't really changed much at all.
 - **EFI** is the current standard for booting. Basically you've got a partition marked with a
   specific flag that makes it "the EFI partition" and that contains EFI-format executables, which
   your computer's firmware (often called "BIOS") knows how to execute without the help of a full
   OS, so it can pick the executable to run, and there's also security stuff like it can check the
   integrity and validity of the executable file. It's a lot better than MBR, but mostly because MBR
   is very very shit.
 - **MBR** is the old standard for booting. Instead of a partition, your computer's firmware looks
   in the first few megabytes of your disk, loads that in memory, and executes a certain offset in
   there. So firstly there's only a few megabytes of space. That's awful. And also you can't have
   multiple boot programs, you can only have one, so boot programs had to be very clever and learn
   how to boot all kinds of systems, like Linux, Windows, Macs, BSDs, whatever, instead of being
   able to rely on that system's own boot program like in EFI.
 - **GRUB** is one such boot program, the GRAnd Unified Bootloader, or GNU's Really Unfortunate
   Bootloader, or some other variation because it turns out developers are really bad at naming
   things. So GRUB started out yonks ago and therefore was built for MBR. And also for like a dozen
   other things. And it supports booting pretty much everything under the sun. GRUB1 wasn't so bad,
   but clearly couldn't, like, boot up a Betelgeusean vibrocomputer whilst on a rocket from Mars to
   Venus, so it had to go and be replaced with something that could just... do everything. GRUB2 is
   a nightmare to configure, which is why it's usually configured from an extremely simplistic
   configuration file and a ✨magic✨ process that ✨automagically✨ figures out what you've got on
   your disks and adds entries for those, and spews out a giant 1000-lines-minimum configuration
   that you then put on your disk and hope is correct and never actually look at. GRUB is old and
   venerable and hasn't quite figured out elevators yet, but it can teach Swahili to a mouse, so
   when we actually need it, we're glad that some people are still actually working on it.
 - **GPT** is the modern partition layout scheme, which means everyone still defaults to MSDOS. The
   MSDOS partition scheme supports only up to 4 (four) (**FOUR!?**) partitions, doesn't believe in
   the existence of disks larger than 2TB, among various other issues that I'm sure weren't a
   problem in the 18th century, when it was designed. GPT supports _at least_ 128 partitions, and we
   don't have a real unit to describe how large disks it can address.
 - **LUKS** is a full-disk encryption scheme. It's a format and a spec and a protocol, and most
   importantly it's a set of ciphersuites. LUKS2 has various advantages but mostly it supports
   actual secure password hashes, instead of SHA1. Too bad, though, we can't use it with GRUB (yet).
 - **Btrfs** is a newish (read: only about 10 years old) filesystem that liberally _inspired_ itself
   from other good filesystems except that Btrfs can be included in the linux kernel (helps for
   adoption) and isn't written by a murderer (also helps). It _is_ written by Linux people, so you
   kinda have to expect some level of douchery, but in comparison it's pretty okay. Anyway, it
   figured out how to be a filesystem that was pleasant to use, had great features, lots of
   potential, good performance, friendly with SSDs, with a bunch of operations that can be done
   online (read: when in use) rather than offline (read: never, because who ever wants to shut down
   computers for more than 30 seconds). Btrfs does away with the _concept_ of needing partitions,
   because partitions are fixed size and hard to resize, but what if instead you had like, spaces to
   put your files in that got a content size quota, that quota is adjustable by the admin at any
   time, and you can take snapshots of any space at any time without disruption. And what if when
   you have two disks instead of having to set up RAID in hardware or just expose it as a separate
   disk and manage file distribution yourself you just _added the disk to the filesystem_ and now
   you have more space. And what if you're making a bunch of copies of the same file for some reason
   and instead of occupying N times the file contents on disk, it just intelligently made copies
   point to the original, but if you write to any copy your changes will stay on that copy and not
   overwrite the changes you've made on other copies. And what if it supported compression,
   transparently, and decided when to compress a file based on if it's going to help at all or not,
   and it was so good at it that you can have "terabytes" of files on a 500GB hard disk (I have done
   this, it's pretty fucking magical). In case you couldn't tell: I like btrfs.

## MBR version

MBR, ugh.

Unfortunately, for Reasons™ I originally couldn't access the firmware to switch the EFI support on.
So I did my first install (the one I'm typing this on!) with MBR. Later I'll go and reinstall with
EFI, and update this with a second version.

So, first, considerations specific to MBR:

 - Need to use GRUB.
 - GRUB only supports LUKS v1. (Patches for v2 just merged recently but are not yet released as of
   writing.)
 - Don't need an EFI partition, obviously, but for LUKS reasons we need a partition scheme.
 - GPT is maybe possible with a `bios_grub` partition but best to stick with the classic MSDOS-type
   scheme anyway unless you've got a >2TB disk.

Alright, so, we're in the live Arch environment from a USB drive, and our target disk is sitting
there. I like using `parted` instead of `fdisk` because I find it more intuitive. Doesn't matter, I
won't show the commands anyway, you do you. We want:

 - MSDOS label / partition scheme
 - One partition that takes the full space
 - `boot` flag on that partition

Once you've got that, gotta initialise the LUKS. That's three steps:

1. Create the LUKS format in the partition:
   ```
   cryptsetup --type luks1 --iter-time 250 luksFormat /dev/sda1
   ```
   That will prompt for a passphrase.

2. Open the LUKS device:
   ```
   cryptsetup open /dev/sda1 devicename
   ```
   That will prompt for the disk's passphrase you just set. You can pick whatever you want as
   `devicename`. I used `lucky`.

3. Format the LUKS device as Btrfs.
   ```
   mkfs.btrfs /dev/mapper/devicename
   ```

That's encryption done.

Now you make up your preferred volume schema in the btrfs root, setup the mountpoints in the root
subvolume, mount things up manually... I use something like this:

```
/           <-- btrfs root, mounted at /.rootvol
@root       <-- system subvol, mounted at /
@home       <-- home subvol, mounted at /home
@snapshots  <-- snapshots subvol, mounted at /.snapshots
@swap       <-- swap subvol, mounted at /.swapvol
```

And I use these mount options:

 - `space_cache` - trades off some additional disk space for greater performance
 - `autodefrag` - defrags heavily fragmented files online, as an automatic process
 - `discard=async` - sends TRIM commands to the SSD asynchronously when needed
 - `compress=zstd` - transparent compression enabled globally

And then it's time to install Arch, standard process, follow your heart (or the guidelines).

Once that's done, there's a few things left:

 - Make things bootable by configuring the initramfs
 - Use a keyfile to let the initramfs unlock without re-entering the password after the bootloader
 - Set up a swapfile
 - Configure the swapfile for resume (hibernation)

### Initramfs

This can be a bit tricky. There's several ways to do it, too, but the one I prefer uses a special
crypttab. The `/etc/crypttab` is like the `/etc/fstab` except instead of mounting filesystems it
opens encrypted disks. And if you use the `sd-encrypt` mkinitcpio hook, then the
`/etc/crypttab.initramfs` file is copied to `/etc/crypttab` _in the initramfs_. So you can use that
file to configure how to open your disk, instead of putting things in the kernel commandline.

```
# <name>	<device>					                        <password>			   <options>
lucky		UUID="9342d218-eec0-4f13-96a1-341b4a168bec"	thepassword
```

Putting the password there in plain text is pretty meh, though. Dunno about you, but even if it's
encrypted and permission-restricted, it's still a password in plain, in a very predictable location.

So instead, we write a small file full of random data, and then get LUKS to use that random data as
a valid key for the system. Now we can open the disk with either a strong passphrase or a specific
blob of garbage data, and we're not storing the passphrase anywhere.

To do that:

```
# dd bs=512 count=4 if=/dev/random of=/.rootvol/.keyfile iflag=fullblock
# chmod 600 /.rootvol/.keyfile
# chmod 600 /boot/initramfs-linux*
# cryptsetup luksAddKey /dev/sda1 /.rootvol/.keyfile
```

Unlike what the wiki says, the name of the keyfile isn't significant. Just make sure you use the
same _path_ everywhere.

Add it to the `/etc/mkinitcpio.conf`:

```
FILES=(/.rootvol/.keyfile)
```

And change the `/etc/crypttab.initramfs`:

```
# <name>	<device>					                        <password>			   <options>
lucky		UUID="9342d218-eec0-4f13-96a1-341b4a168bec"	/.rootvol/.keyfile
```

For reference, this is what I use in the mkinitcpio config (I want to switch to dracut eventually
but haven't gotten there yet):

```
BINARIES=(nano btrfs rg)
FILES=(/.rootvol/.keyfile)
HOOKS=(base systemd sd-encrypt autodetect modconf block filesystems keyboard sd-vconsole fsck)
COMPRESSION="xz"
COMPRESSION_OPTIONS=(-9)
```

### Swapfile

Swap partitions just work, but swapfiles are a lot more flexible. Up until now I'd been put off by
how they also seemed a lot harder to put in place.

I decided to put my swapfile(s) in a subvolume of their own, so they'd be out of the way.
Additionally, that way if I set up an automated snapshotting solution, I can tell it to ignore the
swap volume outright.

Furthermore, swapfile support for btrfs landed in kernel 5.0. Before that, they're corrupted.

The usual way to make a swapfile on ext4 is to fallocate a file and mkswap it. With btrfs, you want
instead to make a zero-length file, set some attributes on it (disable compression and CoW), and
only then grow it to the desired size (which should be about 60% the size of RAM for hibernation, or
just the size of RAM if you want to be safe and disk space isn't an issue... and given this is a
swap*file* you'll be able to resize it easily if you need to):

```
# cd /.swapvol
# truncate -s 0 main
# chattr +C main
# btrfs property set main compression none
# fallocate -l 16G main
# chmod 600 main
# mkswap main
# swapon main
```

Then you add it to your `/etc/fstab`, and remember to adjust swappinness (10 is fine).

### Hibernation

Hibernation in linux writes to the swap. Resuming is done from the initramfs. So it goes like:

1. System boots
2. GRUB asks for your passphrase, opens your disk
3. GRUB reads its own config, shows the boot menu
4. GRUB boots the linux kernel and passes it the initramfs, then hands off
5. The kernel uncompresses the initramfs, and boots that
6. The initramfs loads a restricted linux environment...
7. ...decrypts the disk again from the keyfile...
8. ...and then either:
   - mounts volumes, proceeds with boot, or
   - notices there's a hibernate session in swap, loads that.

As you can see, resuming happens _before_ the volumes are mounted. So you can't refer to the
swapfile by its path. Instead, you have to compute the swapfile's offset from the device start, and
give that offset to the kernel.

To compute the offset, download the [`btrfs_map_physical`](https://github.com/osandov/osandov-linux/blob/master/scripts/btrfs_map_physical.c) script, then:

```
$ gcc -O2 -o btrfs_map_physical btrfs_map_physical.c
$ sudo ./btrfs_map_physical /.swapvol/main | head -n2

FILE OFFSET     FILE SIZE       EXTENT OFFSET   EXTENT TYPE     LOGICAL SIZE    LOGICAL OFFSET
PHYSICAL SIZE   DEVID   PHYSICAL OFFSET
0       4096    0       regular 268435456       6762668032      268435456       1       6762668032
```

Take note of the last number displayed (here 6762668032), under the `PHYSICAL_OFFSET` column. Find
out your PAGESIZE with `$ getconf PAGESIZE` (here 4096), then divide the first with the second with
your favourite calculator:

```
$ dc -e '6762668032 4096 /p'
1651042
```

That's your offset.

There's also the `filefrag` tool, but it's reportedly less reliable on btrfs. It gave me the same
result, but better safe than sorry.

Add these to the GRUB config in `/etc/default/grub`:

```
GRUB_CMDLINE_LINUX_DEFAULT="resume=/dev/mapper/lucky resume_offset=1651042"
```

Rebuild the initramfs (`sudo mkinitcpio -P`), remake the grub config
(`sudo grub-mkconfig -o /boot/grub/grub.cfg`), reboot, and you're ready!

Try to hibernate, it should... just work.
