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

const byrSpec = (val: string) => {
  let isValid = false;
  isValid = val.length === 4 && +val >= 1920 && +val <= 2002;
  return isValid;
}

const iyrSpec = (val: string) => {
  let isValid = false;
  isValid = val.length === 4 && +val >= 2010 && +val <= 2020;
  return isValid;
}

const eyrSpec = (val: string) => {
  let isValid = false;
  isValid = val.length === 4 && +val >= 2020 && +val <= 2030;
  return isValid;
}

const hgtSpec = (val: string) => {
  let isValid = false;
  if (val.includes('in')) {
    const num = val.replace(/\D/g, '');
    isValid = +num >= 59 && +num <= 76;
  }

  if (val.includes('cm')) {
    const num = val.replace(/\D/g, '');
    isValid = +num >= 150 && +num <= 193;
  }

  return isValid;
}

const hclSpec = (val: string) => {
  let isValid = false;
  const HEX_PATTERN = /^#([a-fA-F0-9]{6})$/;
  isValid = HEX_PATTERN.test(val);
  return isValid;
}

const VALID_ECL = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
const eclSpec = (val: string) => {
  let isValid = false;
  isValid = VALID_ECL.includes(val);
  return isValid;
}

const pidSpec = (val: string) => {
  let isValid = false;
  isValid = val.length === 9 && !Number.isNaN(+val);
  return isValid;
}

let validCount = 0;
passports.forEach((passport) => {
  const hasRequired = REQUIRED_FIELDS.every((field) => !!passport[field]);
  if (hasRequired) {
    const isValid = byrSpec(passport.byr)
      && iyrSpec(passport.iyr)
      && eyrSpec(passport.eyr)
      && hgtSpec(passport.hgt)
      && hclSpec(passport.hcl)
      && eclSpec(passport.ecl)
      && pidSpec(passport.pid);

    if (isValid) {
      validCount++;
    }
  }
});

console.log(validCount);