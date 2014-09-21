---
tags:
  - protip
  - linux
title: How to avoid ISO 2022 locking escape drudgery
---

Ever encountered this?

![Drudgery](https://mosh.mit.edu/terminal-shots/acs-gnome.png.2.png)

1. Install [mosh](https://mosh.mit.edu)
2. Run `$ ssh-copy-id localhost`
3. Prepend your terminal's starting command with `mosh localhost`
4. Profit!

![Moshery](https://mosh.mit.edu/terminal-shots/acs-mosh.png.2.png)

If running tmux, you're out of luck, though. You *can* modify the inner tmux
starting command, but I'm not quite sure how mosh handles multiple connections.
Also, if you prefer Tmux<1.8 behaviour when creating new panes/windows (keep
the same current directory) like I do, that will kill it.
