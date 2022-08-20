export interface Token {
  type: TokenType;
  token: string;
}

export enum TokenType {
  OPEN_PAREN = "(",
  CLOSE_PAREN = ")",
  QUOTE = "'",
  SYMBOL = "symbol",
  NUMBER = "number",
  STRING = "string",
  UNHANDLED = "unhandled",
}

export type Expression = UnaryOperation | BinaryOperation | TernaryOperation;

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
  BINARY_OPERATION = "binary expression",
  UNARY_OPERATION = "unary expression",
  TERNARY_OPERATION = "ternary expression",
}

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

export type ExpressionParam = Expression | NumberLiteral | StringLiteral;

export interface NumberLiteral {
  type: LiteralType.NUMBER_LITERAL;
  value: string;
}

export interface StringLiteral {
  type: LiteralType.STRING_LITERAL;
  value: string;
}

export enum LiteralType {
  NUMBER_LITERAL = "number literal",
  STRING_LITERAL = "string literal",
}
