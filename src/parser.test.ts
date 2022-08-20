import { parser } from "./parser";
import {
  testAst1,
  testAst2,
  testTokens2,
  testTokens1,
} from "./resources/test-data";
import { TokenType } from "./resources/types";

describe("parser", () => {
  describe("happy paths", () => {
    it("takes a token array with simple math and returns an ast", () => {
      expect(parser(testTokens1)).toStrictEqual(testAst1);
    });

    it("takes a token array with a conditional and returns an ast", () => {
      expect(parser(testTokens2)).toStrictEqual(testAst2);
    });
  });

  describe("error paths", () => {
    it("throws a syntax error there is a malformed opening expression", () => {
      const missingOpenParen = [
        { type: TokenType.SYMBOL, token: "+" },
        { type: TokenType.NUMBER, token: "2" },
        { type: TokenType.NUMBER, token: "2" },
        { type: TokenType.CLOSE_PAREN, token: ")" },
      ];
      const missingOperator = [
        { type: TokenType.OPEN_PAREN, token: "(" },
        { type: TokenType.NUMBER, token: "2" },
        { type: TokenType.NUMBER, token: "2" },
        { type: TokenType.CLOSE_PAREN, token: ")" },
      ];

      expect(() => parser(missingOpenParen)).toThrowError(
        SyntaxError("No initial call expression found.")
      );
      expect(() => parser(missingOperator)).toThrowError(
        SyntaxError("Missing operator in call expression.")
      );
    });

    it("throws a syntax error there is no operator for a nested call expression", () => {
      const missingOperator = [
        { type: TokenType.OPEN_PAREN, token: "(" },
        { type: TokenType.SYMBOL, token: "+" },
        { type: TokenType.NUMBER, token: "3" },
        { type: TokenType.OPEN_PAREN, token: "(" },
        { type: TokenType.NUMBER, token: "2" },
        { type: TokenType.NUMBER, token: "2" },
        { type: TokenType.CLOSE_PAREN, token: ")" },
        { type: TokenType.CLOSE_PAREN, token: ")" },
      ];

      expect(() => parser(missingOperator)).toThrowError(
        SyntaxError("Missing operator in call expression.")
      );
    });

    it("throws an error on unhandled tokens", () => {
      const unhandledToken = [
        { type: TokenType.OPEN_PAREN, token: "(" },
        { type: TokenType.SYMBOL, token: "+" },
        { type: TokenType.NUMBER, token: "2" },
        { type: TokenType.UNHANDLED, token: "'2'" },
        { type: TokenType.CLOSE_PAREN, token: ")" },
      ];

      expect(() => parser(unhandledToken)).toThrowError(
        Error("Unhandled token: '2'")
      );
    });

    it("throws an error if parens are not balanced", () => {
      const unhandledToken = [
        { type: TokenType.OPEN_PAREN, token: "(" },
        { type: TokenType.SYMBOL, token: "+" },
        { type: TokenType.NUMBER, token: "2" },
        { type: TokenType.NUMBER, token: "2" },
      ];

      expect(() => parser(unhandledToken)).toThrowError(
        SyntaxError("Unexpected eof.")
      );
    });
  });
});
