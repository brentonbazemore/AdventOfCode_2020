import * as fs from 'fs';

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const data: string[] = rawData.split('\n\n');

function getFrequency(string: string) {
  var freq: { [char: string]: number } = {};
  for (var i = 0; i < string.length; i++) {
    var character = string.charAt(i);
    if (freq[character]) {
      freq[character]++;
    } else {
      freq[character] = 1;
    }
  }

  return freq;
};

let totalCount = 0;
data.forEach((group) => {
  const persons = group.split('\n');
  const personCount = persons.length;

  const g = group.replace(/\n/g, '');
  const freq = getFrequency(g);

  Object.keys(freq).forEach(key => {
    if (freq[key] === personCount) {
      totalCount++;
    }
  })
});

console.log(totalCount);