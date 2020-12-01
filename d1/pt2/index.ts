import * as fs from 'fs';

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const data: string[] = rawData.split('\n');

const set = new Set();

data.some((num) => {
  const expectedPair = 2020 - +num;
  if (set.has(expectedPair)) {
    console.log(num, expectedPair, +num * expectedPair);
    return true;
  } else {
    set.add(+num);
  }

  return false;
});