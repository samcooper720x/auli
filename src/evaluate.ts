import {
  BinaryOperation,
  ExpressionParam,
  LiteralType,
} from "./resources/types";

export function evaluate(param: ExpressionParam): number {
  if (param.type === LiteralType.NUMBER_LITERAL) {
    return parseFloat(param.value);
  }

  const args = param.params.map((x) => evaluate(x));

  const [fstArg, sndArg] = args;

  return evaluateBinaryOperator(param.name, [fstArg, sndArg]);
}

function evaluateBinaryOperator(
  operator: BinaryOperation,
  [fst, snd]: [number, number]
): number {
  if (operator === BinaryOperation.ADD) return fst + snd;
  if (operator === BinaryOperation.SUBTRACT) return fst - snd;
  if (operator === BinaryOperation.MULTIPLY) return fst * snd;
  if (operator === BinaryOperation.DIVIDE) return fst / snd;

  throw new Error(`Unable to evaluate binary operation ${operator}.`);
}
