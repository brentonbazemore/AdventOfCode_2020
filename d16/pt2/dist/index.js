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
var _ = __importStar(require("lodash"));
var rawData = fs.readFileSync('input.txt', 'utf8');
var _a = rawData.split('\n\n'), rulesData = _a[0], yourTickeData = _a[1], nearbyTicketData = _a[2];
//
var rules = rulesData.split('\n').map(function (ru) {
    var _a = ru.split(': '), field = _a[0], rawRanges = _a[1];
    var ranges = rawRanges.split(' or ').map(function (ra) {
        var _a = ra.split('-').map(function (n) { return +n; }), low = _a[0], high = _a[1];
        return { low: low, high: high };
    });
    return { field: field, ranges: ranges };
});
//
var yourTicket = yourTickeData.split('\n').pop().split(',').map(function (n) { return +n; });
var rawNearbyTickets = nearbyTicketData.split('\n');
rawNearbyTickets.shift();
var nearbyTickets = rawNearbyTickets.map(function (v) { return v.split(',').map(function (n) { return +n; }); });
//
var validTickets = nearbyTickets.filter(function (ticket) { return ticket.every(function (num) { return rules.some(function (rule) { return rule.ranges.some(function (range) { return num >= range.low && num <= range.high; }); }); }); });
var determinePossibleFieldByIndex = function (index) {
    var fieldArrays = validTickets.map(function (ticket) {
        var num = ticket[index];
        var validRules = rules.filter(function (rule) { return rule.ranges.some(function (range) { return num >= range.low && num <= range.high; }); });
        return validRules.map(function (r) { return r.field; });
    });
    var fields = _.intersection.apply(_, fieldArrays);
    return { index: index, fields: fields };
};
var indices = _.range(0, yourTicket.length);
var confirmedIndices = {};
var confirmedFields = [];
var candidateFields = [];
indices.forEach(function (index) {
    var out = determinePossibleFieldByIndex(index);
    if (out.fields.length === 1) {
        confirmedFields.push(out.fields[0]);
        confirmedIndices[out.fields[0]] = index;
    }
    else {
        candidateFields.push(out);
    }
});
while (confirmedFields.length !== indices.length) {
    candidateFields = candidateFields.filter(function (obj, i) {
        var remainingFields = _.difference(obj.fields, confirmedFields);
        if (remainingFields.length === 1) {
            confirmedFields.push(remainingFields[0]);
            confirmedIndices[remainingFields[0]] = obj.index;
            return false;
        }
        else {
            candidateFields[i].fields = remainingFields;
            return true;
        }
    });
}
var result = yourTicket[confirmedIndices['departure location']]
    * yourTicket[confirmedIndices['departure station']]
    * yourTicket[confirmedIndices['departure platform']]
    * yourTicket[confirmedIndices['departure track']]
    * yourTicket[confirmedIndices['departure date']]
    * yourTicket[confirmedIndices['departure time']];
console.log(result);
