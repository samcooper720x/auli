export interface Token {
  type: TokenType;
  token: string;
}

export enum TokenType {
  OPEN_PAREN = "(",
  CLOSE_PAREN = ")",
  BEGIN = "begin",
  DEFINE = "define",
  SYMBOL = "symbol",
  NUMBER = "number",
  QUOTE = "'",
  STRING = "string",
  UNHANDLED = "unhandled",
}

export type Expression =
  | Begin
  | Definition
  | UnaryOperation
  | BinaryOperation
  | TernaryOperation;

export interface Begin {
  type: ExpressionType.BEGIN;
  expressions: Expression[];
}

export interface Definition {
  type: ExpressionType.DEFINITION;
  boundName: string;
  boundValue: ExpressionParam;
}

export interface UnaryOperation {
  type: ExpressionType.UNARY_OPERATION;
  param: ExpressionParam;
  name: UnaryOperationNames;
}

export interface BinaryOperation {
  type: ExpressionType.BINARY_OPERATION;
  params: ExpressionParam[];
  name: BinaryOperationNames;
}

export interface TernaryOperation {
  type: ExpressionType.TERNARY_OPERATION;
  params: ExpressionParam[];
  name: TernaryOperationNames;
}

export enum ExpressionType {
  BEGIN = "begin",
  DEFINITION = "definition",
  UNARY_OPERATION = "unary",
  BINARY_OPERATION = "binary",
  TERNARY_OPERATION = "ternary",
}

export type ExpressionParam =
  | Expression
  | NumberLiteral
  | StringLiteral
  | VariableReference;

export enum BinaryOperationNames {
  ADD = "add",
  SUBTRACT = "subtract",
  MULTIPLY = "multiply",
  DIVIDE = "divide",
  EQUAL = "===",
  NOT_EQUAL = "!==",
  LESS_THAN_OR_EQUAL_TO = "<=",
  LESS_THAN = "<",
  MORE_THAN_OR_EQUAL_TO = ">=",
  MORE_THAN = ">",
  MAX = "max",
  MIN = "min",
}

export enum UnaryOperationNames {
  PRINT = "print",
}

export enum TernaryOperationNames {
  IF = "if",
}

export interface NumberLiteral {
  type: LiteralType.NUMBER_LITERAL;
  value: string;
}

export interface StringLiteral {
  type: LiteralType.STRING_LITERAL;
  value: string;
}

export interface VariableReference {
  type: LiteralType.VARIABLE_REFERENCE;
  value: string;
}

export enum LiteralType {
  NUMBER_LITERAL = "number literal",
  STRING_LITERAL = "string literal",
  VARIABLE_REFERENCE = "variable reference",
}
