> [Advent of Code] is a series of small programming puzzles for a variety
> of skill levels. They are self-contained and are just as appropriate for
> an expert who wants to stay sharp as they are for a beginner who is just
> learning to code. Each puzzle calls upon different skills and has two
> parts that build on a theme.

[Advent of Code]: http://adventofcode.com

My solutions are usually in JavaScript or Ruby. For each problem, I also try to create an "evil solution" which uses `eval()`. This page will update along whenever I finish a problem.

## 1.1

First, eliminate as many pairs of `()` _or_ `)(` as possible, leaving you with a string of either all `(` or all `)`. Then use the length of the string and which symbol it is to figure out the answer.

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
return eval(input.replace(/\(/g, '+1').replace(/\)/g, '-1'))
```

## 1.2

This is actually easier. In part one, I wanted to be clever, so I didn't do the naive thing and iterate through the string keeping a counter. Let's do that now:

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
return eval(`c=0;i=0;r=-1;${input.replace(/\(/g, 'i+=1;c+=1;').replace(/\)/g, 'i-=1;c+=1;if(r<0&&i===-1){r=c+0}')};r`)
```

