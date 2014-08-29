---
tags:
  - journal
  - ruby
  - clutter
  - sebastian
---

## Introduction

To write [Sebastian], a replacement for Conky written in Ruby,
I chose to use [Clutter]: a graphics library from the GNOME
project which uses OpenGL and Cairo and supports both X11 and
Wayland, as well as Windows and Mac. However, I found the
documentation lacking, both for the Ruby bindings and for the
"newbie" or "getting started" part of the Clutter documentation.

This is my journal working through the learning of Clutter in
Ruby for the purpose of writing Sebastian. Not included is all
the figuring out that only concerned Ruby, such as writing the
Sebastian DSL and internal mechanisms.

[Sebastian]: https://github.com/passcod/sebastian
[Clutter]: https://wiki.gnome.org/Projects/Clutter

## Starting out

I have [example.vala][0] and [clutter/sample/basic-actor.rb][1],
as well as the front page of the [Clutter Reference Manual][2] open
in my browser.

Ok, staring at code isn't working, let's open `pry` and set up:

```ruby
require 'clutter'
stage = Clutter::Stage.new
```

To start with, I want to display text. Pry is great for that,
it's easy to tab around or even `foo.methods.grep /bar/`. I
find `Clutter::Text` straight away. Ok, this is straightforward.

Following along the Vala example, and just guessing at the Ruby
equivalents, I get:

```ruby
foo = Clutter::Text.new
foo.text = "Foobar"
stage.add_child foo
```

And to run it:

```ruby
stage.show
Clutter.main # Ctrl-C to continue
```

The [Wikipedia page][3] says Clutter operates in "retained mode",
which means it keeps a model of the objects to be rendered. I
wonder if that means I can change the text of foo and have it
update.

```ruby
foo.text = "Bazquz"
# TypeError: destroyed GLib::Object
# from /home/.rbenv/versions/2.1.2/lib/ruby/gems/2.1.0/gems/gobject-introspection-2.2.0/lib/gobject-introspection/loader.rb:393:in `invoke'
```

Ouch. Okay, so that's not how.

```ruby
stage
#=> #<Clutter::Stage:0x7f7618465330 destroyed>
```

Aaah. So anything to do with that stage is moot once we call
`Clutter.main`. Ok, I guess that makes sense. So no live deving
after all. I can use pry to figure out what methods are and how
they are used, though.

***

Following the Vala example got me to try this to connect the
exit button to the process end:

```ruby
stage.destroy.connect(Clutter.main_quit)
# /home/.rbenv/versions/2.1.2/lib/ruby/gems/2.1.0/gems/gobject-introspection-2.2.0/lib/gobject-introspection/loader.rb: line 87
#    Clutter-CRITICAL **:clutter_main_quit: assertion 'main_loops != NULL' failed
#    NoMethodError: undefined method `connect' for nil:NilClass
#    from (pry):7:in `__pry__'
```

Uuh, what? Well, calling the `#destroy` method was (obviously,
in hindsight) destroying the stage, which then had no `connect`
method (also obvious in hindsight). The solution was actually
in the Ruby example (doh!):

```ruby
stage.signal_connect 'destroy' do
  Clutter.main_quit
end
```

***

Next problem was finding out how to update the stage every
second or so. I looked and looked at examples for various
bindings (Vala, Python, Ruby), at the reference manual, on
Google and blogs… no such luck.

So I did what any despearate programmer would do and connected
to the `#clutter` channel on irc.gnome.org. About ninety minutes
after asking my question (no channel of this size is going to be
active 24/7, so waiting was expected), I got the answer, from
someone nicked "ebassi":

- `g_timeout_add()` works fine for clocks and similar things.
  Timeouts are tied to the main loop, and do not require a
  scene update (i.e. if the values don't change, it's okay).
  They aren't *precise*, though: they can be delayed in favour
  of other events. Hundreds of milliseconds are good, single
  digit amounts not so much.
- `Timelines` are for animations. They are tied to the frame
  clock, which means they require a scene update, and they're
  not great for long intervals (they need to update every frame,
  so that's *three hundred updates* for a five second wait).

Obviously, what I needed was timeouts. A quick search gave me
[their documentation][4], which is in __GLib__. That explains
why I couldn't find anything!

Now to use that in Ruby. Again, if in doubt, [search the docs][5].

```ruby
GLib::Timeout.add_seconds 5 do
  puts 'Testing'
end
```

According to the documentation, the `_seconds` variant is more
efficient as it groups jobs, and the plain `GLib::Timeout.add`
method should only be used for smaller or more precise intervals.

***

[0]: https://wiki.gnome.org/Projects/Clutter/Tutorial/GettingStarted
[1]: https://github.com/ruby-gnome2/ruby-gnome2/blob/master/clutter/sample/basic-actor.rb
[2]: https://developer.gnome.org/clutter/1.18/
[3]: https://en.wikipedia.org/wiki/Clutter_%28toolkit%29
[4]: https://developer.gnome.org/glib/stable/glib-The-Main-Event-Loop.html#g-timeout-add
[5]: http://ruby-gnome2.sourceforge.jp/hiki.cgi?cmd=view&p=Ruby%2FGLib&key=timeout
