---
date: 2018-07-08T13:53:27+12:00
title: Donating to dependencies (part 1)
tags:
   - post
   - donation
   - open-source
---

I had [a little rant on Twitter](https://twitter.com/passcod/status/1015555672757321728)
about the state of making OSS more sustainable, which boils down to heavy
skepticism towards the current initiatives that I feel make things somewhat
better for large projects but do very little for smaller projects.

Why care about smaller projects?

 - My intuition is that smaller projects are the majority. Therefore focusing
   on larger ones feels super ironic — a kind of 1%-ing.

 - Trickle-down economics don't work. The current and upcoming approaches
   leave a bad taste of trying for exactly the same thing, but wrapped in a
   veneer of goodwill. I trawled through the declared expenses of some projects
   on OpenCollective, and unless I missed something obvious, I don't really see
   those projects giving back. On one project, a particular recipient of many
   thousand dollars had given a paltry $25 to two other projects (total, not
   even monthly or anything). The other maintainers had given zero.

I think there is a real need to fund the ecosystem in general. At my personal
scale, it's not going to do much. But I can make this an experiment. This
morning I thought of one way to do things. One way to at least _try_. I tweeted
[about that](https://twitter.com/passcod/status/1015762848344039425) and then
went to write this here article.

The idea for this post was to walk through everything semi-manually, figuring
things out as I go. In the end, it took me an entire Sunday to do this first
part, which is not terrible for something I thought and made up from scratch.

Second part will be to find out maintainers and figure out how exactly to split
things. Third part will be allocating a sum of money (depending on how things
are split, I'm thinking $2000 to start with) and automating its distribution.

## Initial decisions

 - I would start off investigating only top-level dependencies. I guesstimated
   that would already give me a large enough number that I would have to
   filter, but if I was wrong then I would look further.

 - I figured that many projects would be single-maintainer ones. For those, I
   could simply donate to that one person. For other projects, I would need to
   determine some sort of split. Projects backed _directly_ by a commercial
   outfit would not be considered at all (for example: docker, official clients
   and libraries, mysql-workbench, npm itself, etc).

 - I decided to wait and see how things looked like and what was prevalent
   before making choices, but an early thought was that if there was one core
   maintainer and then one or more off ones, I would allocate 50% of the
   project's share to core, then the rest shared equally. For projects with a
   backing org, I would donate to the org. For projects with a core _team_, I
   would split equally between members of that team.

 - At a higher level, I would figure out all deps I use, then rank them by
   frequency. One first difficulty was that where frequency kinda works for
   code, as with npm, Composer, Rubygems, Cargo... it doesn't quite work for
   tools, as with Vim plugins, Tmux plugins, Atom plugins, and of course Pacman
   and AUR and Apt packages. So that would have to be seen to. But I decided to
   collect the data first, and then figure this out later.

 - I also decided to treat work and home projects equally, but I would not
   consider work projects on which I hadn't worked or used at all.

 - The question of which time period was considered, but this solved itself
   neatly when I found that last week marked one year at my current employer.
   So I would consider all projects I worked on from July 2017 to June 2018.

## Determining dependencies

### Ruby

I grabbed each list with:

```bash
$ cat Gemfile | grep \^gem | cut -d\" -f2
```

which was super simplistic, but it worked for what I had.

I also figured I used `pry` a lot as a kind of terminal calculator, because I
like it better than node or python for this task. And other installed CLI utils.

So at the end I had:

```
Freq 3+: pry sequel
Freq 2: ghi nokogiri t
Freq 1: gist memoist mysql2 parallel ruby-progressbar travis typhoeus
```

### PHP

That promised to be a _little_ more massive. I grabbed each list with:

```bash
$ jq '((.require | keys) + (."require-dev" | keys))[]' composer.json -r
```

Then I opened a pry shell in the folder I'd put the lists, and ran this to
format into SQL:

```ruby
File.write('../php.sql', Dir['*'].map do |f|
   File.
      readlines(f).
      map{|l|l.strip}.
      reject{|l|l.empty?}.
      map{|l|"INSERT INTO php (project, name) VALUES ('#{f}', '#{l}');"}
end.flatten.join("\n"))
```

(Dots-at-the-end is a weird style but necessary for writing and copy-pasting
multiline things easily in pry.)

Then I opened sqlite3 and got to work:

```sql
CREATE TABLE php (project varchar(255) not null, name varchar(255) not null);
.read php.sql

WITH by_freq AS (
   SELECT count(*) as count, name
   FROM php
   GROUP BY name
   ORDER BY count DESC
)
SELECT group_concat(name, ' ')
FROM by_freq
WHERE count = 1 -- or 2, or >= 3
GROUP BY true;
```

Results:

```
Freq 3+: rollbar/rollbar khandieyeah/timegap php guzzlehttp/guzzle

Freq 2: desarolla2/cache google/cloud mustache/mustache openlss/lib-array2xml
   pear2/net_routeros php-units-of-measure/php-units-of-measure
   phpseclib/phpseclib phpunit/phpunit proj4php/proj4php

Freq 1: algolia/algoliasearch-client-php azuyalabs/yasumi barryvdh/laravel-cors
   bradfeehan/desk-php chillerlan/php-qrcode codeguy/upload
   davedevelopment/stiphle desarrolla2/file doctrine/instantiator
   dropbox/dropbox-sdk ext-gmp ext-iconv ext-intl ext-mbstring fideloper/proxy
   filp/whoops folklore/graphql fzaninotto/faker geerlingguy/ping
   hashids/hashids intervention/image itsdamien/laravel-heroku-config-parser
   ivanpepelko/php-wkhtmltopdf jenssegers/optimus jimmiw/php-time-ago
   khandieyea/xeroci laravel/framework laravel/tinker marcelog/pami
   mockery/mockery monolog/monolog passcod/mandrill pear2/cache_shm
   predis/predis psr/log psy/psysh sabre/xml spatie/array-to-xml
   squizlabs/php_codesniffer symfony/debug tiesa/ldap touki/ftp twig/twig
   vmwarephp/vmwarephp wixel/gump zendre4/wkhtmltopdf-amd64
```

Immediately something presented itself. Some of these deps were written by me,
some by work colleagues, some by companies we already pay for services. The
`php` entry belongs somewhere else. So I manually filtered those. I also
manually upgraded `psy/psysh` as I use it a lot on the CLI.

```
Freq 3+: composer guzzlehttp/guzzle psy/psych

Freq 2: desarolla2/cache mustache/mustache openlss/lib-array2xml
   php-units-of-measure/php-units-of-measure phpseclib/phpseclib
   phpunit/phpunit proj4php/proj4php

Freq 1: azuyalabs/yasumi barryvdh/laravel-cors bradfeehan/desk-php
   chillerlan/php-qrcode codeguy/upload davedevelopment/stiphle
   desarrolla2/file doctrine/instantiator ext-gmp ext-iconv ext-intl
   ext-mbstring fideloper/proxy filp/whoops folklore/graphql fzaninotto/faker
   geerlingguy/ping hashids/hashids intervention/image
   itsdamien/laravel-heroku-config-parser ivanpepelko/php-wkhtmltopdf
   jenssegers/optimus jimmiw/php-time-ago laravel/framework laravel/tinker
   marcelog/pami mockery/mockery monolog/monolog pear2/cache_shm predis/predis
   psr/log sabre/xml spatie/array-to-xml squizlabs/php_codesniffer
   symfony/debug tiesa/ldap touki/ftp twig/twig wixel/gump
   zendre4/wkhtmltopdf-amd64
```

### JS

The big one.

Grab:

```bash
$ jq '((.dependencies | keys) + (.devDependencies | keys))[]' package.json -r
```

Transform and parse was the same as in PHP. Results, after filtering:

```
Freq 3+: bootstrap cssnano grunt grunt-contrib-clean grunt-contrib-copy
   grunt-postcss n nodemon postcss-cssnext standard tap

Freq 2: express forever grunt-cli grunt-contrib-uglify-es jquery koa moment
   postcss-font-magician postcss-partial-import sass supertest vue

Freq 1: abraxas autoprefixer axios babel-plugin-inferno babel-preset-babili
   babel-preset-env babelify browserify byline bytes chalk classnames
   compression concat-stream cross-env d3 del dotenv dotenv-cli ejs
   encoding-down envify eslint eslint-config-standard eslint-plugin-import
   eslint-plugin-inferno eslint-plugin-node eslint-plugin-promise
   eslint-plugin-standard estraverse exorcist express-cache-controller
   express-enforces-ssl fibers find-root format-number gearman
   grunt-contrib-concat grunt-contrib-requirejs grunt-contrib-watch
   grunt-notify grunt-sass grunt-sharp handlebars helmet history inferno
   inferno-component inferno-devtools inferno-mobx inferno-router
   inferno-server inferno-vnode-flags is-cidr is-domain-name is-ip
   isomorphic-fetch joi jquery-sparkline js-yaml koa-compress
   koa-conditional-get koa-etag koa-helmet koa-logger koa-mount koa-static
   kompression laravel-mix leveldown levelup lodash memdown metrics-graphics
   mobx morgan ms nanoid neon-cli node-env-file normalize.css npm-run-all
   number-to-words package-json-versionify pg ping plur popper.js postcss
   postcss-browser-reporter postcss-cli postcss-urlrewrite progress
   promisify-es6 require-css require-uncached requirejs rimraf rivets rss
   sanitize-html sightglass signale simple-git sinon socket-activation
   socket.io spdx-expression-parse spin.js stream-mock string-hash toml util
   vue-template-compiler whatwg-url yargs
```

### Rust

There is probably a more efficient way, but I didn't want to bother too much:

```bash
$ toml2json Cargo.toml | jq '. | to_entries | map(select(.key | match("dependencies"))) | map(.value) | .[] | to_entries | map(select(.value | if type=="object" then (has("path") | not) else true end)) | .[].key' -r
```

Yes, this is a monster. Also, it doesn't get subcrate dependencies (for
workspaces) so it has to be run multiple times for some projects.

```
Freq 3+: cargo-clippy cargo-edit futures lazy_static rtss tempdir watchexec

Freq 2: chrono clap env_logger log regex serde serde_derive serde_json
   tokio walkdir yaml-rust

Freq 1: base64 bat bytes colored crowbook-text-processing exa hyper inotify
   interfaces iron iron-json-response iso8601 itertools kqueue libc logger mio
   mount multiqueue neon neon-build neon-runtime net2 nix nom num num-traits
   pest pest_derive pulldown-cmark rust_sodium serde_bytes serde_cbor sled time
   tokio-io tokio-timer
```

### Vim

Methodology here is a bit different. I went for a subjective approach,
assigning plugins into the three buckets manually according to what I thought
was relative frequency of use.

```
High: junegunn/vim-plug tpope/vim-sensible editorconfig/editorconfig-vim
   mbbill/undotree airblade/vim-gitgutter

Medium: ervandew/supertab itchyny/lightline.vim jayflo/vim-skip
   ntpeters/vim-better-whitespace tpope/vim-obsession
   dhruvasagar/vim-prosession elzr/vim-json

Low: digitaltoad/vim-jade hail2u/vim-css3-syntax moll/vim-node
   mustache/vim-mustache-handlebars othree/html5.vim othree/yajs.vim
   rust-lang/rust.vim tpope/vim-projectionist vim-ruby/vim-ruby
```

### Tmux

I actually use very few plugins so I just list them at the same level.

```
tpm sensible resurrect continuum yank
```

### Atom

Same as Vim:

```
High: editorconfig emmet file-icons linter linter-php minimap minimap-git-diff
   tree-view-git-status

Medium: atom-jinja2 highlight-selected language-ansible language-postcss
   language-rust language-vue minimap-cursorline minimap-highlight-selected
   minimap-selection multi-wrap-guide

Low: linter-phpcs minimap-bookmarks undo-tree
```

### System

This was probably the hardest category to figure out, especially to figure what
was top-level or not.

```
High: archlinux arc-gtk-theme atom firefox fish gnome gpaste jq linux neovim
   nginx nmap node php ripgrep ruby rust systemd terminator tmux

Medium: btrfs ccache dwarffortress gearman gimp gocryptfs iosevka iputils
   postgis postgresql tree yay

Low: alacritty ansible aria2 bundler ffmpeg graphviz handbrake htop inkscape iw
   lz4 pbzip2 mahjong nethogs redis vlc wine
```
