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
var data = rawData.split('\n\n');
// Parse passports
var passports = data.map(function (line) {
    var l = line.replace(/\n/g, ' ');
    var kvp = l.split(' ');
    var passport = {};
    kvp.forEach(function (pair) {
        var _a = pair.split(':'), key = _a[0], value = _a[1];
        passport[key] = value;
    });
    return passport;
});
var REQUIRED_FIELDS = ['ecl', 'pid', 'eyr', 'hcl', 'byr', 'iyr', 'hgt'];
var OPTIONAL_FIELDS = ['cid'];
var validCount = 0;
passports.forEach(function (passport) {
    var isValid = REQUIRED_FIELDS.every(function (field) { return !!passport[field]; });
    if (isValid) {
        validCount++;
    }
});
console.log(validCount);
