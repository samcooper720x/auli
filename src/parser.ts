import {
  Expression,
  ExpressionParam,
  LiteralType,
  ExpressionType,
  Token,
  TokenType,
  BinaryOperationNames,
  UnaryOperationNames,
  TernaryOperationNames,
  StringLiteral,
} from "./resources/types";

export function parser(tokens: Token[]): Expression {
  const [fstToken, ...restTokens] = tokens;

  if (fstToken && fstToken.type !== TokenType.OPEN_PAREN) {
    throw new SyntaxError("No initial call expression found.");
  }

  const res = parseExpression(restTokens);

  return res.callExpression;
}

function parseExpression(tokens: Token[]): {
  callExpression: Expression;
  remainingTokens: Token[];
} {
  const [operatorToken, ...restTokens] = tokens;

  if (operatorToken.type === TokenType.DEFINE) {
    const [nameToken, ...restRest] = restTokens;

    const res = parseTokens(restRest);

    // For the sake of the type checker...
    if (!("params" in res)) {
      throw new Error();
    }

    return {
      callExpression: {
        type: ExpressionType.DEFINITION,
        boundName: nameToken.token,
        boundValue: res.params[0],
      },
      remainingTokens: res.remainingTokens,
    };
  }

  if (operatorToken.type !== TokenType.SYMBOL) {
    throw new SyntaxError("Missing operator in call expression.");
  }

  const res = parseTokens(restTokens);

  // For the sake of the type checker...
  if (!("params" in res)) {
    throw new Error();
  }

  if (operatorToken.token === "begin") {
    return {};
  }

  const unaryOperationName = getUnaryOperationName(operatorToken.token);

  if (unaryOperationName) {
    return {
      callExpression: {
        type: ExpressionType.UNARY_OPERATION,
        name: UnaryOperationNames.PRINT,
        param: res.params[0],
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

  const ternaryOperationName = getTernaryOperationName(operatorToken.token);

  if (ternaryOperationName) {
    return {
      callExpression: {
        type: ExpressionType.TERNARY_OPERATION,
        name: ternaryOperationName,
        params: res.params,
      },
      remainingTokens: res.remainingTokens,
    };
  }

  throw new SyntaxError(`Unknown operator: ${operatorToken.token}.`);
}

interface ParseString {
  (tokens: Token[], stringInProgress: string[]): ParseString;
}

function parseString(
  [token, ...restTokens]: Token[],
  stringInProgress = ""
):
  | ParseString
  | {
      stringLiteral: StringLiteral;
      remainingTokens: Token[];
    } {
  if (!token) {
    throw new Error("Unexpected eof.");
  }

  if (token.type === TokenType.QUOTE) {
    return {
      stringLiteral: {
        type: LiteralType.STRING_LITERAL,
        value: stringInProgress,
      },
      remainingTokens: restTokens,
    };
  }

  const updatedStringInProgress = stringInProgress
    ? `${stringInProgress} ${token.token}`
    : token.token;

  return parseString(restTokens, updatedStringInProgress);
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
  const [token, ...restTokens] = tokens;

  if (!token) {
    throw new Error("Unexpected eof.");
  }

  if (token.type === TokenType.NUMBER) {
    return parseTokens(restTokens, [
      ...params,
      {
        type: LiteralType.NUMBER_LITERAL,
        value: token.token,
      },
    ]);
  }

  if (token.type === TokenType.QUOTE) {
    const res = parseString(restTokens);

    // For the sake of the type checker...
    if (!("stringLiteral" in res)) {
      throw new Error();
    }

    return parseTokens(res.remainingTokens, [...params, res.stringLiteral]);
  }

  if (token.type === TokenType.OPEN_PAREN) {
    const res = parseExpression(restTokens);

    return parseTokens(res.remainingTokens, [...params, res.callExpression]);
  }

  if (token.type === TokenType.CLOSE_PAREN) {
    return { params: params, remainingTokens: restTokens };
  }

  throw new Error(`Unhandled token: ${token.token}`);
}

function getUnaryOperationName(token: string): UnaryOperationNames | null {
  switch (token) {
    case "print":
      return UnaryOperationNames.PRINT;
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
    case "=":
      return BinaryOperationNames.EQUAL;
    case "/=":
      return BinaryOperationNames.NOT_EQUAL;
    case "<=":
      return BinaryOperationNames.LESS_THAN_OR_EQUAL_TO;
    case "<":
      return BinaryOperationNames.LESS_THAN;
    case ">=":
      return BinaryOperationNames.MORE_THAN_OR_EQUAL_TO;
    case ">":
      return BinaryOperationNames.MORE_THAN;
    case "max":
      return BinaryOperationNames.MAX;
    case "min":
      return BinaryOperationNames.MIN;
    default:
      return null;
  }
}

function getTernaryOperationName(token: string): TernaryOperationNames | null {
  switch (token) {
    case "if":
      return TernaryOperationNames.IF;
    default:
      return null;
  }
}
