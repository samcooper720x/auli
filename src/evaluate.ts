import { standardLibrary } from "./resources/standard-library";
import {
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

  const standardLibarayFunction = standardLibrary.get(node.name);

  if (standardLibarayFunction === undefined) {
    throw new Error(`Unable to evaluate expression ${node.name}.`);
  }

  if (node.type === ExpressionType.UNARY_OPERATION) {
    const arg = evaluate(node.param);

    if (typeof arg !== "string") {
      throw new Error(
        `Can't evaluate expression ${node.name} with arg ${node.param}.`
      );
    }

    return standardLibarayFunction(arg);
  }

  if (node.type === ExpressionType.BINARY_OPERATION) {
    const args = node.params.map((x: ExpressionParam) => evaluate(x));

    const [fst, snd] = args;

    if (typeof fst !== "number" || typeof snd !== "number") {
      throw new Error(
        `Can't evaluate expression ${node.name} with args [${fst}, ${snd}].`
      );
    }

    return standardLibarayFunction(fst, snd);
  }

  throw new Error(`Unhandled expression ${node}.`);
}
