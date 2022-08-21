import { BinaryOperationNames, UnaryOperationNames } from "./types";

export const standardLibrary = new Map();

standardLibrary.set(UnaryOperationNames.PRINT, (x: string) => console.log(x));
standardLibrary.set(BinaryOperationNames.ADD, (x: number, y: number) => x + y);
standardLibrary.set(
  BinaryOperationNames.SUBTRACT,
  (x: number, y: number) => x - y
);
standardLibrary.set(
  BinaryOperationNames.MULTIPLY,
  (x: number, y: number) => x * y
);
standardLibrary.set(
  BinaryOperationNames.DIVIDE,
  (x: number, y: number) => x / y
);
standardLibrary.set(
  BinaryOperationNames.EQUAL,
  (x: number, y: number) => x === y
);
standardLibrary.set(
  BinaryOperationNames.NOT_EQUAL,
  (x: number, y: number) => x !== y
);
standardLibrary.set(
  BinaryOperationNames.LESS_THAN_OR_EQUAL_TO,
  (x: number, y: number) => x <= y
);
standardLibrary.set(
  BinaryOperationNames.LESS_THAN,
  (x: number, y: number) => x < y
);
standardLibrary.set(
  BinaryOperationNames.MORE_THAN_OR_EQUAL_TO,
  (x: number, y: number) => x >= y
);
standardLibrary.set(
  BinaryOperationNames.MORE_THAN,
  (x: number, y: number) => x > y
);
standardLibrary.set(BinaryOperationNames.MAX, (x: number, y: number) =>
  Math.max(x, y)
);
standardLibrary.set(BinaryOperationNames.MIN, (x: number, y: number) =>
  Math.min(x, y)
);
