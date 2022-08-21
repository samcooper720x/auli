import {
  Expression,
  LiteralType,
  ExpressionType,
  Token,
  TokenType,
  BinaryOperationNames,
  UnaryOperation,
  UnaryOperationNames,
  TernaryOperationNames,
  Definition,
  Begin,
} from "./types";

// Basic math only
export const testSource1 = "(+ 2 (- (/ 800 10) (* 0.4 100)))";

export const testTokens1: Token[] = [
  { type: TokenType.OPEN_PAREN, token: "(" },
  { type: TokenType.SYMBOL, token: "+" },
  { type: TokenType.NUMBER, token: "2" },
  { type: TokenType.OPEN_PAREN, token: "(" },
  { type: TokenType.SYMBOL, token: "-" },
  { type: TokenType.OPEN_PAREN, token: "(" },
  { type: TokenType.SYMBOL, token: "/" },
  { type: TokenType.NUMBER, token: "800" },
  { type: TokenType.NUMBER, token: "10" },
  { type: TokenType.CLOSE_PAREN, token: ")" },
  { type: TokenType.OPEN_PAREN, token: "(" },
  { type: TokenType.SYMBOL, token: "*" },
  { type: TokenType.NUMBER, token: "0.4" },
  { type: TokenType.NUMBER, token: "100" },
  { type: TokenType.CLOSE_PAREN, token: ")" },
  { type: TokenType.CLOSE_PAREN, token: ")" },
  { type: TokenType.CLOSE_PAREN, token: ")" },
];

export const testAst1: Expression = {
  type: ExpressionType.BINARY_OPERATION,
  name: BinaryOperationNames.ADD,
  params: [
    { type: LiteralType.NUMBER_LITERAL, value: "2" },
    {
      type: ExpressionType.BINARY_OPERATION,
      name: BinaryOperationNames.SUBTRACT,
      params: [
        {
          type: ExpressionType.BINARY_OPERATION,
          name: BinaryOperationNames.DIVIDE,
          params: [
            { type: LiteralType.NUMBER_LITERAL, value: "800" },
            { type: LiteralType.NUMBER_LITERAL, value: "10" },
          ],
        },
        {
          type: ExpressionType.BINARY_OPERATION,
          name: BinaryOperationNames.MULTIPLY,
          params: [
            { type: LiteralType.NUMBER_LITERAL, value: "0.4" },
            { type: LiteralType.NUMBER_LITERAL, value: "100" },
          ],
        },
      ],
    },
  ],
};

export const testResolution1 = 42;

// With conditionals
export const testSource2 = "(if (= 1 2) 7 (if (= 3 3 ) 42 77))";

export const testTokens2: Token[] = [
  { type: TokenType.OPEN_PAREN, token: "(" },
  { type: TokenType.SYMBOL, token: "if" },
  { type: TokenType.OPEN_PAREN, token: "(" },
  { type: TokenType.SYMBOL, token: "=" },
  { type: TokenType.NUMBER, token: "1" },
  { type: TokenType.NUMBER, token: "2" },
  { type: TokenType.CLOSE_PAREN, token: ")" },
  { type: TokenType.NUMBER, token: "7" },
  { type: TokenType.OPEN_PAREN, token: "(" },
  { type: TokenType.SYMBOL, token: "if" },
  { type: TokenType.OPEN_PAREN, token: "(" },
  { type: TokenType.SYMBOL, token: "=" },
  { type: TokenType.NUMBER, token: "3" },
  { type: TokenType.NUMBER, token: "3" },
  { type: TokenType.CLOSE_PAREN, token: ")" },
  { type: TokenType.NUMBER, token: "42" },
  { type: TokenType.NUMBER, token: "77" },
  { type: TokenType.CLOSE_PAREN, token: ")" },
  { type: TokenType.CLOSE_PAREN, token: ")" },
];

