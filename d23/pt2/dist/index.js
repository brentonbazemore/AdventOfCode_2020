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
var ogCups = rawData.split('').map(function (s) { return +s; });
// TODO: Make sure to insert the other million before here
var allCups = __spreadArrays(ogCups);
for (var i = 10; i <= 1000000; i++) {
    allCups.push(i);
}
var MAX_CUP = 1000000;
var cups = new Map();
for (var i = 0; i < allCups.length; i++) {
    var cur = allCups[i];
    var next_1 = allCups[i + 1];
    if (next_1) {
        cups.set(cur, next_1);
    }
    else {
        cups.set(cur, allCups[0]);
    }
}
var removeCups = function (currentCup) {
    var one = cups.get(currentCup);
    var two = cups.get(one);
    var three = cups.get(two);
    var four = cups.get(three);
    cups.set(currentCup, four);
    return [one, two, three];
};
var insertCups = function (parent, insertedCups, child) {
    cups.set(parent, insertedCups[0]);
    cups.set(insertedCups[0], insertedCups[1]);
    cups.set(insertedCups[1], insertedCups[2]);
    cups.set(insertedCups[2], child);
};
var move = function (currentCup) {
    var threeCups = removeCups(currentCup);
    var nextCup = currentCup - 1;
    while (true) {
        if (nextCup <= 0) {
            nextCup = MAX_CUP;
        }
        if (threeCups.includes(nextCup)) {
            nextCup = nextCup - 1;
        }
        else {
            break;
        }
    }
    insertCups(nextCup, threeCups, cups.get(nextCup));
    return cups.get(currentCup);
};
var MOVE_COUNT = 10000000;
var currentCup = allCups[0];
for (var i = 0; i < MOVE_COUNT; i++) {
    currentCup = move(currentCup);
}
var next = 1;
for (var i = 0; i < 2; i++) {
    next = cups.get(next);
    console.log(next);
}
