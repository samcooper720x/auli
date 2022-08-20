import { evaluate } from "./evaluate";
import {
  testAst1,
  testAst2,
  testAst3,
  testBinaryOperationsAsts,
  testBinaryOperationsResolutions,
  testPredicateAsts,
  testPredicateResolutions,
  testResolution1,
  testResolution2,
  testResolution3,
} from "./resources/test-data";

describe("evaluate", () => {
  describe("happy paths", () => {
    it("evaluates a simple mathematical expression", () => {
      expect(evaluate(testAst1)).toStrictEqual(testResolution1);
    });

    it("evaluates an expression with a conditional", () => {
      expect(evaluate(testAst2)).toStrictEqual(testResolution2);
    });

    it("evaluates an expression with a string literal", () => {
      expect(evaluate(testAst3)).toStrictEqual(testResolution3);
    });

    it("evaluates all comparisons", () => {
      for (const [i, expression] of testPredicateAsts.entries()) {
        expect(evaluate(expression)).toStrictEqual(testPredicateResolutions[i]);
      }
    });

    it("evaluates all binary operations", () => {
      for (const [i, expression] of testBinaryOperationsAsts.entries()) {
        expect(evaluate(expression)).toStrictEqual(
          testBinaryOperationsResolutions[i]
        );
      }
    });
  });
});
