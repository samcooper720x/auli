import { testSource1, testTokens1 } from "./resources/test-data";
import { tokeniser } from "./tokeniser";

describe("tokeniser", () => {
  it("takes a source string and returns a token array", () => {
    expect(tokeniser(testSource1)).toStrictEqual(testTokens1);
  });

  it("throws a syntax error on unrecognised tokens", () => {
    const unrecognisedToken = "(+ 3 (x 2 2))";
    expect(() => tokeniser(unrecognisedToken)).toThrowError(
      SyntaxError("Unrecognised token: x")
    );
  });
});
