import * as fs from 'fs';
import * as _ from 'lodash';

const permutator = (ar1: string[], ar2: string[], ar3: string[] = ['']) => {
  const out = [];
  for (let i = 0; i < ar1.length; i++) {
    for (let j = 0; j < ar2.length; j++) {
      for (let k = 0; k < ar3.length; k++) {
        const str = `${ar1[i]}${ar2[j]}${ar3[k]}`;
        out.push(str);
      }
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

let seenParentCount = 0;
let curParent: any = null;
const knownCombos = new Map();
const findAllCombos = (ruleId: string, parent: any): string[] => {
  if (parent === curParent) {
    if (seenParentCount > 5) {
      console.log('reached the depth')
      return [''];
    } else {
      seenParentCount++;
    }
  } else {
    seenParentCount = 1;
  }

  curParent = parent;

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
      const combos = findAllCombos(rule, ruleId);
      subSubCombos.push(combos);
    }

    let perms = subSubCombos[0];
    if (subSubCombos.length > 1) {
      perms = permutator(subSubCombos[0], subSubCombos[1], subSubCombos[2]);
    }

    return perms;
  });

  const out = _.flatten(subCombos);
  knownCombos.set(ruleId, out);

  return out;
}

const vc31 = Array.from(new Set(findAllCombos('31', null)));
const vc42 = Array.from(new Set(findAllCombos('42', null)));

const check42 = (message: string) => {
  let newMessage = message;
  const has = vc42.some((combo) => {
    if (message.startsWith(combo)) {
      newMessage = message.replace(combo, '');
      return true;
    }

    return false;
  });

  return { has, message: newMessage };
}
const check42e = (message: string) => {
  let newMessage = message;
  const has = vc42.some((combo) => {
    if (message.endsWith(combo)) {
      newMessage = message.replace(new RegExp(combo + '$'), '');
      return true;
    }

    return false;
  });

  return { has, message: newMessage };
}

const check31 = (message: string) => {
  let newMessage = message;
  const has = vc31.some((combo) => {
    if (message.endsWith(combo)) {
      newMessage = message.replace(new RegExp(combo + '$'), '');
      return true;
    }

    return false;
  });

  return { has, message: newMessage };
}

interface StripTracker { strip31: number, strip42e: number, message: string };

const candidates: StripTracker[] = [];

for (let i = 0; i < messages.length; i++) {
  const message = messages[i];

  let c42 = check42(message);
  let c31 = check31(message);

  if (c42.has && c31.has) {
    candidates.push({ strip31: 0, strip42e: 0, message });
  }
}

let newMessages = candidates;


while (true) {
  const leftovers: StripTracker[] = [];
  for (let i = 0; i < newMessages.length; i++) {
    const message = newMessages[i];

    let count = message.strip31;
    let c31 = check31(message.message);
    if (c31.has) {
      count++;
    }

    leftovers.push({ strip31: count, strip42e: message.strip42e, message: c31.message });
  }


  if (_.isEqual(leftovers, newMessages)) {
    break;
  }

  newMessages = leftovers;
}

while (true) {
  const leftovers: StripTracker[] = [];
  for (let i = 0; i < newMessages.length; i++) {
    const message = newMessages[i];

    let count = message.strip42e;
    let c42e = check42e(message.message);
    if (c42e.has) {
      count++;
    }

    leftovers.push({ strip31: message.strip31, strip42e: count, message: c42e.message });
  }


  if (_.isEqual(leftovers, newMessages)) {
    break;
  }

  newMessages = leftovers;
}

let c = 0;
newMessages.forEach(m => {
  if (m.message === '' && m.strip42e > m.strip31) {
    c++;
  }
})

console.log(c);