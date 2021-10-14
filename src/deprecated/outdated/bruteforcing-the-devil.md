
# Bruteforcing the Devil

> 5 June 2014

Preface, of a sort, by mako himself:

>  Once, there was a circle of artists and wizards. The convocation called itself #Merveilles.
>
> For a long time, most of the members of the cadre could be distinguished only by their names. The most connected among them took on varied faces of animals, but they were only a few.
>
> One day, a faun arrived at the convocation. Lamenting that so many of its members looked exactly the same, it decided to use its *wild generative majykks* to weave a spell that would illuminate all members of the circle equally.
>
> By the name of the subject, the majic would produce a number.
>
> By that number, it would resolve a face.
>
> And [so](http://syhexgen.makopool.com) [it](http://makopool.com/showBoard.html) [did](http://merveill.es/).
>
> The faun's enchantment brought joy to the circle, and for a time, it was good.
>
> Many moons later, the faun, reviewing its work, realized that the m4g1kz it had cast had an imperfection. It was struck with a vision of the eventual coming of a strange being.
>
> By the name of that devil, the mædʒIkz would produce **6** **6** **6**
>
> From 666, it would resolve **no face at all**
>
> Hearing the prognostication, a few set out in search of the name of the devil who hath no face, so that they may take it for their own. This is where our story begins...

***

On the 3rd of June — it was Tuesday — [mako] gave me an interesting challenge. He'd been trying for a while now to get me into a particular community, but this is what actually brought me over:

[mako]: http://makopool.com/

> - { mako }: If you ever decide to introduce yourself to #merveilles, find a name that hashes to 666 according to the following

```javascript
String.prototype.hashCode = function(){
		var hash = 0, i, char;
		if (this.length == 0) return hash;
		for (var i = 0, l = this.length; i < l; i++) {
				char  = this.charCodeAt(i);
				hash  = ((hash<<5)-hash)+char;
				hash |= 0; // Convert to 32bit integer
		}
		return hash;
};
```

> - { mako }: It'll resolve to a BLANK ICON. Nobody else will have one. It will be eerie and awesome.

Huh. Well, okay.

I queried for the exact parameters:

- It has to be between 1 and 30 characters.
- It has to be ascii. Actually, the exact alphabet is `qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890_-\[]{}\`^|`.
- It has to hash down to exactly 666.

After briefly considering a reverse-engineering approach, I created [a quick prototype in NodeJS][1] to bruteforce the hash using sequential strings. I set it to run, but noticed pretty quickly (i.e. my desktop environment crashed) that it was using too much memory:

> - { passcod }: I've brute-forced the hash up to 4chars and ~50% of 5chars, and node ate up nearly 2Gb of swap in under a minute. Now I'm considering rewording it in rust to have memory guarantees ;)

After looking around the web (turns out that googling "NodeJS uses too much memory" returns a lot of garbage), I found [a partial solution][2]:

> - { passcod }: I'm forcing gc in node every 1000 tries, and it's slowed down the memory uptake, but it's still rising and about 1% (of 4G) every 20s :(

Clearly that wasn't the right way. Still, I persevered, switching my method to use "the *bogo* approach": generating random strings of random length. The memory usage was still insane, but I hoped to have enough data in a short while to do some analysing:

> - { passcod }: Right, after 2 million hashes taken from random strings of random(1..20) length, the *only* ones that have three characters {sic, I meant digits} are single chars. These obviously don't go as high as 666.
> - { passcod }: I conclude it's either rare or impossible
> - { mako }: I wont feel comfortable until we can conclude it's impossible. As far as we know, the devil is still out there, hiding.

At this point, mako decided to [write one in C++][3]. Meanwhile, I wondered about outside-the-square solutions: maybe this supported UTF-8! Nope:

> - { mako }: No unicode allowed.

Oh well. Dinner awaited.

[1]: https://github.com/passcod/merhash/blob/master/merhash.js
[2]: https://github.com/passcod/merhash/blob/master/merhash.js#L20-L23
[3]: https://github.com/passcod/merhash/blob/master/merhash.cpp

***

That evening, I got back to mako finding C++ less than unyielding:

> - { mako }: I almost just caused an access violation.
> - { mako }: Already blowing my fingers off.
> - { mako }: Arg, exposing raw pointers. I'm so out of practice.

Out of curiosity and a stray "There must be a better way" thought, I started implementing it in Rust. Ninety minutes later, I had this:

```rust,ignore
mod random {
  use std::string::String;
  use std::rand;
  use std::rand::Rng;

  fn chr() -> Option<&u8> {
    let alphabet = bytes!("qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890_-[]{}^|\\`");
    rand::task_rng().choose(alphabet)
  }

  pub fn string(len: uint) -> String {
    let mut result = String::with_capacity(len);
    for _ in range(0, len) {
      result.push_char(match chr() {
        Some(c) => *c,
        None => 48 as u8
      } as char);
    }
    result
  }
}

fn hash_code(input: &String) -> i32 {
  let mut hash: i32 = 0;
  if input.len() == 0 {
    0
  } else {
    for c in input.as_slice().chars() {
      hash = ((hash << 5) - hash) + (c as i32);
      hash |= 0;
    }
    hash
  }
}

