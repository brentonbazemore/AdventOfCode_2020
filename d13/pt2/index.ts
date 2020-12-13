import * as fs from 'fs';

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const data: string[] = rawData.split(',');

const times = data.filter(d => d !== 'x');

const EARLIEST = 1002461;

let lowest = { value: 0, diff: Infinity };
times.forEach((time) => {
  const remainder = EARLIEST % +time;
  const diff = +time - remainder;
  if (diff < lowest.diff) {
    lowest = { value: +time, diff: diff };
  }
});

console.log(lowest, lowest.value * lowest.diff);