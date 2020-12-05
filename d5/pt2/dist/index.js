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
var findRow = function (indicator, pos, size, offset) {
    if (pos >= 7) {
        return offset;
    }
    // console.log(indicator[pos], size, offset);
    var newSize = size / 2;
    var newOffset = 0;
    if (indicator[pos] === 'F') {
        newOffset = offset;
    }
    else if (indicator[pos] === 'B') {
        newOffset = offset + newSize;
    }
    return findRow(indicator, pos + 1, newSize, newOffset);
};
var findCol = function (indicator, pos, size, offset) {
    if (pos >= 10) {
        return offset;
    }
    // console.log(indicator[pos], size, offset);
    var newSize = size / 2;
    var newOffset = 0;
    if (indicator[pos] === 'L') {
        newOffset = offset;
    }
    else if (indicator[pos] === 'R') {
        newOffset = offset + newSize;
    }
    return findCol(indicator, pos + 1, newSize, newOffset);
};
var max = data.reduce(function (prev, d) {
    var row = findRow(d, 0, 128, 0);
    var col = findCol(d, 7, 8, 0);
    var rowId = row * 8 + col;
    return Math.max(prev, rowId);
}, 0);
console.log(max);
