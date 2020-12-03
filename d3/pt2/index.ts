import * as fs from 'fs';

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const rows: string[] = rawData.split('\n');

const X = 0;
const Y = 1;
const ROW_LENGTH = rows[0].length;
let pos = [0, 0];

const applySlope = (pos: number[], rise: number, run: number) => {
  const newX = pos[X] + run;
  const newY = pos[Y] + rise;
  const newPos = [newX, newY];

  return newPos;
}

let treeCount = 0;
while (pos[Y] < rows.length) {
  pos = applySlope(pos, 1, 3);

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

console.log(treeCount);