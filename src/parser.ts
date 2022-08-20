import {
  Expression,
  BinaryOperationNames,
  ExpressionParam,
  LiteralType,
  ExpressionType,
  Token,
  TokenType,
  ComparisonNames,
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

  const res = parseTokens(restTokens);

  // For the sake of the type checker...
  if (!("params" in res)) {
    throw new Error();
  }

  if (operatorToken.token === "if") {
    return {
      callExpression: { type: ExpressionType.CONDITIONAL, params: res.params },
      remainingTokens: res.remainingTokens,
    };
  }

  const comparisonName = getComparisonName(operatorToken.token);

  if (comparisonName) {
    return {
      callExpression: {
        type: ExpressionType.COMPARISON,
        name: comparisonName,
        params: res.params,
      },
      remainingTokens: res.remainingTokens,
    };
  }

  const binaryOperationName = getBinaryOperationName(operatorToken.token);

  if (binaryOperationName) {
    return {
      callExpression: {
        type: ExpressionType.BINARY_OPERATION,
        name: binaryOperationName,
        params: res.params,
      },
      remainingTokens: res.remainingTokens,
    };
  }

  throw new SyntaxError(`Unknown operator: ${operatorToken.token}.`);
}

function getComparisonName(token: string): ComparisonNames | null {
  switch (token) {
    case "=":
      return ComparisonNames.EQUAL;
    case "/=":
      return ComparisonNames.NOT_EQUAL;
    case "<=":
      return ComparisonNames.LESS_THAN_OR_EQUAL_TO;
    case "<":
      return ComparisonNames.LESS_THAN;
    case ">=":
      return ComparisonNames.MORE_THAN_OR_EQUAL_TO;
    case ">":
      return ComparisonNames.MORE_THAN;
    default:
      return null;
  }
}

function getBinaryOperationName(token: string): BinaryOperationNames | null {
  switch (token) {
    case "+":
      return BinaryOperationNames.ADD;
    case "-":
      return BinaryOperationNames.SUBTRACT;
    case "*":
      return BinaryOperationNames.MULTIPLY;
    case "/":
      return BinaryOperationNames.DIVIDE;
    default:
      return null;
  }
}
