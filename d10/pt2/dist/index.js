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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var rawData = fs.readFileSync('input.txt', 'utf8');
var data = rawData.split('\n');
var sorted = data.sort(function (a, b) { return +a - +b; }).map(function (s) { return +s; });
var expectedEnd = sorted[sorted.length - 1];
var plugs = __spreadArrays([0], sorted, [expectedEnd + 3]);
var memo = new Map();
var findNext = function (curIndex) {
    if (memo.has(curIndex)) {
        return memo.get(curIndex);
    }
    var currentJolts = plugs[curIndex];
    var validLeaves = 0;
    for (var i = 1; i <= 3; i++) {
        var nextJolts = plugs[curIndex + i];
        if (nextJolts - currentJolts <= 3) {
            if (nextJolts === expectedEnd + 3) {
                validLeaves++;
                continue;
            }
            var out = findNext(curIndex + i);
            validLeaves += out;
        }
    }
    memo.set(curIndex, validLeaves);
    return validLeaves;
};
var count = findNext(0);
console.log({ count: count });
