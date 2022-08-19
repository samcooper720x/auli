import {
  CallExpression,
  CallExpressionType,
  LiteralType,
  NodeType,
  Token,
  TokenType,
} from "./types";

// Basic math only
export const testSource1 = "(+ 2 (- (/ 800 10) (* 0.4 100)))";

export const testTokens1: Token[] = [
  { type: TokenType.OPEN_PAREN, token: "(" },
  { type: TokenType.OPERATOR, token: "+" },
  { type: TokenType.NUMBER, token: "2" },
  { type: TokenType.OPEN_PAREN, token: "(" },
  { type: TokenType.OPERATOR, token: "-" },
  { type: TokenType.OPEN_PAREN, token: "(" },
  { type: TokenType.OPERATOR, token: "/" },
  { type: TokenType.NUMBER, token: "800" },
  { type: TokenType.NUMBER, token: "10" },
  { type: TokenType.CLOSE_PAREN, token: ")" },
  { type: TokenType.OPEN_PAREN, token: "(" },
  { type: TokenType.OPERATOR, token: "*" },
  { type: TokenType.NUMBER, token: "0.4" },
  { type: TokenType.NUMBER, token: "100" },
  { type: TokenType.CLOSE_PAREN, token: ")" },
  { type: TokenType.CLOSE_PAREN, token: ")" },
  { type: TokenType.CLOSE_PAREN, token: ")" },
];

export const testAst1: CallExpression = {
  type: NodeType.CALL_EXPRESSION,
  name: CallExpressionType.ADD,
  params: [
    { type: LiteralType.NUMBER_LITERAL, value: "2" },
    {
      type: NodeType.CALL_EXPRESSION,
      name: CallExpressionType.SUBTRACT,
      params: [
        {
          type: NodeType.CALL_EXPRESSION,
          name: CallExpressionType.DIVIDE,
          params: [
            { type: LiteralType.NUMBER_LITERAL, value: "800" },
            { type: LiteralType.NUMBER_LITERAL, value: "10" },
          ],
        },
        {
          type: NodeType.CALL_EXPRESSION,
          name: CallExpressionType.MULTIPLY,
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
export const testSourceA = "(+ 2 (- (/ 800 10) (* 0.4 100)))";

export const testTokensA: Token[] = [
  { type: TokenType.OPEN_PAREN, token: "(" },
  { type: TokenType.OPERATOR, token: "+" },
  { type: TokenType.NUMBER, token: "2" },
  { type: TokenType.OPEN_PAREN, token: "(" },
  { type: TokenType.OPERATOR, token: "-" },
  { type: TokenType.OPEN_PAREN, token: "(" },
  { type: TokenType.OPERATOR, token: "/" },
  { type: TokenType.NUMBER, token: "800" },
  { type: TokenType.NUMBER, token: "10" },
  { type: TokenType.CLOSE_PAREN, token: ")" },
  { type: TokenType.OPEN_PAREN, token: "(" },
  { type: TokenType.OPERATOR, token: "*" },
  { type: TokenType.NUMBER, token: "0.4" },
  { type: TokenType.NUMBER, token: "100" },
  { type: TokenType.CLOSE_PAREN, token: ")" },
  { type: TokenType.CLOSE_PAREN, token: ")" },
  { type: TokenType.CLOSE_PAREN, token: ")" },
];
