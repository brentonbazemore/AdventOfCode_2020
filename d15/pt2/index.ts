import * as fs from 'fs';

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const data: number[] = rawData.split(',').map(n => +n);

const safePush = (obj: { [num: string]: number[] }, key: string, val: any) => {
  if (obj[key]) {
    obj[key].push(val);
  } else {
    obj[key] = [val];
  }

  if (obj[key].length > 2) {
    obj[key] = obj[key].slice(-2);
  }
}

const numberHistory: { [num: string]: number[] } = {};

let lastSpoken = 0;
// Starting numbers
for (let i = 0; i < data.length; i++) {
  numberHistory[data[i]] = [i];
  lastSpoken = data[i];
}

for (let i = data.length; i < 30000000; i++) {
  const history = numberHistory[lastSpoken];
  if (!history || history.length === 1) {
    lastSpoken = 0;
    safePush(numberHistory, '0', i);
  } else if (history) {
    const lastSeen = history[history.length - 1];
    const diff = lastSeen - history[history.length - 2];
    lastSpoken = diff;
    safePush(numberHistory, `${lastSpoken}`, i);
  }
}

console.log(lastSpoken);
