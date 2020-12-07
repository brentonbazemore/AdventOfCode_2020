import * as fs from 'fs';

interface Rule { quantity: number, identifier: string };

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const data: string[] = rawData.split('\n');

const rules: { [key: string]: Rule[] } = {};
data.forEach((rule) => {
  const [rawContainer, rawContainee] = rule.split(' contain ');
  const container = rawContainer.replace(' bags', '');

  const rawContainee1 = rawContainee.replace('.', '');
  const rawContainee2 = rawContainee1.replace(/ bags/g, '',);
  const rawContainee3 = rawContainee2.replace(/ bag/g, '');

  const rawContents = rawContainee3.split(', ');
  const childRules: Rule[] = [];
  rawContents.forEach((rc) => {
    const splitContent = rc.split(' ');
    if (splitContent.length === 3) {
      const [quantity, modifier, color] = splitContent;
      childRules.push({
        quantity: +quantity,
        identifier: `${modifier} ${color}`,
      });
    } else {
      // TODO?
    }
  });

  rules[container] = childRules;
});

const findChildCount = (color: string): number => {
  const childRules = rules[color];

  let subCount = 0;
  for (let i = 0; i < childRules.length; i++) {
    const cr = childRules[i];
    subCount += cr.quantity;
    const multiplier = cr.quantity;
    const childCount = findChildCount(cr.identifier);
    subCount += (multiplier * (childCount));
  }

  return subCount;
};

const c = findChildCount('shiny gold');
console.log(c);