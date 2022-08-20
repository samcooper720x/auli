import {
  testSource1,
  testTokens1,
  testSource2,
  testTokens2,
} from "./resources/test-data";
import { tokeniser } from "./tokeniser";

describe("tokeniser", () => {
  describe("happy paths", () => {
    it("takes a source string of basic math and returns a token array", () => {
      expect(tokeniser(testSource1)).toStrictEqual(testTokens1);
    });

    it("takes a source string with a conditonal and returns a token array", () => {
      expect(tokeniser(testSource2)).toStrictEqual(testTokens2);
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
