import * as fs from 'fs';

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const data: string[] = rawData.split('\n');

const parsePolicy = (line: string) => {
  const [policy, password] = line.split(': ');
  const [range, char] = policy.split(' ');
  const [min, max] = range.split('-');

  return {
    policy, password, range, char, min, max,
  }
}

let validCount = 0;
data.forEach((line) => {
  const policy = parsePolicy(line);
  const occurenceCount = (policy.password.match(new RegExp(policy.char, 'g')) || []).length;

  if (occurenceCount >= +policy.min && occurenceCount <= +policy.max) {
    validCount++;
  }
});

console.log(validCount);