import * as fs from 'fs';
import open from 'open';

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const times: string[] = rawData.split(',');

const vars = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y' // exclude z
];

// %3D =
// %2B +
// %2C ,
const equations = times.map((time, i) => ({ time: time, i: i }))
  .filter((obj) => obj.time !== 'x')
  .map((obj) => [vars.pop(), '*', obj.time, '%3D', 'z', '%2B', obj.i].join('+'))
  .join('%2C');

open(`https://www.wolframalpha.com/input/?i=${equations}`);