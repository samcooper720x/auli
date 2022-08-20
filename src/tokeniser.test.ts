import {
  testSource1,
  testTokens1,
  testSource2,
  testTokens2,
  testComparisonsSources,
  testComparisonTokens,
} from "./resources/test-data";
import { tokeniser } from "./tokeniser";

describe("tokeniser", () => {
  describe("happy paths", () => {
    it("takes a source string of basic math and returns a token array", () => {
      expect(tokeniser(testSource1)).toStrictEqual(testTokens1);
    });

    it("takes a source string with a conditional and returns a token array", () => {
      expect(tokeniser(testSource2)).toStrictEqual(testTokens2);
    });

    it("tokenises all comparison tokens", () => {
      for (const [i, source] of testComparisonsSources.entries()) {
        expect(tokeniser(source)).toStrictEqual(testComparisonTokens[i]);
      }
    });
  });

  describe("error paths", () => {
    it("throws a syntax error on unrecognised tokens", () => {
      const unrecognisedToken = "(+ 3 (x 2 2))";
      expect(() => tokeniser(unrecognisedToken)).toThrowError(
        SyntaxError("Unrecognised token: x")
      );
    });
  });
});
