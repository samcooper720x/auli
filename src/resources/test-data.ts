import {
  Expression,
  BinaryOperation,
  LiteralType,
  ExpressionType,
  Token,
  TokenType,
} from "./types";

// Basic math only
export const testSource1 = "(+ 2 (- (/ 800 10) (* 0.4 100)))";

export const testTokens1: Token[] = [
  { type: TokenType.OPEN_PAREN, token: "(" },
  { type: TokenType.SYMBOL, token: "+" },
  { type: TokenType.NUMBER, token: "2" },
  { type: TokenType.OPEN_PAREN, token: "(" },
  { type: TokenType.SYMBOL, token: "-" },
  { type: TokenType.OPEN_PAREN, token: "(" },
  { type: TokenType.SYMBOL, token: "/" },
  { type: TokenType.NUMBER, token: "800" },
  { type: TokenType.NUMBER, token: "10" },
  { type: TokenType.CLOSE_PAREN, token: ")" },
  { type: TokenType.OPEN_PAREN, token: "(" },
  { type: TokenType.SYMBOL, token: "*" },
  { type: TokenType.NUMBER, token: "0.4" },
  { type: TokenType.NUMBER, token: "100" },
  { type: TokenType.CLOSE_PAREN, token: ")" },
  { type: TokenType.CLOSE_PAREN, token: ")" },
  { type: TokenType.CLOSE_PAREN, token: ")" },
];

export const testAst1: Expression = {
  type: ExpressionType.BINARY_OPERATION,
  name: BinaryOperation.ADD,
  params: [
    { type: LiteralType.NUMBER_LITERAL, value: "2" },
    {
      type: ExpressionType.BINARY_OPERATION,
      name: BinaryOperation.SUBTRACT,
      params: [
        {
          type: ExpressionType.BINARY_OPERATION,
          name: BinaryOperation.DIVIDE,
          params: [
            { type: LiteralType.NUMBER_LITERAL, value: "800" },
            { type: LiteralType.NUMBER_LITERAL, value: "10" },
          ],
        },
        {
          type: ExpressionType.BINARY_OPERATION,
          name: BinaryOperation.MULTIPLY,
          params: [
            { type: LiteralType.NUMBER_LITERAL, value: "0.4" },
            { type: LiteralType.NUMBER_LITERAL, value: "100" },
          ],
        },
      ],
    },
  ],
};

export const testResolution1 = 42;

// With conditionals
export const testSource2 = "(if (= 2 2) 7 (+ 40 2))";

export const testTokens2: Token[] = [
  { type: TokenType.OPEN_PAREN, token: "(" },
  { type: TokenType.SYMBOL, token: "+" },
  { type: TokenType.NUMBER, token: "2" },
  { type: TokenType.OPEN_PAREN, token: "(" },
  { type: TokenType.SYMBOL, token: "-" },
  { type: TokenType.OPEN_PAREN, token: "(" },
  { type: TokenType.SYMBOL, token: "/" },
  { type: TokenType.NUMBER, token: "800" },
  { type: TokenType.NUMBER, token: "10" },
  { type: TokenType.CLOSE_PAREN, token: ")" },
  { type: TokenType.OPEN_PAREN, token: "(" },
  { type: TokenType.SYMBOL, token: "*" },
  { type: TokenType.NUMBER, token: "0.4" },
  { type: TokenType.NUMBER, token: "100" },
  { type: TokenType.CLOSE_PAREN, token: ")" },
  { type: TokenType.CLOSE_PAREN, token: ")" },
  { type: TokenType.CLOSE_PAREN, token: ")" },
];
