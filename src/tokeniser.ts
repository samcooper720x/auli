import { Token, TokenType } from "./resources/types";

const PARENS = ["(", ")"];
const QUOTES = ["'"];
const UNARY_OPERATORS = ["print"];
const BINARY_OPERATORS = [
  "+",
  "-",
  "*",
  "/",
  "=",
  "/=",
  "<=",
  "<",
  ">=",
  ">",
  "max",
  "min",
];
const TERNARY_OPERATORS = ["if"];

const SYMBOLS = [
  ...PARENS,
  ...QUOTES,
  ...UNARY_OPERATORS,
  ...BINARY_OPERATORS,
  ...TERNARY_OPERATORS,
];

export function tokeniser(source: string): Token[] {
  const tokenValues = splitSource(Array.from(source));

  // For the sake of the type checker...
  if (!Array.isArray(tokenValues)) {
    return [];
  }

  return tokenValues.filter((token) => token !== "").map(generateToken);
}

interface SplitSource {
  (tokens: string[], chars: string[], tokenInProgress: string): SplitSource;
}

function splitSource(
  chars: string[],
  tokens: string[] = [],
  tokenInProgress = ""
): SplitSource | string[] {
  if (chars.length === 0) {
    return tokens;
  }

  const [char, ...restOfChars] = chars;

  if (PARENS.includes(char) || QUOTES.includes(char)) {
    return splitSource(restOfChars, [...tokens, tokenInProgress, char], "");
  }

  if (isWhiteSpace(char)) {
    return splitSource(restOfChars, [...tokens, tokenInProgress], "");
  }

  return splitSource(restOfChars, tokens, `${tokenInProgress}${char}`);
}

function generateToken(token: string): Token {
  if (token === "(") {
    return { type: TokenType.OPEN_PAREN, token };
  }
  if (token === ")") {
    return { type: TokenType.CLOSE_PAREN, token };
  }
  if (token === "begin") {
    return { type: TokenType.BEGIN, token };
  }
  if (token === "define") {
    return { type: TokenType.DEFINE, token };
  }
  if (token === "'") {
    return { type: TokenType.QUOTE, token };
  }
  if (SYMBOLS.includes(token)) {
    return { type: TokenType.SYMBOL, token };
  }
  if (isNumber(token)) {
    return { type: TokenType.NUMBER, token };
  }
  return { type: TokenType.STRING, token };
}

const isNumber = (x: string) => !isNaN(parseFloat(x));
const isWhiteSpace = (x: string) => x === " ";
