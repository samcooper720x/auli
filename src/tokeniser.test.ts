import { testSourceA, testTokensA } from "./resources/test-data";
import { tokeniser } from "./tokeniser";

describe("tokeniser", () => {
  it("takes a source string and returns a token array", () => {
    expect(tokeniser(testSourceA)).toStrictEqual(testTokensA);
  });

  it("throws a syntax error on unrecognised tokens", () => {
    const unrecognisedToken = "(+ 3 (x 2 2))";
    expect(() => tokeniser(unrecognisedToken)).toThrowError(
      SyntaxError("Unrecognised token: x")
    );
  });
});
