> [Advent of Code] is a series of small programming puzzles for a variety
> of skill levels. They are self-contained and are just as appropriate for
> an expert who wants to stay sharp as they are for a beginner who is just
> learning to code. Each puzzle calls upon different skills and has two
> parts that build on a theme.

[Advent of Code]: http://adventofcode.com

My solutions are usually in JavaScript or Ruby. For each problem, I also try to
create an "evil solution" which uses `eval()`. This page will update along
whenever I finish a problem.

## 1.1

First, eliminate as many pairs of `()` _or_ `)(` as possible, leaving you
with a string of either all `(` or all `)`. Then use the length of the
string and which symbol it is to figure out the answer.

```js
const regex = /(\(\)|\)\()/
while (null !== input.match(regex)) {
  input = input.replace(regex, '')
}

if (input === '') { return 0 }
return input.length * (input[0] === '(' ? 1 : -1)
```

Evil solution:

```js
return eval(
  input
  .replace(/\(/g, '+1')
  .replace(/\)/g, '-1')
)
```

## 1.2

This is actually easier. In part one, I wanted to be clever, so I didn't
do the naive thing and iterate through the string keeping a counter. Let's
do that now:

```js
let floor = 0
let position = 0
while (floor !== -1) {
  floor += input[position] === '(' ? 1 : -1
  position += 1
}
return position
```

Evil solution:

```js
return eval(`c=0;i=0;r=-1;${input.
  replace(/\(/g, 'i+=1;c+=1;').
  replace(/\)/g, 'i-=1;c+=1;if(r<0&&i===-1){r=c+0}')
};r`)
```

## 2.1

First, let's figure out a little math. We're going to get a lot of package
definitions, so optimise the whole thing a bit:

```
2*l*w + 2*w*h + 2*h*l   // Original formula (6 mulitiplications)
2*(l*w + w*h + h*l)     // Factorise, now we only have 4 multiplications

2*... + 2*... + 2*...   // Each individual result is multiplied by two
2*(... + ... + ...)     // So we can sum all results then double it once

l*w + w*h + h*l         // The simplified inner formula (3 multiplications)
w*(h + l) + h*l         // Factorised, only 2 multiplications
```

Onto the code!

```js
let slack = 0
return input.split("\n").reduce((memo, line) => {
  if (line === '') { return memo }
  let d = line.split('x').map(n => +n).sort((a, b) => a - b)
  slack += d[0] * d[1]
  return memo += d[0] * (d[1] + d[2]) + d[1] * d[2]
}, 0) * 2 + slack
```

