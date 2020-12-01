import * as fs from 'fs';

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const data: string[] = rawData.split('\n');

const candidates = [];
// Find candidates
for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data.length; j++) {
    if (j === i) {
      continue;
    }

    const num1 = +data[i];
    const num2 = +data[j];

    if (num1 + num2 > 2020) {
      continue;
    }

    candidates.push({ num1, num2, sum: num1 + num2 });
  }
}

for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < candidates.length; j++) {
    const num1 = +data[i];
    const num2 = candidates[j].sum;

    if (num1 + num2 === 2020) {
      console.log(num1, candidates[j].num1, candidates[j].num2, num1 * candidates[j].num1 * candidates[j].num2);
    }
  }
}
