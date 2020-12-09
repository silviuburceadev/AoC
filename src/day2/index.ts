import fs from "fs";
import * as util from "util";

const readFile = util.promisify(fs.readFile);

class Entry {
  public min: number;
  public max: number;
  public char: string;
  public password: string;

  // entry looks like 1-3 a: acdbadb
  public constructor(entry: string) {
    const match = entry.match(/(\d+)-(\d+) (\w): (\w+)/);
    if (!match) throw new Error(`Couldn't parse ${entry}`);
    this.min = parseInt(match[1], 10);
    this.max = parseInt(match[2], 10);
    this.char = match[3];
    this.password = match[4];
  }

  public isValid1() {
    const hits = this.password.split("").filter((c) => c === this.char).length;
    return this.min <= hits && hits <= this.max;
  }

  public isValid2() {
    const hits = this.password
      .split("")
      .filter((val, index) => val == this.char && (index + 1 === this.min || index + 1 === this.max));
    return hits.length === 1;
  }
}

(async () => {
  const input = await readFile(__dirname + "/input1.txt", { encoding: "utf8" });
  const entries: Entry[] = input.split(/\r?\n/).map((x) => new Entry(x));
  console.log(entries.filter((e) => e.isValid1()).length);
  console.log(entries.filter((e) => e.isValid2()).length);
})();
