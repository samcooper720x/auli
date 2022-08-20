import { BinaryOperationNames } from "./types";

export const stdLib = new Map();

stdLib.set(BinaryOperationNames.ADD, (x: number, y: number) => x + y);
stdLib.set(BinaryOperationNames.SUBTRACT, (x: number, y: number) => x - y);
stdLib.set(BinaryOperationNames.MULTIPLY, (x: number, y: number) => x * y);
stdLib.set(BinaryOperationNames.DIVIDE, (x: number, y: number) => x / y);
stdLib.set(BinaryOperationNames.EQUAL, (x: number, y: number) => x === y);
stdLib.set(BinaryOperationNames.NOT_EQUAL, (x: number, y: number) => x !== y);
stdLib.set(
  BinaryOperationNames.LESS_THAN_OR_EQUAL_TO,
  (x: number, y: number) => x <= y
);
stdLib.set(BinaryOperationNames.LESS_THAN, (x: number, y: number) => x < y);
stdLib.set(
  BinaryOperationNames.MORE_THAN_OR_EQUAL_TO,
  (x: number, y: number) => x >= y
);
stdLib.set(BinaryOperationNames.MORE_THAN, (x: number, y: number) => x > y);
