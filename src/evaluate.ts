import {
  BinaryOperationNames,
  PredicateNames,
  ExpressionParam,
  ExpressionType,
  LiteralType,
  UnaryOperationNames,
} from "./resources/types";

export function evaluate(
  node: ExpressionParam
): boolean | number | string | void {
  if (node.type === LiteralType.NUMBER_LITERAL) {
    return parseFloat(node.value);
  }

  if (node.type === LiteralType.STRING_LITERAL) {
    return node.value;
  }

  if (node.type === ExpressionType.TERNARY_OPERATION) {
    const [predicate, consequence, alternative] = node.params;

    return evaluate(predicate) ? evaluate(consequence) : evaluate(alternative);
  }

  if (node.type === ExpressionType.UNARY_OPERATION) {
    const arg = evaluate(node.param);

    if (typeof arg !== "string") {
      throw new Error(
        `Can't evaluate expression ${node.name} with arg ${node.param}.`
      );
    }

    return evaluateUnaryOperator(node.name, arg);
  }

  const args = node.params.map((x: ExpressionParam) => evaluate(x));

  const [fst, snd] = args;

  if (typeof fst !== "number" || typeof snd !== "number") {
    throw new Error(
      `Can't evaluate expression ${node.name} with args [${fst}, ${snd}].`
    );
  }

  if (node.type === ExpressionType.PREDICATE) {
    return evaluatePredicate(node.name, [fst, snd]);
  }

  if (node.type === ExpressionType.BINARY_OPERATION) {
    return evaluateBinaryOperator(node.name, [fst, snd]);
  }

  throw new Error(`Unhandled expression ${node}.`);
}

function evaluateUnaryOperator(
  operator: UnaryOperationNames,
  param: string
): void {
  if (operator === UnaryOperationNames.PRINT) {
    console.log(param);
  }
}

// TODO: handle these as binary operations instead
function evaluatePredicate(
  operator: PredicateNames,
  [fst, snd]: [number, number]
): boolean {
  if (operator === PredicateNames.EQUAL) {
    return fst === snd;
  }
  if (operator === PredicateNames.NOT_EQUAL) {
    return fst !== snd;
  }
  if (operator === PredicateNames.LESS_THAN_OR_EQUAL_TO) {
    return fst <= snd;
  }
  if (operator === PredicateNames.LESS_THAN) {
    return fst < snd;
  }
  if (operator === PredicateNames.MORE_THAN_OR_EQUAL_TO) {
    return fst >= snd;
  }
  if (operator === PredicateNames.MORE_THAN) {
    return fst > snd;
  }

  throw new Error(`Unable to evaluate predicate ${operator}.`);
}

function evaluateBinaryOperator(
  operator: BinaryOperationNames,
  [fst, snd]: [number, number]
): number {
  if (operator === BinaryOperationNames.ADD) {
    return fst + snd;
  }
  if (operator === BinaryOperationNames.SUBTRACT) {
    return fst - snd;
  }
  if (operator === BinaryOperationNames.MULTIPLY) {
    return fst * snd;
  }
  if (operator === BinaryOperationNames.DIVIDE) {
    return fst / snd;
  }

  throw new Error(`Unable to evaluate binary operation ${operator}.`);
}
