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
var byrSpec = function (val) {
    var isValid = false;
    isValid = val.length === 4 && +val >= 1920 && +val <= 2002;
    return isValid;
};
var iyrSpec = function (val) {
    var isValid = false;
    isValid = val.length === 4 && +val >= 2010 && +val <= 2020;
    return isValid;
};
var eyrSpec = function (val) {
    var isValid = false;
    isValid = val.length === 4 && +val >= 2020 && +val <= 2030;
    return isValid;
};
var hgtSpec = function (val) {
    var isValid = false;
    if (val.includes('in')) {
        var num = val.replace(/\D/g, '');
        isValid = +num >= 59 && +num <= 76;
    }
    if (val.includes('cm')) {
        var num = val.replace(/\D/g, '');
        isValid = +num >= 150 && +num <= 193;
    }
    return isValid;
};
var hclSpec = function (val) {
    var isValid = false;
    var HEX_PATTERN = /^#([a-fA-F0-9]{6})$/;
    isValid = HEX_PATTERN.test(val);
    return isValid;
};
var VALID_ECL = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
var eclSpec = function (val) {
    var isValid = false;
    isValid = VALID_ECL.includes(val);
    return isValid;
};
var pidSpec = function (val) {
    var isValid = false;
    isValid = val.length === 9 && !Number.isNaN(+val);
    return isValid;
};
var validCount = 0;
passports.forEach(function (passport) {
    var hasRequired = REQUIRED_FIELDS.every(function (field) { return !!passport[field]; });
    if (hasRequired) {
        var isValid = byrSpec(passport.byr)
            && iyrSpec(passport.iyr)
            && eyrSpec(passport.eyr)
            && hgtSpec(passport.hgt)
            && hclSpec(passport.hcl)
            && eclSpec(passport.ecl)
            && pidSpec(passport.pid);
        if (isValid) {
            validCount++;
        }
    }
});
console.log(validCount);
