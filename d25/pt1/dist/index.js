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
var _a = rawData.split('\n').map(function (n) { return +n; }), cardKey = _a[0], doorKey = _a[1];
var P = 20201227;
var subject = 7;
var cardValue = 1;
var cardLoop = 1;
while (true) {
    cardValue *= subject;
    cardValue %= P;
    if (cardValue === cardKey) {
        break;
    }
    cardLoop++;
}
console.log({ cardLoop: cardLoop });
var doorValue = 1;
var doorLoop = 1;
while (true) {
    doorValue *= subject;
    doorValue %= P;
    if (doorValue === doorKey) {
        break;
    }
    doorLoop++;
}
console.log({ doorLoop: doorLoop });
var outValue = 1;
for (var i = 0; i < cardLoop; i++) {
    outValue *= doorKey;
    outValue %= P;
}
var outValue2 = 1;
for (var i = 0; i < doorLoop; i++) {
    outValue2 *= cardKey;
    outValue2 %= P;
}
console.log(outValue);
console.log(outValue2);
