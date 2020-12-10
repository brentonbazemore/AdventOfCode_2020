import * as fs from 'fs';

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const data: string[] = rawData.split('\n');

const sorted = data.sort((a, b) => +a - +b).map(s => +s);
const expectedEnd = sorted[sorted.length - 1];

const plugs = [0, ...sorted, expectedEnd + 3];
const memo = new Map();
const findNext = (curIndex: number) => {
  if (memo.has(curIndex)) {
    return memo.get(curIndex);
  }
  const currentJolts = plugs[curIndex];

  let validLeaves = 0;
  for (let i = 1; i <= 3; i++) {
    const nextJolts = plugs[curIndex + i];

    if (nextJolts - currentJolts <= 3) {
      if (nextJolts === expectedEnd + 3) {
        validLeaves++;
        continue;
      }

      const out = findNext(curIndex + i);
      validLeaves += out;
    }
  }

  memo.set(curIndex, validLeaves);

  return validLeaves;
};

const count = findNext(0);
console.log({ count });