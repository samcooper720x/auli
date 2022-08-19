import { evaluate } from "./evaluate";
import { testAst1, testResolution1 } from "./resources/test-data";

describe("evaluate", () => {
  it("evaluates a simple mathematical expression", () => {
    expect(evaluate(testAst1)).toStrictEqual(testResolution1);
  });
});
