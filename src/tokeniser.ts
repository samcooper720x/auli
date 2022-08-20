import { Token, TokenType } from "./resources/types";

const PARENS = ["(", ")"];
const COMPARISONS = ["=", "/=", "<=", "<", ">=", ">"];
const BINARY_OPERATORS = ["+", "-", "*", "/"];
const SYMBOLS = [...PARENS, "if", ...COMPARISONS, ...BINARY_OPERATORS];

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

  const updatedTokenInProgress = `${tokenInProgress}${char}`;

  if (PARENS.includes(char)) {
    return splitSource(restOfChars, [...tokens, tokenInProgress, char], "");
  }

  if (isWhiteSpace(char)) {
    return splitSource(restOfChars, [...tokens, tokenInProgress], "");
  }

  return splitSource(restOfChars, tokens, updatedTokenInProgress);
}

function generateToken(token: string): Token {
  if (token === "(") {
    return { type: TokenType.OPEN_PAREN, token };
  }
  if (token === ")") {
    return { type: TokenType.CLOSE_PAREN, token };
  }
  if (SYMBOLS.includes(token)) {
    return { type: TokenType.SYMBOL, token };
  }
  if (isNumber(token)) {
    return { type: TokenType.NUMBER, token };
  }

  throw new SyntaxError(`Unrecognised token: ${token}`);
}

const isNumber = (x: string) => !isNaN(parseFloat(x));
const isWhiteSpace = (x: string) => x === " ";
