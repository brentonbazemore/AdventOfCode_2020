import * as fs from 'fs';

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const data: string[] = rawData.split('\n');

const PREAMBLE = 25;

const combinator = (array: string[]) => {
  const results = [];
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      results.push(+array[i] + +array[j]);
    }
  }

  return results;
}

for (let i = PREAMBLE; i < data.length; i++) {
  const sums = combinator(data.slice(i - PREAMBLE, i));
  if (!sums.includes(+data[i])) {
    console.log(data[i]);
    break;
  }
}