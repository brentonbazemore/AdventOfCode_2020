"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var _ = __importStar(require("lodash"));
var rawData = fs.readFileSync('input.txt', 'utf8');
var data = rawData.split('\n');
var IngredientList = /** @class */ (function () {
    function IngredientList(initString) {
        var _a = initString.split(' (contains '), ing = _a[0], aller = _a[1];
        this.ingredients = new Set(ing.split(' '));
        var cleanAller = aller.replace(')', '');
        this.allergens = new Set(cleanAller.split(', '));
    }
    return IngredientList;
}());
var lists = data.map(function (d) { return new IngredientList(d); });
var ALL_ALLERGENS = ['soy', 'fish', 'nuts', 'sesame', 'dairy', 'wheat', 'shellfish', 'peanuts'];
var filteredAllergens = ALL_ALLERGENS.map(function (a) {
    var ing = _.intersection.apply(_, lists.filter(function (l) { return l.allergens.has(a); }).map(function (l) { return Array.from(l.ingredients); }));
    return { allergen: a, potentialIngredients: ing };
});
var maxCount = 0;
while (maxCount < 10) {
    var _loop_1 = function (i) {
        var curAllergen = filteredAllergens[i];
        if (curAllergen.potentialIngredients.length === 1) {
            filteredAllergens.forEach(function (a) {
                if (a.allergen === curAllergen.allergen) {
                    return;
                }
                a.potentialIngredients = a.potentialIngredients.filter(function (b) { return b !== curAllergen.potentialIngredients[0]; });
            });
        }
    };
    for (var i = 0; i < ALL_ALLERGENS.length; i++) {
        _loop_1(i);
    }
    maxCount++;
}
console.log(filteredAllergens);
// for (let i = 0; i < filteredAllergens.length; i++) {
//   const ing = filteredAllergens[i].potentialIngredients[0];
//   lists.forEach(l => l.ingredients.delete(ing));
// }
// console.log(lists.map((l, i) => ({ i: i + 1, s: l.allergens })));
// console.log(lists.reduce((prev, cur) => {
//   return cur.ingredients.size + prev;
// }, 0));
