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
var INVALID_NUMBER = 10884537;
var combinator = function (array) {
    var results = [];
    for (var i = 0; i < array.length - 1; i++) {
        for (var j = i + 1; j < array.length; j++) {
            results.push(+array[i] + +array[j]);
        }
    }
    return results;
};
for (var i = 0; i < data.length; i++) {
    var sum = 0;
    var j = i;
    var usedNums = [];
    while (sum < INVALID_NUMBER) {
        sum += +data[j];
        usedNums.push(+data[j]);
        if (sum === INVALID_NUMBER && j !== i) {
            var max = Math.max.apply(Math, usedNums);
            var min = Math.min.apply(Math, usedNums);
            console.log(min, max, min + max);
            throw new Error('Finished.');
        }
        j++;
    }
}
