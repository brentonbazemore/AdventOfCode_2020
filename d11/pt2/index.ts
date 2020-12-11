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
  count += checkHoriz(x, y, model);
  count += checkVert(x, y, model);
  count += checkDiag(x, y, model);

  return count;
}

// ctrl + c, ctrl + v > looping lol
const checkHoriz = (x: number, y: number, model: string[]) => {
  const BOUNDS = { y: model.length, x: model[0].length };

  let count = 0;

  // positive x
  let distance = 1;
  while (true) {
    if (x + distance >= BOUNDS.x) {
      break;
    }

    const val = model[y][x + distance];
    if (val === OCCUPIED) {
      count++;
      break;
    }

    if (val === EMPTY) {
      break;
    }

    distance++;
  }

  // negative x
  distance = 1;
  while (true) {
    if (x - distance < 0) {
      break;
    }

    const val = model[y][x - distance];
    if (val === OCCUPIED) {
      count++;
      break;
    }

    if (val === EMPTY) {
      break;
    }

    distance++;
  }

  return count;
}

const checkVert = (x: number, y: number, model: string[]) => {
  const BOUNDS = { y: model.length, x: model[0].length };

  let count = 0;

  // positive y
  let distance = 1;
  while (true) {
    if (y + distance >= BOUNDS.y) {
      break;
    }

    const val = model[y + distance][x];
    if (val === OCCUPIED) {
      count++;
      break;
    }

    if (val === EMPTY) {
      break;
    }

    distance++;
  }

  // negative x
  distance = 1;
  while (true) {
    if (y - distance < 0) {
      break;
    }

    const val = model[y - distance][x];
    if (val === OCCUPIED) {
      count++;
      break;
    }

    if (val === EMPTY) {
      break;
    }

    distance++;
  }

  return count;
}

const checkDiag = (x: number, y: number, model: string[]) => {
  const BOUNDS = { y: model.length, x: model[0].length };

  let count = 0;

  // positive y, positive x
  let distance = 1;
  while (true) {
    if (y + distance >= BOUNDS.y || x + distance >= BOUNDS.x) {
      break;
    }

    const val = model[y + distance][x + distance];
    if (val === OCCUPIED) {
      count++;
      break;
    }

    if (val === EMPTY) {
      break;
    }

    distance++;
  }

  // negative x, positive y
  distance = 1;
  while (true) {
    if (y + distance >= BOUNDS.y || x - distance < 0) {
      break;
    }

    const val = model[y + distance][x - distance];
    if (val === OCCUPIED) {
      count++;
      break;
    }

    if (val === EMPTY) {
      break;
    }

    distance++;
  }

  // negative x, positive y
  distance = 1;
  while (true) {
    if (y - distance < 0 || x + distance >= BOUNDS.x) {
      break;
    }

    const val = model[y - distance][x + distance];
    if (val === OCCUPIED) {
      count++;
      break;
    }

    if (val === EMPTY) {
      break;
    }

    distance++;
  }

  // negative x, negative y
  distance = 1;
  while (true) {
    if (y - distance < 0 || x - distance < 0) {
      break;
    }

    const val = model[y - distance][x - distance];
    if (val === OCCUPIED) {
      count++;
      break;
    }

    if (val === EMPTY) {
      break;
    }

    distance++;
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
      } else if (isOccupied(x, y, curData) && getOccupiedCount(x, y, curData) >= 5) {
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