# Auli

Auli is a very (very very) limited Lisp dialect.

## How to use Auli

### Pre-requisites

This project uses [yarn](https://yarnpkg.com/) and [Node.js](https://nodejs.org/en/).
It manages these tools using [volta](https://volta.sh/).
Install all three and volta should make sure you're using the right versions.

### Setup

1. `yarn install` to install dependencies.
2. `npm run tests` to ensure everything is working ok.
3. `npm run build` to build.

### Evaluating expressions

Auli provides a repl and the ability to evaluate source files.

- To start the repl: `yarn run auli`
- To evaluate a file: `yarn run auli -- <path>`

## Why Auli?

As the name Lisp is derived from "list processor", so the name Auli is derived from "almost useless Lisp interepreter".

Auli is intended as a hobby language to explore the craft of programming languages with. The choice of a Lisp dialect came down to three factors:

1. The straightforward syntax and expression oriented nature of Lisp hopefully simplify the parser implementation, allowing me to roll my own without it becoming too much of a horrorshow.
2. There are powerful language features that can provide stretch goals and new challenges (e.g.: tail-call elimination, macros).
3. Lisps are fun to program in and even relatively limited dialects like MIT Scheme can be used to implement interesting programs.
