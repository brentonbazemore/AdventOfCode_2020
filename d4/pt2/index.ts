import * as fs from 'fs';

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const data: string[] = rawData.split('\n\n');

// Parse passports
const passports = data.map((line) => {
  const l = line.replace(/\n/g, ' ');
  const kvp = l.split(' ');
  let passport: { [key: string]: string } = {};
  kvp.forEach((pair) => {
    const [key, value] = pair.split(':');
    passport[key] = value;
  });

  return passport;
});

const REQUIRED_FIELDS = ['ecl', 'pid', 'eyr', 'hcl', 'byr', 'iyr', 'hgt'];
const OPTIONAL_FIELDS = ['cid'];

let validCount = 0;
passports.forEach((passport) => {
  const isValid = REQUIRED_FIELDS.every((field) => !!passport[field]);
  if (isValid) {
    validCount++;
  }
});

console.log(validCount);