import {
  testSource1,
  testTokens1,
  testSource2,
  testTokens2,
  testSource3,
  testTokens3,
  testBinaryOperationsSources,
  testBinaryOperationsTokens,
} from "./resources/test-data";
import { tokeniser } from "./tokeniser";

describe("tokeniser", () => {
  describe("happy paths", () => {
    it("takes a source string of basic math and returns a token array", () => {
      expect(tokeniser(testSource1)).toStrictEqual(testTokens1);
    });

    it("takes a source string with a predicate and returns a token array", () => {
      expect(tokeniser(testSource2)).toStrictEqual(testTokens2);
    });

    it("takes a source string with containing string literals and returns a token array", () => {
      expect(tokeniser(testSource3)).toStrictEqual(testTokens3);
    });

    it("tokenises all binary operation tokens", () => {
      for (const [i, source] of testBinaryOperationsSources.entries()) {
        expect(tokeniser(source)).toStrictEqual(testBinaryOperationsTokens[i]);
      }
    });
  });
});