fn main() {
  let strg = random::string(4);
  let hash = hash_code(&strg);
  println!("{}: {}", strg, hash)
}
```

> - { passcod }: Mostly written because when you gave your C++, I realised I couldn't read C++

I started by benchmarking it against the Node version, and found that it was 3x faster unoptimised, ~10x optimised, and had constant memory usage. A definite improvement!

> - { passcod }: 200,000 iter/s

I attempted to make it multi-threaded, but benched it to be 2-3x slower (probably my fault, not Rust's). It didn't matter, though, as the *bogo* approach meant I could run two instances of the program with no semantic difference than doing it with threads.

It was getting late, so I used a combination of [t] and bash scripting to let it run on my Linode VPS during the night and have it tweet me if it found anything.

And then it was sleep tiem.

***

In the morning, I woke up to two things.

1. First, I got onto Hangouts and found via mako that "Wally", a #merveilles member (I think?), had jumped on board and was using a multi-threaded approach on peh's 8-core machine. Things were getting serious.
  I enquired about his hashing speed (I admit I was starting to be quite proud of myself at this moment), and mentioned that at the rate I was going, I would have computed about 4 billion hashes up 'til then.
2. I checked Twitter about 15 minutes later, and discovered that my agitation was, really, unwarranted:

> - { passcod }: I've got it
> - { passcod }: I've got TWO
> - { mako }: Dear god.

They didn't look good, though, ascii barf more than anything: `8XKf2WAkny|CFAZi_vQn` and `LcBqgVVPOSEkdIB7BZlVO`.

> - { mako }: OH. We could even use my godname generator.

Mako's current occupation is developing a "platform for encouraging writers to explore a new format for fiction and collaborative world-building." The mentioned [godname generator][4] creates a random, pronounceable name with a music that is quite particular, like "sonoellus" or "tsaleusos" or "thoruh" or "seposh".

It uses weightings for each letter, which is fine for one-off name creation, but too time-consuming for my brute-forcing purposes, so I discarded that part. I measured [my implementation][5] to be generating 64k names per second on my machine, which wasn't too bad. Slower than pure random, but that was expected.

Meanwhile, I decided to go have a look on #merveilles, and used the second name I got as a nick. I got mistaken as a bot! and just as I was about to give some pointers as to why my name was so weird, the connection dropped:

> * LcBqgVVPOSEkdIB7BZlVO has quit (Client Quit)
> < Preston > NOOO the mystery

Wednesday afternoon, "Wally" gave up. That was a bit relaxing, although the competition was interesting.

***

<!-- ![A sheet of the icons that hash is used to produce](hexicon-facesheet.png) -->

_Each one of these icons was produced using an int32 seed. The 666 seed produces a blank icon._

***

Wednesday evening, I had a good implementation but previous results told me to only expect an answer after five days of computation. I wondered about alternatives:

> - { passcod }: I'm half tempted to buy a few hours of highcpu AWS compute power and get it done nowish instead

After a bit of research, I decided to just go for it. I set myself a $50 spending limit, which gave me about 24 hours of compute on an instance with 32 virtual cores, each about as powerful as one of my Linode's cores.

I set it to run with 31 merhash programs running in parallel:

![31 cores being used fully](https://i.imgur.com/4I6qY7x.png)

And went comatose again.

***

> - { mako }: That was the best sleep I've had in a while.
> - { passcod }: Well, godname 666 is not looking good.
> - { mako }: Nothing ?
> - { passcod }: I got a cumulative 16 billion godnames generated and hashed, and nothing.

Uh oh.

Investigating further, I realised I had made a few mistakes:

- I had set the random length generator wrong, and generated *only* 30-char-long godnames.
- There was a bug in my implementation where the godname algorithm would get stuck in an infinite loop producing nothing.
- My result collecting technique was sub-par.

After getting back from class, I set upon fixing those, which took about an hour, and I now had about 10 remaining hours of compute time. I also made an improvement to improve the yield:

> - { passcod }: Also I've modified it so each instance appends any result it finds to a file and continues running.

I also created two versions of the program: one with godnames, the other with a reduced-alphabet random string generator, in the hopes of still getting readable names. I set both to run on 15 cores each.

And I waited.

***

After just above 4 billion hashes, I got my first devil name: `shoruzorhorheugogeuzudeazaeon`. Go on, try to pronounce it. Isn't it absolutely hilarious?

__SUCCESS!__

Even better: another, shorter, sweeter name appeared just six minutes later; `heapaepaemnunea`.

__SUCCESS!__

After this, I got two more: `somureamorumnaemeurheuzeuon` and `vqsjsawoqgygbrziydpkyyinfmfvw`.

__SUCCESS!__

***

As I speak, I have computed another 12 billion hashes, or a grand total of about 35 billion, and no more names have appeared. I'm now going to shut it down, close my wallet, and use `heapaepaemnunea` as my #merveilles *nom de plume*.

![16 billion hashes and just four devil names](http://i.imgur.com/dqYz7Za.png)

It's been fun! …and I can now assume _the face of the **Devil**_.

[t]: https://rubygems.org/gems/t
[4]: https://github.com/passcod/merhash/blob/master/godname.scala
[5]: https://github.com/passcod/merhash/blob/master/godname.rs
