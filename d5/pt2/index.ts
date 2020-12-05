import * as fs from 'fs';

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const data: string[] = rawData.split('\n');

const findRow = (indicator: string, pos: number, size: number, offset: number): number => {
  if (pos >= 7) {
    return offset;
  }
  // console.log(indicator[pos], size, offset);
  const newSize = size / 2;
  let newOffset = 0;
  if (indicator[pos] === 'F') {
    newOffset = offset;
  } else if (indicator[pos] === 'B') {
    newOffset = offset + newSize;
  }

  return findRow(indicator, pos + 1, newSize, newOffset);
};

const findCol = (indicator: string, pos: number, size: number, offset: number): number => {
  if (pos >= 10) {
    return offset;
  }
  // console.log(indicator[pos], size, offset);
  const newSize = size / 2;
  let newOffset = 0;
  if (indicator[pos] === 'L') {
    newOffset = offset;
  } else if (indicator[pos] === 'R') {
    newOffset = offset + newSize;
  }

  return findCol(indicator, pos + 1, newSize, newOffset);
};

const max = data.reduce((prev, d) => {
  const row = findRow(d, 0, 128, 0);
  const col = findCol(d, 7, 8, 0);

  const rowId = row * 8 + col;

  return Math.max(prev, rowId);
}, 0);

console.log(max);