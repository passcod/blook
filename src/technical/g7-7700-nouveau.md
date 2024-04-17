# Nouveau on Dell G7 7700

> April 2024

This is mostly for my own records.

For work I have a Dell G7 7700 laptop. This is a gaming-type laptop with 32GB
RAM (honestly disappointed it can't have 64GB or more), a decent 6-core
12-thread i7-10750H, and both Intel UHD graphics and an Nvidia RTX 2070 mobile
graphics card.

Originally I used the proprietary Nvidia drivers. However, I ran into a variety
of issues and decided to try the Nouveau drivers since they seem to have [much
better support](https://nouveau.freedesktop.org/FeatureMatrix.html) for
[Turing+](https://nouveau.freedesktop.org/CodeNames.html#NV160) cards recently.

Here's what worked:

- Remove all `nvidia-*` packages
- Remove bumblebee/supergfxctl
- Install `mesa`, `lib32-mesa`: <https://wiki.archlinux.org/title/Nouveau>
- Remove `xf86-video-nouveau` to use the native modesetting instead of Xorg DDX
- Enable Early KMS in mkinitcpio:
  <https://wiki.archlinux.org/title/Kernel_mode_setting#Early_KMS_start>
- Enable [power management](https://nouveau.freedesktop.org/PowerManagement.html)
  with `nouveau.config=NvGspRm=1` in the `/etc/kernel/cmdline`
- Linux kernel >=6.7 for the GSP firmware support

I now have a stable Wayland multi-monitor setup that boots well and resumes from suspend without issue.