Evil, but boring (it's just an inlining of the above), solution:

```js
return eval(`t=0;s=0;${input.
  replace(/(\d+)x(\d+)x(\d+)\s*/g, 't+=($1*($2+$3)+$2*$3);s+=[$1,$2,$3].sort((a,b) => a-b).slice(0,2).reduce((m,d) => m*d, 1);')
}t*2+s`)
```

In case you're confused (mwahaha):

- `.slice(0, N)` takes the first N items
- `.map(n => +n)` casts all items to numbers
- `.sort((a, b) => a - b)` sorts numerically
- `.reduce((m, d) => m * d, 1)` product of all items
- `.reduce((m, d) => m + d, 0)` sum of all items (used below)

## 2.2

No preliminary math, this time.

```js
return input.split("\n").reduce((memo, line) => {
  if (line === '') { return memo }
  let d = line.split('x').map(n => +n).sort((a, b) => a - b)
  return memo + d.slice(0, 2).reduce((m, d) => m + d, 0) * 2 +
    d.reduce((m, d) => m * d, 1)
}, 0)
```

Ugh. So boring.

Evil solution, which assumes that the input has a trailing newline:

```js
const bows = eval(input.replace(/x/g, '*').replace(/\s+/g, '+') + '.0')
const wrap = eval(`"${input.replace(/\s+/g, '\".split(/x/g).map(n => +n).sort((a, b) => a - b).slice(0, 2).reduce((m, d) => m + d, 0)+"')}".length`)
return bows + wrap * 2
```

## 3.1

I only implemented the evil version of this, because I found it easier. Each
axis (north-south, east-west) is represented as a number, together they form
coordinates. The insight was that a pair of coordinates identified uniquely
a particular house, so we translate each instruction to either adding or
removing 1 from the correct variable (starting position is 0, 0) then
after each instruction we write the coordinates to a Set. The solution is then
simply the `.size` of the Set. (Sets only store unique values.)

```js
let moves = input
  .replace(/</g, 'x-=1;')
  .replace(/>/g, 'x+=1;')
  .replace(/v/g, 'y+=1;')
  .replace(/\^/g, 'y-=1;')
  .replace(/;/g, ';save(x,y);')

// Construct and run the program:
return eval(`x=0;y=0;s=new Set();
save=function(a,b){s.add([a,b].join('|'))};
save(x,y);${moves}s`).size
```

## 3.2

Same idea, nearly the same program, except now we need to keep track of who's
who. We do this by using a tuple, and using either the first or the second
value, switching after every instructions.

```js
let moves = input
  .replace(/</g, 'x[who]-=1;')
  .replace(/>/g, 'x[who]+=1;')
  .replace(/v/g, 'y[who]+=1;')
  .replace(/\^/g, 'y[who]-=1;')
  .replace(/;/g, ';save(x[who],y[who]);who=+!who;')

// Construct and run the program:
return eval(`x=[0,0];y=[0,0];s=new Set();who=0;
save=function(a,b){s.add([a,b].join('|'))};
save(x[who],y[who]);${moves}s`).size
```

## 4.1

Let's bruteforce some MD5s:

```js
const crypto = require('crypto')
hash = n => crypto.createHash('md5').update(`${input}${n}`)
let n = 1
while (!hash(n).digest('hex').startsWith('00000')) { n += 1 }
return n
```

## 4.2

Just modify the `.startsWith()` part.

## 5.1

- `str.replace(/[^aeiou]/g, '').length > 2` contains at least 3 vowels
- `null !== str.match(/(.)\1/)` contains a repeating letter
- `null === str.match(/(ab|cd|pq|xy)/)` does not have the forbidden chars

```js
input
  .split(/\s+/)
  .filter(str =>
    (str.replace(/[^aeiou]/g, '').length > 2) &&
    (null !== str.match(/(.)\1/)) &&
    (null === str.match(/(ab|cd|pq|xy)/))
  )
  .length
```

## 5.2

- `null !== str.match(/(..).*\1/)` non-overlapping pairs
- `null !== str.match(/(.).\1/)` repeat with a letter in between

```js
input
  .split(/\s+/)
  .filter(str =>
    (null !== str.match(/(..).*\1/)) &&
    (null !== str.match(/(.).\1/))
  )
  .length
```

## 6.1

I don't particularly want to implement a million-entry state box. So let's
figure out a few things about the input. First, are the coordinates always from
the top-left corner to the bottom-right, or are they sometimes of the other
corners?

Wait wait, _actually first_, let's parse the input into a more machine friendly
data structure:

```js
let stack = input
  .split("\n")
  .filter(l => l !== '')
  .map(l => {
    let p = l.match(/(turn (on|off)|(toggle)) (\d+),(\d+) through (\d+),(\d+)/)
    return {
      action: p[3] || p[2],
      from: p.slice(4,6),
      to: p.slice(6,8)
    }
  })
```

Now onto analysis:

```js
let sizes = stack.map(l => [l.to[0] - l.from[0], l.to[1] - l.from[1]])
sizes.map(s => s.map(d => d >= 0)) // If all are true, corners are all TL->BR.
```

They are. OK. To make further processing easier, let's remove all stack
"frames" that are zero pixels wide or high:

```js
stack = stack.filter(frame => frame.from[0] !== frame.to[0] &&
  frame.from[1] !== frame.to[1])
```

At this point I was going to look at some logic properties to try and compress
the stack of definitions down to a manageable level, but then I thought:
wouldn't it be fun to see the pattern that results from the instructions? So I
went and `JSON.stringify(stack)`, carried it across to a browser's console, and
opened up a 1000x1000 canvas.

```js
$c = $('#lightsout') // In consoles, without jQuery, `$` is an alias for
                     // `querySelector`, and `$$` for `querySelectorAll`.
ctx = $c.getContext('2d')
```

Now then. Turn on is easy. Turn off is easy. Toggle is... slightly harder:

```js
function cornersToDims(from, to) {
  return [from[0], from[1], to[0] - from[0] + 1, to[1] - from[1] + 1]
}

function turnOn(from, to) {
  ctx.fillStyle = 'white'
  ctx.fillRect.apply(ctx, cornersToDims(from, to))
}

function turnOff(from, to) {
  ctx.fillStyle = 'black'
  ctx.fillRect.apply(ctx, cornersToDims(from, to))
}

function toggle(from, to) {
  let image = ctx.getImageData.apply(ctx, cornersToDims(from, to))
  let data = image.data
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i]; // red
    data[i + 1] = 255 - data[i + 1]; // green
    data[i + 2] = 255 - data[i + 2]; // blue
    // and skip the 4th value as we don't want to touch the alpha channel
  }
  ctx.putImageData(image, from[0], from[1])
}
```

Okay, let's do this:

```js
turnOff([0, 0], [1000, 1000]) // Everything starts off
stack.forEach(frame => {
  switch (frame.action) {
  case 'on':
    turnOn(frame.from, frame.to)
    break
  case 'off':
    turnOff(frame.from, frame.to)
    break
  case 'toggle':
    toggle(frame.from, frame.to)
    break
  }
})
```

![Render of the light array](http://i.imgur.com/NMovEW9.png)

Uhm. Santa is into modern art, I guess?

Now onto actually retrieving the number of lights that are on:

```js
let image = ctx.getImageData(0, 0, 1000, 1000)
let data = image.data
let counter = 0
for (let i = 0; i < data.length; i += 4) {
  if (data[i] === 255) { counter += 1 }
}
```

## 6.2



