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
var findDestinationIndex = function (cups, currentCupValue) {
    var _loop_1 = function (i) {
        var nextNum = (currentCupValue - i + 9) % 9;
        var index = cups.findIndex(function (c) { return (nextNum || 9) === c; });
        if (index !== -1) {
            return { value: index };
        }
    };
    for (var i = 1; i <= 9; i++) {
        var state_1 = _loop_1(i);
        if (typeof state_1 === "object")
            return state_1.value;
    }
};
var move = function (c, currentCupIndex) {
    console.log('cups:', c.map(function (cu, i) { return i === currentCupIndex ? "" + cu : cu; }));
    var currentCupValue = c[currentCupIndex];
    var cups = __spreadArrays(c);
    // const threeCups = cups.splice(currentCupIndex + 1, 3);
    var threeCups = __spreadArrays(popI(cups, currentCupIndex + 1));
    console.log('pick up:', threeCups);
    console.log('remainder: ', cups);
    var destinationIndex = findDestinationIndex(cups, currentCupValue);
    // console.log(cups, threeCups, destinationIndex);
    console.log('destination', cups[destinationIndex], 'at', destinationIndex);
    cups.splice.apply(cups, __spreadArrays([destinationIndex + 1, 0], threeCups));
    while (cups[currentCupIndex] !== currentCupValue) {
        arrayRotate(cups, 1);
    }
    var newCurrentCupIndex = (currentCupIndex + 1) % c.length;
    return { cups: cups, currentCupIndex: newCurrentCupIndex };
};
var popI = function (arr, i) {
    var nums = arr.splice(i, 3);
    if (nums.length === 0) {
        nums.push(arr.shift());
        nums.push(arr.shift());
        nums.push(arr.shift());
    }
    if (nums.length === 1) {
        nums.push(arr.shift());
        nums.push(arr.shift());
    }
    if (nums.length === 2) {
        nums.push(arr.shift());
    }
    return nums;
};
var MOVE_COUNT = 100;
var cups = __spreadArrays(ogCups);
var currentCupIndex = 0;
for (var i = 0; i < MOVE_COUNT; i++) {
    console.log('move ', i + 1);
    var out = move(cups, currentCupIndex);
    // console.log('out', out.cups);
    cups = out.cups;
    currentCupIndex = out.currentCupIndex;
}
console.log(cups);
function arrayRotate(arr, count) {
    count -= arr.length * Math.floor(count / arr.length);
    arr.push.apply(arr, arr.splice(0, count));
    return arr;
}
