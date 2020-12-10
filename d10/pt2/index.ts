import * as fs from 'fs';

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const data: string[] = rawData.split('\n');

const sorted = data.sort((a, b) => +a - +b);

let ones = 1;
let threes = 0;

sorted.forEach((s, i) => {
  if (i > sorted.length) {
    return;
  }
  const next = +sorted[i + 1];
  if ((+s - next) === -1) {
    ones++;
  } else {
    threes++;
  }
});

console.log({ ones, threes }, ones * threes)