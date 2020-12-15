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
var data = rawData.split(',').map(function (n) { return +n; });
var safePush = function (obj, key, val) {
    if (obj[key]) {
        obj[key].push(val);
    }
    else {
        obj[key] = [val];
    }
    if (obj[key].length > 2) {
        obj[key] = obj[key].slice(-2);
    }
};
var numberHistory = {};
var lastSpoken = 0;
// Starting numbers
for (var i = 0; i < data.length; i++) {
    numberHistory[data[i]] = [i];
    lastSpoken = data[i];
}
for (var i = data.length; i < 30000000; i++) {
    if (i % 50000 === 0) {
        console.log(i);
    }
    var history_1 = numberHistory[lastSpoken];
    if (!history_1 || history_1.length === 1) {
        lastSpoken = 0;
        safePush(numberHistory, '0', i);
    }
    else if (history_1) {
        var lastSeen = history_1[history_1.length - 1];
        var diff = lastSeen - history_1[history_1.length - 2];
        lastSpoken = diff;
        safePush(numberHistory, "" + lastSpoken, i);
    }
}
console.log(lastSpoken);
