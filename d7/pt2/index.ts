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

const bagSet = new Set();
const findBag = (color: string) => {
  Object.keys(rules).forEach((ruleColor) => {
    if (ruleColor === color) {
      return;
    }

    const childRules = rules[ruleColor];
    childRules.forEach((cr) => {
      if (cr.identifier === color) {
        bagSet.add(ruleColor);
        return;
      }

      try {
        findBagRecur(cr.identifier, color, ruleColor);
      } catch (e) {

      }
    });
  });
};

const findBagRecur = (curColor: string, searchColor: string, originalColor: string) => {
  const curColorRules = rules[curColor];

  for (let i = 0; i < curColorRules.length; i++) {
    const r = curColorRules[i];
    if (r.identifier === searchColor) {
      bagSet.add(originalColor);
      // throw new Error('dirty kick out to the top');
    }

    findBagRecur(r.identifier, searchColor, originalColor);
  }
}

findBag('shiny gold');
console.log('uniq count', bagSet.size);