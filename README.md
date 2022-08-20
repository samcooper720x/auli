# Auli

Auli is a very (very very) limited Lisp dialect.

## How to use Auli

### Pre-requisites

This project uses [yarn](https://classic.yarnpkg.com/lang/en/) and [Node.js](https://nodejs.org/en/).
It manages these tools using [volta](https://volta.sh/).
Install all three and volta should make sure you're using the right versions.

### Setup

1. `yarn install` to install dependencies.
2. `yarn tests` to ensure everything is working ok.
3. `yarn build` to build.

### Evaluating expressions

Auli provides a repl and the ability to evaluate source files.

- To start the repl: `yarn auli`
- To evaluate a file: `yarn auli <path>`

## Why Auli?

As the name Lisp is derived from "list processor", so the name Auli is derived from "almost useless Lisp interepreter".

Auli is intended as a hobby language to explore the craft of programming languages with. The choice of a Lisp dialect came down to three factors:

1. The straightforward syntax and expression oriented nature of Lisp hopefully simplify the parser implementation, allowing me to roll my own without it becoming too much of a horrorshow.
2. There are powerful language features that can provide stretch goals and new challenges (e.g.: tail-call elimination, macros).
3. Lisps are fun to program in and even relatively limited dialects like MIT Scheme can be used to implement interesting programs.

## ToDo

### Bugs

- Syntax errors crash repl
- Unable to evaluate multiple nested expressions (e.g.: `(if (> 2 3) 6 ((print 'this path') (+ 2 4))))`)

### Functionality

#### MVP

- Can evaluate hello world program
- Can define and reference

#### Pipe dreams

- Anonymous functions
- Tail-call elimination
- Standard library sufficient to complete SICP exercises

### Quality

#### High priority

- Contextual error messages (position at minimum)
- Test eval / entry functions
- Help / manual page
- Automated tests

#### Low priority

- Stricter types on expression params (types > arrays)
- Pre-commit hooks
- Update terminology to match standards

### Project

- Publish to npm
- Compile to bytecode
- Haskell port
- Web based repl / mini ide
- Logo
