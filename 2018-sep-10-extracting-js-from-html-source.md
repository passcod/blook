---
date: 2018-09-10T17:13:47+12:00
title: Extracting JS from HTML source
tags:
   - snippet
   - html
   - js
   - ruby
---

I decided last month I would make an effort to post more technical articles,
single-thing blurbs to show neat things I've done, or just tiny scripts,
workspace improvements, that kind of thing.

Today's is a small ruby script I coded in a few minutes to extract all the JS
from a source tree of mixed files (like a PHP codebase). It outputs into a
folder; the idea is then to use ripgrep to look through it. In our case, we
wanted to find some ES2017 features we shouldn't have used (as they're not
supported in our browser range).

```ruby
require 'nokogiri'

ARGV.each do |file|
  begin
    puts "Processing #{file}..."

    if file =~ /\.js$/
      jspath = "alljs/#{file}"
      `mkdir -p #{jspath}; rmdir #{jspath}`
      File.write(jspath, File.read(file))
      next
    end

    index = 0
    doc = File.open(file) { |f| Nokogiri::HTML(f) }
    doc.css('script').each do |scr|
      next unless !scr['type'] || scr['type'].empty? || scr['type'] =~ /javascript/
      jspath = "alljs/#{file}.#{index}.js"
      `mkdir -p #{jspath}; rmdir #{jspath}`
      File.write(jspath, scr.content)
      index += 1
    end
  end
end
```

Usage is like this:

```bash
tree -if application client | rg '.(tpl|html|php|js)$' | xargs ruby extract-js.rb
```

Some details and notes:

 - `tree -f` prints the full relative path.
 - `tree -i` doesn't print the ascii art tree.
 - Passing folders to `tree` only looks into those folders but bases the paths
   on the current dir.
 - `mkdir -p #{path}; rmdir #{path}` is an awful hack but it works! It builds
   the tree to that point minus the file you want to write. I couldn't be
   bothered figuring out how to do path parsing and splitting correctly for
   such a quick script.
 - Several lines are just copied wholesale (for the JS/HTML switch): this is
   entirely fine. [Sandi Metz](https://www.sandimetz.com) has a cool phrase for
   it, but basically: don't fear simply copying things around. DRY is for when
   you want to extract and abstract. It's one of the last steps. And I add:
   sometimes it's not necessary at all.
