import * as fs from 'fs';

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const data: string[] = rawData.split('\n');

// 1 2 3
// 4 5 6
// 7 8 9

const EMPTY = 'L';
const OCCUPIED = '#';
const FLOOR = '.';

const isFloor = (x: number, y: number, model: string[]) => {
  return model[y][x] === FLOOR;
}

const isEmpty = (x: number, y: number, model: string[]) => {
  return model[y][x] === EMPTY;
}

const isOccupied = (x: number, y: number, model: string[]) => {
  return model[y][x] === OCCUPIED;
}

const getOccupiedCount = (x: number, y: number, model: string[]) => {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) {
        continue;
      }

      const val = model?.[y + i]?.[x + j];

      if (val === OCCUPIED) {
        count++;
      }
    }
  }

  return count;
}

const checkDiff = (x: number, cur: string, next: string) => {
  return cur[x] === next[x] ? 0 : 1;
}

const runRound = (oldData: string[]) => {
  const curData = [...oldData];
  const newData = [];

  let diffs = 0;
  for (let y = 0; y < curData.length; y++) {
    const seatRow = curData[y];
    let newRow = '';
    for (let x = 0; x < seatRow.length; x++) {
      if (isFloor(x, y, curData)) {
        newRow += FLOOR;
        continue;
      }

      if (isEmpty(x, y, curData) && getOccupiedCount(x, y, curData) === 0) {
        newRow += OCCUPIED;
      } else if (isOccupied(x, y, curData) && getOccupiedCount(x, y, curData) >= 4) {
        newRow += EMPTY;
      } else {
        newRow += seatRow[x];
      }

      diffs += checkDiff(x, seatRow, newRow);
    }

    newData.push(newRow);
  }

  return { result: newData, diffs };
};

let freshData = data;
while (true) {
  const { result, diffs } = runRound(freshData);
  freshData = result;
  if (diffs === 0) {
    break;
  }
}

let totalOccupiedCount = 0;
for (let y = 0; y < freshData.length; y++) {
  const row = freshData[y];
  for (let x = 0; x < row.length; x++) {
    if (row[x] === OCCUPIED) {
      totalOccupiedCount++;
    }
  }
}

console.log(totalOccupiedCount)