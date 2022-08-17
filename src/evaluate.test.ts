import { evaluate } from "./evaluate";
import { testAstA, testResolutionA } from "./resources/test-data";

describe("evaluate", () => {
  it("evaluates a simple mathematical expression", () => {
    expect(evaluate(testAstA)).toStrictEqual(testResolutionA);
  });
});
