function parse(source) {
  const tokens = tokenise(source);
  return readFromTokens(tokens);
}

function tokenise(chars) {
  const openParen = /(\()/g;
  const closingParen = /(\))/g;
  return chars.replace(openParen, " ( ").replace(closingParen, " ) ").split();
}

function readFromTokens(tokens) {
  if (tokens.length == 0) throw new SyntaxError("unexpected eof.");

  const token = tokens.shift();

  if (token == "(") {
    const L = [];
    while (tokens[0] != ")") L.push(readFromTokens(tokens));
    tokens.shift();
    return L;
  } else if (token === ")") {
    throw new SyntaxError();
  } else {
    return atom(token);
  }
}

function atom(token) {
  if (isNaN(parseFloat(token))) {
    return token;
  } else {
    parseFloat(token);
  }
}

function standardEnv() {
  // TODO
}

function evaluate(x, env = standardEnv()) {
  if (typeof x === "string") {
    return env[x];
  } else if (typeof x === "number") {
    return x;
  } else {
    console.log("still todo");
  }
}

const parsed = parse("(begin (define r 10) (* pi (* r r)))");
console.log(parsed);
