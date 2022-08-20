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

export type Expression = Conditional | Comparison | BinaryOperation;

export interface Conditional {
  type: ExpressionType.CONDITIONAL;
  params: ExpressionParam[];
}

export interface Comparison {
  type: ExpressionType.COMPARISON;
  params: ExpressionParam[];
  name: ComparisonNames;
}

export interface BinaryOperation {
  type: ExpressionType.BINARY_OPERATION;
  params: ExpressionParam[];
  name: BinaryOperationNames;
}

export enum ExpressionType {
  CONDITIONAL = "conditional",
  COMPARISON = "comparison",
  BINARY_OPERATION = "call expression",
}

export enum ComparisonNames {
  EQUALS = "equals",
}

export enum BinaryOperationNames {
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
