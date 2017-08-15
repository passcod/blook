---
date: 2017-08-16T09:13:16+12:00
title: An explanation of Rails's permit
tags:
   - post
   - rails
   - ruby
   - wealljs
---

## Background

In the WeAllJS Slack (which you should come and visit, if you haven't already!)
someone posted a question in the Rails channel (we're not all and only about
JavaScript! there's a lot there) asking about clarification and help around
Rails's `permit` method used to whitelist input values.

I won't reproduce the question here, but I'll paraphrase.

In essence, they had an input structure looking like this:

```json
{
   "box": {
      "kitten": [
         {
            "name": "Boo",
            "vaccination_dates": [
               "2013/10/11",
               "2013/01/30"
            ]
         },

         {
            "name": "Keek",
            "vaccination_dates": [
               "2014/10/11"
            ]
         }
      ]
   }
}
```

and they wanted to write a `permit` rule for it. They had tried this:

```ruby
private
def box_params
   params.require(:box).permit({kitten: [:name, :vaccination_dates]})
end
```

but it wasn't working. When searching, they'd found [a blog post advocating a
"Rule of Thumb"][pat] for this very method, and found it confusing.

Now, the article is very thorough, and does explain how it arrives at this "Rule
of Thumb" quite well. My issue with it is that the Rule itself is confusing and
looks like a mysterious magical incantation, and that the article goes through a
lot of trial and error which makes it difficult to follow along _when you don't
already have an understanding of the `permit` rules_.

In my explanation, I sought to present a _mental model_ of the `permit` rule,
that lets one reason about it and construct complex rules from simple building
blocks.

## Disclaimer

Please note that I haven't actually used Rails 4 for quite a while, and the code
presented may be slightly wrong in places. My aim was to present a mental model
that I found worked better, not provide perfect code.

The text below is edited slightly for style, but otherwise is the same I posted
in the Slack, with the exception of the code samples that have been changed to
reflect the structures shown above instead of those provided in the channel.

## A mental model

Instead of thinking in terms of "magic" rules, consider the `permit` structure
as a verbose form that has shorthand syntaxes.

Okay, so, `permit` takes a set of, let's call them... "permission descriptors".
A "permission" has this shape: `{ name: type }`. It's a single-element hash with
a _key_ that's the name of the attribute you want to permit, and a _value_ with
the "type" of that attribute. But for brevity, there's a shorthand so instead of
a single-element hash, you can just pass a Symbol and it will assume you mean "a
_key_ of {whatever the symbol is} and a _type_ of 'scalar'". We'll see why
"scalar" in a moment.

So in the case of your `"name": "Boo"`, you have a _key_ of `name` and a
"type" of "a scalar" (here, a string). In the case of `"vaccination_dates":
["2014/10/11"]`, you have a _key_ of `vaccination_dates` and a "type" of "not a
scalar" (here an array). Now, [`permit`'s docs][docs] say this:

> Only permitted **scalars** pass the filter.

(Emphasis mine.)

So for everything that's _not_ a scalar, we need to further describe the "type",
but for anything that _is_ a scalar, we can use the "shorthand" way. And to
permit an _array_ of scalars, the shorthand is `[]`.

To further describe the type, all you do is build up a "permit" object for the
inner structure. Same rules as usual! It's just a recursive exercise.

So for an array, like `"kitten": [ some kind of object, ... ]` and
`"vaccination_dates": [ a string, ... ]`, you have these permits:

 - kitten: `{ kitten: [ describe the object's properties ] }`
 - dates: `{ vaccination_dates: an array of scalars }`

That is:

```ruby
permit([
  { kitten: [
    :name,
    { vaccination_dates: [
      # nothing there, it's all just scalars
    ] }
  ] }
])
```

or:

```ruby
private
def box_params
   params.require(:box).permit({ kitten: [ :name, { vaccination_dates: [] } ] })
end
```

or without the explicit brackets, as pointed out by another person in the Slack:

```ruby
permit(kitten: [ :name, vaccination_dates: [] ])
```

[pat]: http://patshaughnessy.net/2014/6/16/a-rule-of-thumb-for-strong-parameters
[docs]: http://api.rubyonrails.org/classes/ActionController/Parameters.html#method-i-permit
