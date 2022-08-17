import { Token, TokenType } from "./resources/types";

const OPERATORS = ["+", "-", "*", "/"];
const SYMBOLS = ["(", ")", ...OPERATORS];

export function tokeniser(source: string): Token[] {
  const tokenValues = splitSource(Array.from(source));

  // For the sake of the type checker...
  if (!Array.isArray(tokenValues)) {
    return [];
  }

  return tokenValues.map(generateToken);
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

  if (tokenInProgress && SYMBOLS.includes(char)) {
    return splitSource(restOfChars, [...tokens, tokenInProgress, char], "");
  }

  if (SYMBOLS.includes(char)) {
    return splitSource(restOfChars, [...tokens, char], "");
  }

  if (tokenInProgress && isWhiteSpace(char)) {
    return splitSource(restOfChars, [...tokens, tokenInProgress], "");
  }

  if (isWhiteSpace(char)) {
    return splitSource(restOfChars, tokens, "");
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
  if (OPERATORS.includes(token)) {
    return { type: TokenType.OPERATOR, token };
  }
  if (isNumber(token)) {
    return { type: TokenType.NUMBER, token };
  }

  throw new SyntaxError(`Unrecognised token: ${token}`);
}

const isNumber = (x: string) => !isNaN(parseInt(x));
const isWhiteSpace = (x: string) => x === " ";