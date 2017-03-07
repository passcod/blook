---
title: "Passbot: A Gitter Logging Bot"
frontpage: false
tags:
  - post
  - gitter
  - github
  - bot
---

Disappointed by [Gitter]'s lack of downloadable, deep-searchable, archive
of logs, I put my trusty ZNC bouncer up to the task of maintaining a
permanent connection to [Gitter's IRC bridge]. The bouncer can then be told
to join any public channel, and will log everything to disk. Further (and
shared) archival can easily be set up that would store any chat's logs in
S3 buckets, Dropbox accounts, Google Drive, remote FTP or SSH hosts, etc.

If you want your public Gitter chatroom to be logged using this "bot",
send me an email at passbot@passcod.name.

[Gitter]: https://gitter.im
[Gitter's IRC bridge]: https://irc.gitter.im
