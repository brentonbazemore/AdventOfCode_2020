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
var rows = rawData.split('\n');
var X = 0;
var Y = 1;
var ROW_LENGTH = rows[0].length;
var applySlope = function (pos, rise, run) {
    var newX = pos[X] + run;
    var newY = pos[Y] + rise;
    var newPos = [newX, newY];
    return newPos;
};
var calculateTreeCount = function (rise, run) {
    var pos = [0, 0];
    var treeCount = 0;
    while (pos[Y] < rows.length) {
        pos = applySlope(pos, rise, run);
        var row = rows[pos[Y]];
        if (row == null) {
            break;
        }
        var infiniteX = pos[X] % ROW_LENGTH;
        var square = row[infiniteX];
        if (square === '#') {
            treeCount++;
        }
    }
    return treeCount;
};
var slopes = [
    { rise: 1, run: 1 },
    { rise: 1, run: 3 },
    { rise: 1, run: 5 },
    { rise: 1, run: 7 },
    { rise: 2, run: 1 },
];
var counts = slopes.map(function (s) {
    return calculateTreeCount(s.rise, s.run);
});
console.log(counts);
console.log(counts[0] * counts[1] * counts[2] * counts[3] * counts[4]);
