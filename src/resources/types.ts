export interface Token {
  type: TokenType;
  token: string;
}

export enum TokenType {
  OPEN_PAREN,
  CLOSE_PAREN,
  OPERATOR,
  NUMBER,
  UNHANDLED,
}

export type ExpressionParam = CallExpression | Literal;

export interface CallExpression {
  type: NodeType.CALL_EXPRESSION;
  name: CallExpressionType;
  params: ExpressionParam[];
}

export enum NodeType {
  CALL_EXPRESSION = "call expression",
}

export enum CallExpressionType {
  ADD = "add",
  SUBTRACT = "subtract",
  MULTIPLY = "multiply",
  DIVIDE = "divide",
}

export interface Literal {
  type: LiteralType;
  value: string;
}

export enum LiteralType {
  NUMBER_LITERAL = "number literal",
}
