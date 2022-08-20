import {
  Expression,
  BinaryOperation,
  ExpressionParam,
  LiteralType,
  ExpressionType,
  Token,
  TokenType,
} from "./resources/types";

export function parser(tokens: Token[]): Expression {
  const [fstToken, ...restTokens] = tokens;

  if (fstToken && fstToken.type !== TokenType.OPEN_PAREN) {
    throw new SyntaxError("No initial call expression found.");
  }

  const res = parseCallExpression(restTokens);

  return res.callExpression;
}

interface ParseTokens {
  (tokens: Token[], params: ExpressionParam[]): ParseTokens;
}

interface ParsedTokens {
  params: ExpressionParam[];
  remainingTokens: Token[];
}

function parseTokens(
  tokens: Token[],
  params: ExpressionParam[] = []
): ParseTokens | ParsedTokens {
  const [fstToken, ...restTokens] = tokens;

  if (!fstToken) {
    throw new Error("Unexpected eof.");
  }

  if (fstToken.type === TokenType.NUMBER) {
    return parseTokens(restTokens, [
      ...params,
      {
        type: LiteralType.NUMBER_LITERAL,
        value: fstToken.token,
      },
    ]);
  }

  if (fstToken.type === TokenType.OPEN_PAREN) {
    const res = parseCallExpression(restTokens);

    return parseTokens(res.remainingTokens, [...params, res.callExpression]);
  }

  if (fstToken.type === TokenType.CLOSE_PAREN) {
    return { params: params, remainingTokens: restTokens };
  }

  throw new Error(`Unhandled token: ${fstToken.token}`);
}

function parseCallExpression(tokens: Token[]): {
  callExpression: Expression;
  remainingTokens: Token[];
} {
  const [operatorToken, ...restTokens] = tokens;

  if (operatorToken.type !== TokenType.SYMBOL) {
    throw new SyntaxError("Missing operator in call expression.");
  }

  const expressionName = getCallExpressionName(operatorToken.token);

  if (expressionName === null) {
    throw new SyntaxError(`Unknown operator: ${operatorToken.token}.`);
  }

  const res = parseTokens(restTokens);

  // For the sake of the type checker...
  if (!("params" in res)) {
    throw new Error();
  }

  return {
    callExpression: {
      type: ExpressionType.BINARY_OPERATION,
      name: expressionName,
      params: res.params,
    },
    remainingTokens: res.remainingTokens,
  };
}

function getCallExpressionName(token: string): BinaryOperation | null {
  switch (token) {
    case "+":
      return BinaryOperation.ADD;
    case "-":
      return BinaryOperation.SUBTRACT;
    case "*":
      return BinaryOperation.MULTIPLY;
    case "/":
      return BinaryOperation.DIVIDE;
    default:
      return null;
  }
}
