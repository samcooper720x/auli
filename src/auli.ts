import { readFileSync } from "fs";
import "process";
import { createInterface } from "readline";
import { evaluate } from "./evaluate";
import { parser } from "./parser";
import { tokeniser } from "./tokeniser";

export function tsLisp(args: string[]): void {
  if (args.length > 1) {
    throw Error("Invalid usage.");
  }

  if (args.length === 1) {
    const [path] = args;

    return runFile(path);
  }

  return runPrompt();
}

function runFile(path: string): void {
  const source = readFileSync(path, "utf-8");

  run(source);
}

function runPrompt(): void {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
  });

  readline.prompt();
  readline.on("line", (input) => {
    run(input);
    readline.prompt();
  });
}

function run(source: string): void {
  const tokens = tokeniser(source);
  const ast = parser(tokens);
  const res = evaluate(ast);

  console.log(res.toString());
}

tsLisp(process.argv.slice(2));
