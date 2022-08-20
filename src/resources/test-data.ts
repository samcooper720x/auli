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
export const testSource2 = "(if (= 1 2) 7 (if (= 3 3 ) 42 77))";

export const testTokens2: Token[] = [
  { type: TokenType.OPEN_PAREN, token: "(" },
  { type: TokenType.SYMBOL, token: "if" },
  { type: TokenType.OPEN_PAREN, token: "(" },
  { type: TokenType.SYMBOL, token: "=" },
  { type: TokenType.NUMBER, token: "1" },
  { type: TokenType.NUMBER, token: "2" },
  { type: TokenType.CLOSE_PAREN, token: ")" },
  { type: TokenType.NUMBER, token: "7" },
  { type: TokenType.OPEN_PAREN, token: "(" },
  { type: TokenType.SYMBOL, token: "if" },
  { type: TokenType.OPEN_PAREN, token: "(" },
  { type: TokenType.SYMBOL, token: "=" },
  { type: TokenType.NUMBER, token: "3" },
  { type: TokenType.NUMBER, token: "3" },
  { type: TokenType.CLOSE_PAREN, token: ")" },
  { type: TokenType.NUMBER, token: "42" },
  { type: TokenType.NUMBER, token: "77" },
  { type: TokenType.CLOSE_PAREN, token: ")" },
  { type: TokenType.CLOSE_PAREN, token: ")" },
];

export const testAst2: Expression = {
  type: ExpressionType.CONDITIONAL,
  params: [
    {
      type: ExpressionType.COMPARISON,
      params: [
        { type: LiteralType.NUMBER_LITERAL, value: "1" },
        { type: LiteralType.NUMBER_LITERAL, value: "2" },
      ],
    },
    { type: LiteralType.NUMBER_LITERAL, value: "7" },

    {
      type: ExpressionType.CONDITIONAL,
      params: [
        {
          type: ExpressionType.COMPARISON,
          params: [
            { type: LiteralType.NUMBER_LITERAL, value: "3" },
            { type: LiteralType.NUMBER_LITERAL, value: "3" },
          ],
        },
        { type: LiteralType.NUMBER_LITERAL, value: "42" },
        { type: LiteralType.NUMBER_LITERAL, value: "77" },
      ],
    },
  ],
};

export const testResolution2 = 42;