export const testAst2: Expression = {
  type: ExpressionType.TERNARY_OPERATION,
  name: TernaryOperationNames.IF,
  params: [
    {
      type: ExpressionType.BINARY_OPERATION,
      name: BinaryOperationNames.EQUAL,
      params: [
        { type: LiteralType.NUMBER_LITERAL, value: "1" },
        { type: LiteralType.NUMBER_LITERAL, value: "2" },
      ],
    },
    { type: LiteralType.NUMBER_LITERAL, value: "7" },

    {
      type: ExpressionType.TERNARY_OPERATION,
      name: TernaryOperationNames.IF,
      params: [
        {
          type: ExpressionType.BINARY_OPERATION,
          name: BinaryOperationNames.EQUAL,
          params: [
            { type: LiteralType.NUMBER_LITERAL, value: "3" },
            { type: LiteralType.NUMBER_LITERAL, value: "3" },
          ],
        },
        { type: LiteralType.NUMBER_LITERAL, value: "42" },
        { type: LiteralType.NUMBER_LITERAL, value: "77" },
      ],
    },
  ],
};

export const testResolution2 = 42;

// String literals
export const testSource3 = "(print 'hello world')";

export const testTokens3: Token[] = [
  { type: TokenType.OPEN_PAREN, token: "(" },
  { type: TokenType.SYMBOL, token: "print" },
  { type: TokenType.QUOTE, token: "'" },
  { type: TokenType.STRING, token: "hello" },
  { type: TokenType.STRING, token: "world" },
  { type: TokenType.QUOTE, token: "'" },
  { type: TokenType.CLOSE_PAREN, token: ")" },
];

export const testAst3: UnaryOperation = {
  type: ExpressionType.UNARY_OPERATION,
  name: UnaryOperationNames.PRINT,
  param: {
    type: LiteralType.STRING_LITERAL,
    value: "hello world",
  },
};

export const testResolution3 = undefined;

// Define and reference a variable
export const testSource4 = "(begin (define mOfL 42) (* 10 mOfL))";

export const testTokens4: Token[] = [
  { type: TokenType.OPEN_PAREN, token: "(" },
  { type: TokenType.BEGIN, token: "begin" },
  { type: TokenType.OPEN_PAREN, token: "(" },
  { type: TokenType.DEFINE, token: "define" },
  { type: TokenType.STRING, token: "mOfL" },
  { type: TokenType.NUMBER, token: "42" },
  { type: TokenType.CLOSE_PAREN, token: ")" },
  { type: TokenType.OPEN_PAREN, token: "(" },
  { type: TokenType.SYMBOL, token: "*" },
  { type: TokenType.NUMBER, token: "10" },
  { type: TokenType.STRING, token: "mOfL" },
  { type: TokenType.CLOSE_PAREN, token: ")" },
  { type: TokenType.CLOSE_PAREN, token: ")" },
];

export const testAst4: Begin = {
  type: ExpressionType.BEGIN,
  expressions: [
    {
      type: ExpressionType.DEFINITION,
      boundName: "mOfL",
      boundValue: { type: LiteralType.NUMBER_LITERAL, value: "42" },
    },
    {
      type: ExpressionType.BINARY_OPERATION,
      name: BinaryOperationNames.MULTIPLY,
      params: [
        { type: LiteralType.NUMBER_LITERAL, value: "10" },
        { type: LiteralType.VARIABLE_REFERENCE, value: "mOfL" },
      ],
    },
  ],
};

export const testResolution4 = undefined;

// Define a function
export const testSource5 = "(define add (lambda (x y) (+ x y)))";

// TODO

// All binary operations
export const testBinaryOperationsSources = [
  "(+ 1 2)",
  "(- 1 2)",
  "(* 1 2)",
  "(/ 1 2)",
  "(= 1 2)",
  "(/= 1 2)",
  "(<= 1 2)",
  "(< 1 2)",
  "(>= 1 2)",
  "(> 1 2)",
  "(max 1 2)",
  "(min 1 2)",
];

