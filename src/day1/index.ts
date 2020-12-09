import fs from "fs";
import * as util from "util";

const readFile = util.promisify(fs.readFile);

const sumOfTwo = (numbers: number[], target: number) => {
    for (let i = 0; i < numbers.length; i++) {
        const missingNumber = target - numbers[i];
        if (numbers.indexOf(missingNumber, i) > -1) {
            return [numbers[i], missingNumber];
        }
    }
    return [];
}

const sumOfThree = (numbers: number[], target: number) => {
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            const missingNumber = target - numbers[i] - numbers[j];
            if (numbers.indexOf(missingNumber, j) > -1) {
                return [numbers[i], numbers[j], missingNumber];
            }
        }
    }
    return [];
}



(async () => {
    const input = await readFile(__dirname + "/input1.txt", { encoding: "utf8" });
    const numbers = input.split(/\r?\n/).map(x => parseInt(x, 10));
    let twoParts = sumOfTwo(numbers, 2020);
    console.log(twoParts.reduce((prev, curr) => prev * curr, 1));
    let threeParts = sumOfThree(numbers, 2020);
    console.log(threeParts.reduce((prev, curr) => prev * curr, 1));
})();
