import * as fs from 'fs';

const logDimension = (dim: string[][][][]) => {
  for (let z = bounds.z[0]; z <= bounds.z[1]; z++) {
    console.log('\nz =', z);
    for (let y = bounds.y[0]; y <= bounds.y[1]; y++) {
      let row = '';
      for (let x = bounds.x[0]; x <= bounds.x[1]; x++) {
        const state = dim?.[z]?.[y]?.[x] || INACTIVE;
        row += state;
      }
      console.log(row);
    }
  }
}

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const data: string[][] = rawData.split('\n').map(s => s.split(''));

const ACTIVE = '#';
const INACTIVE = '.';

const bounds = {
  x: [-1, data[0].length],
  y: [-1, data.length],
  z: [-1, 1],
  w: [-1, 1],
};

let pocketDimension: string[][][][] = [[data]];
// logDimension(pocketDimension);

const checkState = (x: number, y: number, z: number, w: number) => {
  const state = pocketDimension?.[w]?.[z]?.[y]?.[x];
  return state === ACTIVE ? ACTIVE : INACTIVE;
}

const checkNeighbors = (x: number, y: number, z: number, w: number) => {
  let activeCount = 0;
  for (let l = -1; l <= 1; l++) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        for (let k = -1; k <= 1; k++) {
          if (i === 0 && j === 0 && k === 0 && l === 0) {
            continue;
          }

          const state = checkState(x + k, y + j, z + i, w + l);
          if (state === ACTIVE) {
            activeCount++;
          }
        }

      }
    }
  }

  return activeCount;
}

const safeAdd = (dimension: string[][][][], x: number, y: number, z: number, w: number, value: string) => {
  if (!dimension[w]) {
    dimension[w] = [];
  }

  if (!dimension[w][z]) {
    dimension[w][z] = [];
  }

  if (!dimension[w][z][y]) {
    dimension[w][z][y] = [];
  }

  dimension[w][z][y][x] = value;
};

const CYCLE_COUNT = 6;
for (let cycle = 0; cycle < CYCLE_COUNT; cycle++) {
  console.log('cycle: ', cycle + 1)
  let newDimension: string[][][][] = [];

  for (let w = bounds.w[0]; w <= bounds.w[1]; w++) {
    for (let z = bounds.z[0]; z <= bounds.z[1]; z++) {
      for (let y = bounds.y[0]; y <= bounds.y[1]; y++) {
        for (let x = bounds.x[0]; x <= bounds.x[1]; x++) {

          const curState = checkState(x, y, z, w);
          const count = checkNeighbors(x, y, z, w);

          if (curState === ACTIVE) {
            if (count === 2 || count === 3) {
              safeAdd(newDimension, x, y, z, w, ACTIVE) // active
            } else {
              safeAdd(newDimension, x, y, z, w, INACTIVE) // inactive
            }
          } else { // === INACTIVE
            if (count === 3) {
              safeAdd(newDimension, x, y, z, w, ACTIVE) // active
            } else {
              safeAdd(newDimension, x, y, z, w, INACTIVE) // inactive
            }
          }

        }
      }
    }
  }

  bounds.x = [bounds.x[0] - 1, bounds.x[1] + 1];
  bounds.y = [bounds.y[0] - 1, bounds.y[1] + 1];
  bounds.z = [bounds.z[0] - 1, bounds.z[1] + 1];
  bounds.w = [bounds.w[0] - 1, bounds.w[1] + 1];
  pocketDimension = newDimension;
}

// logDimension(pocketDimension);

let activeCount = 0;
for (let w = bounds.w[0]; w <= bounds.w[1]; w++) {
  for (let z = bounds.z[0]; z <= bounds.z[1]; z++) {
    for (let y = bounds.y[0]; y <= bounds.y[1]; y++) {
      for (let x = bounds.x[0]; x <= bounds.x[1]; x++) {
        if (pocketDimension?.[w]?.[z]?.[y]?.[x] === ACTIVE) {
          activeCount++;
        }
      }
    }
  }
}

console.log(activeCount);