export const testBinaryOperationsTokens: Token[][] = [
  [
    { type: TokenType.OPEN_PAREN, token: "(" },
    { type: TokenType.SYMBOL, token: "+" },
    { type: TokenType.NUMBER, token: "1" },
    { type: TokenType.NUMBER, token: "2" },
    { type: TokenType.CLOSE_PAREN, token: ")" },
  ],
  [
    { type: TokenType.OPEN_PAREN, token: "(" },
    { type: TokenType.SYMBOL, token: "-" },
    { type: TokenType.NUMBER, token: "1" },
    { type: TokenType.NUMBER, token: "2" },
    { type: TokenType.CLOSE_PAREN, token: ")" },
  ],
  [
    { type: TokenType.OPEN_PAREN, token: "(" },
    { type: TokenType.SYMBOL, token: "*" },
    { type: TokenType.NUMBER, token: "1" },
    { type: TokenType.NUMBER, token: "2" },
    { type: TokenType.CLOSE_PAREN, token: ")" },
  ],
  [
    { type: TokenType.OPEN_PAREN, token: "(" },
    { type: TokenType.SYMBOL, token: "/" },
    { type: TokenType.NUMBER, token: "1" },
    { type: TokenType.NUMBER, token: "2" },
    { type: TokenType.CLOSE_PAREN, token: ")" },
  ],
  [
    { type: TokenType.OPEN_PAREN, token: "(" },
    { type: TokenType.SYMBOL, token: "=" },
    { type: TokenType.NUMBER, token: "1" },
    { type: TokenType.NUMBER, token: "2" },
    { type: TokenType.CLOSE_PAREN, token: ")" },
  ],
  [
    { type: TokenType.OPEN_PAREN, token: "(" },
    { type: TokenType.SYMBOL, token: "/=" },
    { type: TokenType.NUMBER, token: "1" },
    { type: TokenType.NUMBER, token: "2" },
    { type: TokenType.CLOSE_PAREN, token: ")" },
  ],
  [
    { type: TokenType.OPEN_PAREN, token: "(" },
    { type: TokenType.SYMBOL, token: "<=" },
    { type: TokenType.NUMBER, token: "1" },
    { type: TokenType.NUMBER, token: "2" },
    { type: TokenType.CLOSE_PAREN, token: ")" },
  ],
  [
    { type: TokenType.OPEN_PAREN, token: "(" },
    { type: TokenType.SYMBOL, token: "<" },
    { type: TokenType.NUMBER, token: "1" },
    { type: TokenType.NUMBER, token: "2" },
    { type: TokenType.CLOSE_PAREN, token: ")" },
  ],
  [
    { type: TokenType.OPEN_PAREN, token: "(" },
    { type: TokenType.SYMBOL, token: ">=" },
    { type: TokenType.NUMBER, token: "1" },
    { type: TokenType.NUMBER, token: "2" },
    { type: TokenType.CLOSE_PAREN, token: ")" },
  ],
  [
    { type: TokenType.OPEN_PAREN, token: "(" },
    { type: TokenType.SYMBOL, token: ">" },
    { type: TokenType.NUMBER, token: "1" },
    { type: TokenType.NUMBER, token: "2" },
    { type: TokenType.CLOSE_PAREN, token: ")" },
  ],
  [
    { type: TokenType.OPEN_PAREN, token: "(" },
    { type: TokenType.SYMBOL, token: "max" },
    { type: TokenType.NUMBER, token: "1" },
    { type: TokenType.NUMBER, token: "2" },
    { type: TokenType.CLOSE_PAREN, token: ")" },
  ],
  [
    { type: TokenType.OPEN_PAREN, token: "(" },
    { type: TokenType.SYMBOL, token: "min" },
    { type: TokenType.NUMBER, token: "1" },
    { type: TokenType.NUMBER, token: "2" },
    { type: TokenType.CLOSE_PAREN, token: ")" },
  ],
];

