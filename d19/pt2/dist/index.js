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
// const permutator = (inputArr: any[]): any[][] => {
//   let result: any[][] = [];
//   const permute = (arr: any[], m: any[] = []) => {
//     if (arr.length === 0) {
//       result.push(m)
//     } else {
//       for (let i = 0; i < arr.length; i++) {
//         let curr = arr.slice();
//         let next = curr.splice(i, 1);
//         permute(curr.slice(), m.concat(next))
//       }
//     }
//   }
//   permute(inputArr)
//   const uniq = new Set(result);
//   return result;
// }
var permutator = function (ar1, ar2) {
    var out = [];
    for (var i = 0; i < ar1.length; i++) {
        for (var j = 0; j < ar2.length; j++) {
            var str = "" + ar1[i] + ar2[j];
            out.push(str);
        }
    }
    return out;
};
var rawData = fs.readFileSync('input.txt', 'utf8');
var _a = rawData.split('\n\n'), rawRules = _a[0], rawMessages = _a[1];
var rules = {};
rawRules.split('\n').forEach(function (rawRule) {
    var _a = rawRule.split(': '), id = _a[0], format = _a[1];
    var subRules = format.replace(/"/g, '').split(' | ');
    rules[id] = subRules;
});
var messages = rawMessages.split('\n');
var knownCombos = new Map();
var findAllCombos = function (ruleId) {
    if (knownCombos.has(ruleId)) {
        return knownCombos.get(ruleId);
    }
    var subRules = rules[ruleId];
    var subCombos = subRules.map(function (subRule) {
        if (subRule === 'a' || subRule === 'b') {
            return subRule;
        }
        var subSubCombos = [];
        var splitRules = subRule.split(' ');
        for (var i = 0; i < splitRules.length; i++) {
            var rule = splitRules[i];
            var combos = findAllCombos(rule);
            subSubCombos.push(combos);
        }
        var perms = subSubCombos[0];
        if (subSubCombos.length > 1) {
            perms = permutator(subSubCombos[0], subSubCombos[1]);
        }
        return perms;
    });
    var out = _.flatten(subCombos);
    knownCombos.set(ruleId, out);
    return out;
};
var validCombos = findAllCombos('0');
var count = 0;
messages.forEach(function (message) {
    if (validCombos.includes(message)) {
        count++;
    }
});
console.log(count);
