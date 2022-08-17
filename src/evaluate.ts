import {
  CallExpressionType,
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
  operator: CallExpressionType,
  [fst, snd]: [number, number]
): number {
  if (operator === CallExpressionType.ADD) return fst + snd;
  if (operator === CallExpressionType.SUBTRACT) return fst - snd;
  if (operator === CallExpressionType.MULTIPLY) return fst * snd;
  if (operator === CallExpressionType.DIVIDE) return fst / snd;

  throw new Error(`Unable to evaluate binary operation ${operator}.`);
}