export const testBinaryOperationsAsts: Expression[] = [
  {
    type: ExpressionType.BINARY_OPERATION,
    name: BinaryOperationNames.ADD,
    params: [
      { type: LiteralType.NUMBER_LITERAL, value: "1" },
      { type: LiteralType.NUMBER_LITERAL, value: "2" },
    ],
  },
  {
    type: ExpressionType.BINARY_OPERATION,
    name: BinaryOperationNames.SUBTRACT,
    params: [
      { type: LiteralType.NUMBER_LITERAL, value: "1" },
      { type: LiteralType.NUMBER_LITERAL, value: "2" },
    ],
  },
  {
    type: ExpressionType.BINARY_OPERATION,
    name: BinaryOperationNames.MULTIPLY,
    params: [
      { type: LiteralType.NUMBER_LITERAL, value: "1" },
      { type: LiteralType.NUMBER_LITERAL, value: "2" },
    ],
  },
  {
    type: ExpressionType.BINARY_OPERATION,
    name: BinaryOperationNames.DIVIDE,
    params: [
      { type: LiteralType.NUMBER_LITERAL, value: "1" },
      { type: LiteralType.NUMBER_LITERAL, value: "2" },
    ],
  },
  {
    type: ExpressionType.BINARY_OPERATION,
    name: BinaryOperationNames.EQUAL,
    params: [
      { type: LiteralType.NUMBER_LITERAL, value: "1" },
      { type: LiteralType.NUMBER_LITERAL, value: "2" },
    ],
  },
  {
    type: ExpressionType.BINARY_OPERATION,
    name: BinaryOperationNames.NOT_EQUAL,
    params: [
      { type: LiteralType.NUMBER_LITERAL, value: "1" },
      { type: LiteralType.NUMBER_LITERAL, value: "2" },
    ],
  },
  {
    type: ExpressionType.BINARY_OPERATION,
    name: BinaryOperationNames.LESS_THAN_OR_EQUAL_TO,
    params: [
      { type: LiteralType.NUMBER_LITERAL, value: "1" },
      { type: LiteralType.NUMBER_LITERAL, value: "2" },
    ],
  },
  {
    type: ExpressionType.BINARY_OPERATION,
    name: BinaryOperationNames.LESS_THAN,
    params: [
      { type: LiteralType.NUMBER_LITERAL, value: "1" },
      { type: LiteralType.NUMBER_LITERAL, value: "2" },
    ],
  },
  {
    type: ExpressionType.BINARY_OPERATION,
    name: BinaryOperationNames.MORE_THAN_OR_EQUAL_TO,
    params: [
      { type: LiteralType.NUMBER_LITERAL, value: "1" },
      { type: LiteralType.NUMBER_LITERAL, value: "2" },
    ],
  },
  {
    type: ExpressionType.BINARY_OPERATION,
    name: BinaryOperationNames.MORE_THAN,
    params: [
      { type: LiteralType.NUMBER_LITERAL, value: "1" },
      { type: LiteralType.NUMBER_LITERAL, value: "2" },
    ],
  },
  {
    type: ExpressionType.BINARY_OPERATION,
    name: BinaryOperationNames.MAX,
    params: [
      { type: LiteralType.NUMBER_LITERAL, value: "1" },
      { type: LiteralType.NUMBER_LITERAL, value: "2" },
    ],
  },
  {
    type: ExpressionType.BINARY_OPERATION,
    name: BinaryOperationNames.MIN,
    params: [
      { type: LiteralType.NUMBER_LITERAL, value: "1" },
      { type: LiteralType.NUMBER_LITERAL, value: "2" },
    ],
  },
];

export const testBinaryOperationsResolutions: (number | boolean)[] = [
  3,
  -1,
  2,
  0.5,
  false,
  true,
  true,
  true,
  false,
  false,
  2,
  1,
];
