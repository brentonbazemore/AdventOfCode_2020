import * as fs from 'fs';

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const ogCups: number[] = rawData.split('').map(s => +s);

const allCups = [...ogCups];
for (let i = 10; i <= 1000000; i++) {
  allCups.push(i);
}

const MAX_CUP = 1000000;

let cups = new Map();
for (let i = 0; i < allCups.length; i++) {
  const cur = allCups[i];
  const next = allCups[i + 1];
  if (next) {
    cups.set(cur, next);
  } else {
    cups.set(cur, allCups[0]);
  }
}

const removeCups = (currentCup: number) => {
  const one = cups.get(currentCup);
  const two = cups.get(one);
  const three = cups.get(two);
  const four = cups.get(three);

  cups.set(currentCup, four);

  return [one, two, three];
}

const insertCups = (parent: number, insertedCups: number[], child: number) => {
  cups.set(parent, insertedCups[0]);
  cups.set(insertedCups[0], insertedCups[1]);
  cups.set(insertedCups[1], insertedCups[2]);
  cups.set(insertedCups[2], child);
}

const move = (currentCup: number) => {
  const threeCups = removeCups(currentCup);

  let nextCup = currentCup - 1;
  while (true) {
    if (nextCup <= 0) {
      nextCup = MAX_CUP;
    }

    if (threeCups.includes(nextCup)) {
      nextCup = nextCup - 1;
    } else {
      break;
    }
  }

  insertCups(nextCup, threeCups, cups.get(nextCup));

  return cups.get(currentCup);
}

const MOVE_COUNT = 10000000;
let currentCup = allCups[0];
for (let i = 0; i < MOVE_COUNT; i++) {
  if (i)
    currentCup = move(currentCup);
}

let next = 1;
for (let i = 0; i < 2; i++) {
  next = cups.get(next);
  console.log(next);
}