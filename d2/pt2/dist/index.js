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
var parsePolicy = function (line) {
    var _a = line.split(': '), policy = _a[0], password = _a[1];
    var _b = policy.split(' '), range = _b[0], char = _b[1];
    var _c = range.split('-'), min = _c[0], max = _c[1];
    return {
        policy: policy, password: password, range: range, char: char, min: min, max: max,
    };
};
var validCount = 0;
data.forEach(function (line) {
    var policy = parsePolicy(line);
    var occurenceCount = (policy.password.match(new RegExp(policy.char, 'g')) || []).length;
    if (occurenceCount >= +policy.min && occurenceCount <= +policy.max) {
        validCount++;
    }
});
console.log(validCount);
