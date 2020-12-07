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
;
var rawData = fs.readFileSync('input.txt', 'utf8');
var data = rawData.split('\n');
var rules = {};
data.forEach(function (rule) {
    var _a = rule.split(' contain '), rawContainer = _a[0], rawContainee = _a[1];
    var container = rawContainer.replace(' bags', '');
    var rawContainee1 = rawContainee.replace('.', '');
    var rawContainee2 = rawContainee1.replace(/ bags/g, '');
    var rawContainee3 = rawContainee2.replace(/ bag/g, '');
    var rawContents = rawContainee3.split(', ');
    var childRules = [];
    rawContents.forEach(function (rc) {
        var splitContent = rc.split(' ');
        if (splitContent.length === 3) {
            var quantity = splitContent[0], modifier = splitContent[1], color = splitContent[2];
            childRules.push({
                quantity: +quantity,
                identifier: modifier + " " + color,
            });
        }
        else {
            // TODO?
        }
    });
    rules[container] = childRules;
});
var bagSet = new Set();
var findBag = function (color) {
    Object.keys(rules).forEach(function (ruleColor) {
        if (ruleColor === color) {
            return;
        }
        var childRules = rules[ruleColor];
        childRules.forEach(function (cr) {
            if (cr.identifier === color) {
                bagSet.add(ruleColor);
                return;
            }
            try {
                findBagRecur(cr.identifier, color, ruleColor);
            }
            catch (e) {
            }
        });
    });
};
var findBagRecur = function (curColor, searchColor, originalColor) {
    var curColorRules = rules[curColor];
    for (var i = 0; i < curColorRules.length; i++) {
        var r = curColorRules[i];
        if (r.identifier === searchColor) {
            bagSet.add(originalColor);
            // throw new Error('dirty kick out to the top');
        }
        findBagRecur(r.identifier, searchColor, originalColor);
    }
};
findBag('shiny gold');
console.log('uniq count', bagSet.size);
