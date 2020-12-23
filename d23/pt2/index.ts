import * as fs from 'fs';

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const ogCups: number[] = rawData.split('').map(s => +s);

const findDestinationIndex = (cups: number[], currentCupValue: number) => {
  for (let i = 1; i <= 9; i++) {
    const nextNum = (currentCupValue - i + 9) % 9;
    const index = cups.findIndex(c => (nextNum || 9) === c);
    if (index !== -1) {
      // console.log({ i, index }, cups[index])
      return index;
    }
  }
}

const move = (c: number[], currentCupIndex: number) => {

  console.log('cups:', c.map((cu, i) => i === currentCupIndex ? `${cu}` : cu))
  const currentCupValue = c[currentCupIndex];
  const cups = [...c];
  // const threeCups = cups.splice(currentCupIndex + 1, 3);
  const threeCups = [
    ...popI(cups, currentCupIndex + 1)
  ];

  console.log('pick up:', threeCups)
  console.log('remainder: ', cups)
  const destinationIndex = findDestinationIndex(cups, currentCupValue);
  // console.log(cups, threeCups, destinationIndex);
  console.log('destination', cups[destinationIndex!], 'at', destinationIndex)
  cups.splice(destinationIndex! + 1, 0, ...threeCups);

  while (cups[currentCupIndex] !== currentCupValue) {
    arrayRotate(cups, 1);
  }


  const newCurrentCupIndex = (currentCupIndex + 1) % c.length;

  return { cups, currentCupIndex: newCurrentCupIndex }
}

const popI = (arr: number[], i: number) => {
  let nums = arr.splice(i, 3);
  if (nums.length === 0) {
    nums.push(arr.shift()!);
    nums.push(arr.shift()!);
    nums.push(arr.shift()!);
  }

  if (nums.length === 1) {
    nums.push(arr.shift()!);
    nums.push(arr.shift()!);
  }

  if (nums.length === 2) {
    nums.push(arr.shift()!);
  }

  return nums;
}

const MOVE_COUNT = 100;
let cups = [...ogCups];
let currentCupIndex = 0;
for (let i = 0; i < MOVE_COUNT; i++) {
  console.log('move ', i + 1)
  const out = move(cups, currentCupIndex);
  // console.log('out', out.cups);
  cups = out.cups;
  currentCupIndex = out.currentCupIndex;
}

console.log(cups);

function arrayRotate(arr: any[], count: number) {
  count -= arr.length * Math.floor(count / arr.length);
  arr.push.apply(arr, arr.splice(0, count));
  return arr;
}