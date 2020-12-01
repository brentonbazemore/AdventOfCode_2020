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
var rawData = fs.readFileSync('input.txt', 'utf8');
var data = rawData.split('\n');
var candidates = [];
// Find candidates
for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < data.length; j++) {
        if (j === i) {
            continue;
        }
        var num1 = +data[i];
        var num2 = +data[j];
        if (num1 + num2 > 2020) {
            continue;
        }
        candidates.push({ num1: num1, num2: num2, sum: num1 + num2 });
    }
}
for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < candidates.length; j++) {
        var num1 = +data[i];
        var num2 = candidates[j].sum;
        if (num1 + num2 === 2020) {
            console.log(num1, candidates[j].num1, candidates[j].num2, num1 * candidates[j].num1 * candidates[j].num2);
        }
    }
}
// const set = new Set();
// candidates.some((can) => {
//   const expectedPair = 2020 - can.sum;
//   if (set.has(expectedPair)) {
//     console.log(can, expectedPair, can.num1 * can.num2 * expectedPair);
//     return true;
//   } else {
//     set.add(+can.sum);
//   }
//   return false;
// });
