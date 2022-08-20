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
  type: ExpressionType.BINARY_OPERATION;
  name: BinaryOperation;
  params: ExpressionParam[];
}

export enum ExpressionType {
  BINARY_OPERATION = "call expression",
  CONDITIONAL = "conditional",
}

export enum BinaryOperation {
  ADD = "add",
  SUBTRACT = "subtract",
  MULTIPLY = "multiply",
  DIVIDE = "divide",
}

export type ExpressionParam = Expression | Literal;

export interface Literal {
  type: LiteralType;
  value: string;
}

export enum LiteralType {
  NUMBER_LITERAL = "number literal",
}
