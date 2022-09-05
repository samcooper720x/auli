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

## How good is Auli?

Auli will be assessed once it has a minimum of features required to implement a few canonical programs (draft list below). In the meantime, it is enough to say that Auli is thoroughly flawed and already I have realised a number of mistakes in my approach.

**Suggested benchmark programs:**

- [ ] Hello World
- [ ] FizzBuzz
- [ ] Fibonacci nth term

## Development notes

### Extending the standard library

1. Add the new symbol to the appropriate array so it can be recognised by the [tokeniser](src/tokeniser.ts).
2. Add the new operation name to the appropriate enum in [types](src/resources/types.ts).
3. Add a case for the new symbol to the appropriate `getOperationName` function in the [parser](src/parser.ts).
4. Use `.set()` to extend the [standard library](src/resources/standard-library.ts) with an implementation of the new function.
5. Handling of the new function can be tested by adding expected values to the appropriate `testOperation` arrays in [test data](src/resources/test-data.ts).

## ToDo

### Bugs

- Unable to evaluate multiple nested expressions (e.g.: `(if (> 2 3) 6 ((print 'this path') (+ 2 4))))`)

### Functionality

#### MVP

- Can define and reference variables
- Can define and reference functions
- Can evaluate mutiple expressions (`begin`)

#### StdLib

- `concat`
- `list`

#### Pipe dreams

- Anonymous functions / `let`
- Tail-call elimination
- Standard library sufficient to complete SICP exercises

### Quality

#### High priority

- Contextual error messages (position at minimum)
- Test eval / entry functions
- Help / manual page
- Automated tests

#### Low priority

- Stricter types on expression params (types > arrays)
- Pre-commit hooks
- Update terminology to match standards

### Project

- Publish to npm
- Compile to bytecode
- Haskell port
- Web based repl / mini ide
- Logo
