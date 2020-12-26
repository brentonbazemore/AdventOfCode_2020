import * as fs from 'fs';

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const [cardKey, doorKey]: number[] = rawData.split('\n').map(n => +n);

const P = 20201227;
const subject = 7;

let cardValue = 1
let cardLoop = 1;
while (true) {
  cardValue *= subject;
  cardValue %= P;

  if (cardValue === cardKey) {
    break;
  }

  cardLoop++;
}

console.log({ cardLoop });

let doorValue = 1
let doorLoop = 1;
while (true) {
  doorValue *= subject;
  doorValue %= P;

  if (doorValue === doorKey) {
    break;
  }

  doorLoop++;
}

console.log({ doorLoop })

let outValue = 1;
for (let i = 0; i < cardLoop; i++) {
  outValue *= doorKey;
  outValue %= P;
}

let outValue2 = 1;
for (let i = 0; i < doorLoop; i++) {
  outValue2 *= cardKey;
  outValue2 %= P;
}

console.log(outValue);
console.log(outValue2);