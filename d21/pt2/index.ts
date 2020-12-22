import * as fs from 'fs';
import * as _ from 'lodash';

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const data: string[] = rawData.split('\n');

class IngredientList {
  ingredients: Set<string>;
  allergens: Set<string>;
  constructor(initString: string) {
    const [ing, aller] = initString.split(' (contains ');
    this.ingredients = new Set(ing.split(' '));
    const cleanAller = aller.replace(')', '');
    this.allergens = new Set(cleanAller.split(', '));
  }
}

const lists = data.map(d => new IngredientList(d));

const ALL_ALLERGENS = ['soy', 'fish', 'nuts', 'sesame', 'dairy', 'wheat', 'shellfish', 'peanuts'];

const filteredAllergens = ALL_ALLERGENS.map((a) => {
  const ing = _.intersection(...lists.filter(l => l.allergens.has(a)).map(l => Array.from(l.ingredients)));
  return { allergen: a, potentialIngredients: ing };
});

let maxCount = 0;
while (maxCount < 10) {
  for (let i = 0; i < ALL_ALLERGENS.length; i++) {
    const curAllergen = filteredAllergens[i];
    if (curAllergen.potentialIngredients.length === 1) {
      filteredAllergens.forEach(a => {
        if (a.allergen === curAllergen.allergen) {
          return;
        }

        a.potentialIngredients = a.potentialIngredients.filter(b => b !== curAllergen.potentialIngredients[0])
      });
    }
  }
  maxCount++;
}

const ordered = filteredAllergens.map(f => f.allergen).sort();
let str = '';
ordered.forEach((o) => {
  str += ',' + filteredAllergens.find(f => f.allergen === o)?.potentialIngredients[0];
});
console.log(str.replace(',', ''));