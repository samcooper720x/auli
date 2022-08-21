import { evaluate } from "./evaluate";
import {
  testAst1,
  testAst2,
  testAst3,
  testAst4,
  testBinaryOperationsAsts,
  testBinaryOperationsResolutions,
  testResolution1,
  testResolution2,
  testResolution3,
  testResolution4,
} from "./resources/test-data";

beforeAll(() => {
  jest.clearAllMocks();
});

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

    it("evaluates an expression with a definition", () => {
      expect(evaluate(testAst4)).toStrictEqual(testResolution4);
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
