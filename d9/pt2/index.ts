import * as fs from 'fs';

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const data: string[] = rawData.split('\n');

const INVALID_NUMBER = 10884537;

for (let i = 0; i < data.length; i++) {
  let sum = 0;
  let j = i;
  const usedNums = [];
  while (sum < INVALID_NUMBER) {
    sum += +data[j];
    usedNums.push(+data[j]);
    if (sum === INVALID_NUMBER && j !== i) {
      const max = Math.max(...usedNums);
      const min = Math.min(...usedNums);
      console.log(min, max, min + max);
      throw new Error('Finished.');
    }
    j++;
  }
}