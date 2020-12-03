import * as fs from 'fs';

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const rows: string[] = rawData.split('\n');

const X = 0;
const Y = 1;
const ROW_LENGTH = rows[0].length;

const applySlope = (pos: number[], rise: number, run: number) => {
  const newX = pos[X] + run;
  const newY = pos[Y] + rise;
  const newPos = [newX, newY];

  return newPos;
}

const calculateTreeCount = (rise: number, run: number) => {
  let pos = [0, 0];
  let treeCount = 0;
  while (pos[Y] < rows.length) {
    pos = applySlope(pos, rise, run);

    const row = rows[pos[Y]];
    if (row == null) {
      break;
    }
    const infiniteX = pos[X] % ROW_LENGTH;
    const square = row[infiniteX];
    if (square === '#') {
      treeCount++;
    }
  }

  return treeCount;
}

const slopes = [
  { rise: 1, run: 1 },
  { rise: 1, run: 3 },
  { rise: 1, run: 5 },
  { rise: 1, run: 7 },
  { rise: 2, run: 1 },
];

const counts = slopes.map((s) => {
  return calculateTreeCount(s.rise, s.run);
});

console.log(counts);
console.log(counts[0] * counts[1] * counts[2] * counts[3] * counts[4]);