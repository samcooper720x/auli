import {
  BinaryOperationNames,
  ComparisonNames,
  ExpressionParam,
  ExpressionType,
  LiteralType,
} from "./resources/types";

export function evaluate(node: ExpressionParam): boolean | number {
  if (node.type === LiteralType.NUMBER_LITERAL) {
    return parseFloat(node.value);
  }

  if (node.type === ExpressionType.CONDITIONAL) {
    const [comparison, consequence, alternative] = node.params;

    return evaluate(comparison) ? evaluate(consequence) : evaluate(alternative);
  }

  const args = node.params.map((x) => evaluate(x));

  const [fst, snd] = args;

  if (typeof fst !== "number" || typeof snd !== "number") {
    throw new Error(
      `Can't evaluate expression ${node.name} with args [${fst}, ${snd}].`
    );
  }

  if (node.type === ExpressionType.COMPARISON) {
    return evaluateComparison(node.name, [fst, snd]);
  }

  if (node.type === ExpressionType.BINARY_OPERATION) {
    return evaluateBinaryOperator(node.name, [fst, snd]);
  }

  throw new Error(`Unhandled expression ${node}.`);
}

function evaluateComparison(
  operator: ComparisonNames,
  [fst, snd]: [number, number]
): boolean {
  if (operator === ComparisonNames.EQUALS) {
    return fst === snd;
  }

  throw new Error(`Unable to evaluate comparison ${operator}.`);
}

function evaluateBinaryOperator(
  operator: BinaryOperationNames,
  [fst, snd]: [number, number]
): number {
  if (operator === BinaryOperationNames.ADD) return fst + snd;
  if (operator === BinaryOperationNames.SUBTRACT) return fst - snd;
  if (operator === BinaryOperationNames.MULTIPLY) return fst * snd;
  if (operator === BinaryOperationNames.DIVIDE) return fst / snd;

  throw new Error(`Unable to evaluate binary operation ${operator}.`);
}
