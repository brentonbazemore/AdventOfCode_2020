import * as fs from 'fs';

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const data: string[] = rawData.split('\n\n');

let totalCount = 0;
data.forEach((group) => {
  const g = group.replace(/\n/g, '');
  const set = new Set(g);
  const count = set.size;

  totalCount += count;
});

console.log(totalCount);