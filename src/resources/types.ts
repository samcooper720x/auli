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

export type Expression =
  | Conditional
  | Comparison
  | BinaryOperation
  | UnaryOperation;

export interface Conditional {
  type: ExpressionType.CONDITIONAL;
  params: ExpressionParam[];
}

export interface Comparison {
  type: ExpressionType.PREDICATE;
  params: ExpressionParam[];
  name: PredicateNames;
}

export interface BinaryOperation {
  type: ExpressionType.BINARY_OPERATION;
  params: ExpressionParam[];
  name: BinaryOperationNames;
}

export interface UnaryOperation {
  type: ExpressionType.UNARY_OPERATION;
  param: ExpressionParam;
  name: UnaryOperationNames;
}

export enum ExpressionType {
  CONDITIONAL = "conditional",
  PREDICATE = "predicate",
  BINARY_OPERATION = "binary expression",
  UNARY_OPERATION = "unary expression",
}

export enum PredicateNames {
  EQUAL = "===",
  NOT_EQUAL = "!==",
  LESS_THAN_OR_EQUAL_TO = "<=",
  LESS_THAN = "<",
  MORE_THAN_OR_EQUAL_TO = ">=",
  MORE_THAN = ">",
  // TODO: max & min
}

export enum BinaryOperationNames {
  ADD = "add",
  SUBTRACT = "subtract",
  MULTIPLY = "multiply",
  DIVIDE = "divide",
}

export enum UnaryOperationNames {
  PRINT = "print",
}

export type ExpressionParam = Expression | Literal;

export interface Literal {
  type: LiteralType;
  value: string;
}

export enum LiteralType {
  NUMBER_LITERAL = "number literal",
  STRING_LITERAL = "string literal",
}
