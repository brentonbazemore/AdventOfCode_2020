import * as fs from 'fs';

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const data: string[] = rawData.split('\n');

const parsePolicy = (line: string) => {
  const [policy, password] = line.split(': ');
  const [range, char] = policy.split(' ');
  const [first, second] = range.split('-');

  return {
    policy, password, range, char, first, second,
  }
}

let validCount = 0;
data.forEach((line) => {
  const policy = parsePolicy(line);
  const firstMatch = policy.password[+policy.first - 1] === policy.char;
  const secondMatch = policy.password[+policy.second - 1] === policy.char;

  if ((firstMatch || secondMatch) && !(firstMatch && secondMatch)) {
    validCount++;
  }
});

console.log(validCount);