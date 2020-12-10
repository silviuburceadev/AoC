import fs from "fs";
import * as util from "util";

const readFile = util.promisify(fs.readFile);

// Overloading in TS is difficult
const _find = (numbers: number[], from: number, howMany: number, howMuch: number): number[] => {
  if (howMany === 1) {
    return [numbers.indexOf(howMuch)];
  }
  for (let i = from; i < numbers.length; i++) {
    const indexes = _find(numbers, i + 1, howMany - 1, howMuch - numbers[i]);
    if (indexes.indexOf(-1) === -1) {
      return [i, ...indexes];
    }
  }
  return [-1];
};

export const find = (numbers: number[], howMany: number, howMuch: number): number[] => {
  return _find(numbers, 0, howMany, howMuch).map((i) => numbers[i]);
};

(async () => {
  const input = await readFile(__dirname + "/input.txt", { encoding: "utf8" });
  const numbers = input.split(/\r?\n/).map((x) => parseInt(x, 10));
  const twoParts = find(numbers, 2, 2020);
  console.log(twoParts.reduce((prev, curr) => prev * curr, 1));
  const threeParts = find(numbers, 3, 2020);
  console.log(threeParts.reduce((prev, curr) => prev * curr, 1));
})();
