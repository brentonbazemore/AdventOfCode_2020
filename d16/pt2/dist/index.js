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
var _a = rawData.split('\n\n'), rulesData = _a[0], yourTickeData = _a[1], nearbyTicketData = _a[2];
var rules = rulesData.split('\n').map(function (ru) {
    var _a = ru.split(': '), field = _a[0], rawRanges = _a[1];
    var ranges = rawRanges.split(' or ').map(function (ra) {
        var _a = ra.split('-').map(function (n) { return +n; }), low = _a[0], high = _a[1];
        return { low: low, high: high };
    });
    return { field: field, ranges: ranges };
});
var rawNearbyTickets = nearbyTicketData.split('\n');
rawNearbyTickets.shift();
var nearbyTickets = rawNearbyTickets.map(function (v) { return v.split(',').map(function (n) { return +n; }); });
var invalid = [];
nearbyTickets.forEach(function (ticket) {
    ticket.forEach(function (num) {
        var isValid = rules.some(function (rule) { return rule.ranges.some(function (range) { return num >= range.low && num <= range.high; }); });
        if (!isValid) {
            invalid.push(num);
        }
    });
});
console.log(invalid.reduce(function (prev, cur) { return prev + cur; }, 0));
