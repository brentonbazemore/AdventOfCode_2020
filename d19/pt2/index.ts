import * as fs from 'fs';
import * as _ from 'lodash';

const permutator = (ar1: string[], ar2: string[]) => {
  const out = [];
  for (let i = 0; i < ar1.length; i++) {
    for (let j = 0; j < ar2.length; j++) {
      const str = `${ar1[i]}${ar2[j]}`;
      out.push(str);
    }
  }

  return out;
}

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const [rawRules, rawMessages] = rawData.split('\n\n');

const rules: { [id: string]: string[] } = {};

rawRules.split('\n').forEach((rawRule) => {
  const [id, format] = rawRule.split(': ');
  const subRules = format.replace(/"/g, '').split(' | ');
  rules[id] = subRules;
});

const messages = rawMessages.split('\n');

const knownCombos = new Map();
const findAllCombos = (ruleId: string): string[] => {
  if (knownCombos.has(ruleId)) {
    return knownCombos.get(ruleId);
  }

  const subRules = rules[ruleId];
  const subCombos = subRules.map((subRule) => {
    if (subRule === 'a' || subRule === 'b') {
      return subRule;
    }

    const subSubCombos = [];
    const splitRules = subRule.split(' ');
    for (let i = 0; i < splitRules.length; i++) {
      const rule = splitRules[i];
      const combos = findAllCombos(rule);
      subSubCombos.push(combos);
    }

    let perms = subSubCombos[0];
    if (subSubCombos.length > 1) {
      perms = permutator(subSubCombos[0], subSubCombos[1]);
    }

    return perms;
  });

  const out = _.flatten(subCombos);
  knownCombos.set(ruleId, out);

  return out;
}

const validCombos = findAllCombos('0');

let count = 0;
messages.forEach(message => {
  if (validCombos.includes(message)) {
    count++;
  }
});

console.log(count);