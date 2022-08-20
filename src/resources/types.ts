export interface Token {
  type: TokenType;
  token: string;
}

export enum TokenType {
  OPEN_PAREN,
  CLOSE_PAREN,
  SYMBOL,
  NUMBER,
  UNHANDLED,
}

export interface Expression {
  type: ExpressionType;
  params: ExpressionParam[];
  name?: BinaryOperation;
}

export enum ExpressionType {
  BINARY_OPERATION = "call expression",
  CONDITIONAL = "conditional",
  COMPARISON = "comparison",
}

export enum BinaryOperation {
  ADD = "add",
  SUBTRACT = "subtract",
  MULTIPLY = "multiply",
  DIVIDE = "divide",
}

export enum Comparison {
  EQUALS = "equals",
}

export type ExpressionParam = Expression | Literal;

export interface Literal {
  type: LiteralType;
  value: string;
}

export enum LiteralType {
  NUMBER_LITERAL = "number literal",
}
