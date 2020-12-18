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
var deepestPair = function (str, index) {
    if (index === void 0) { index = null; }
    return [index = str.match(/([(])[^()]+[)]/).index,
        str.slice(index).match(/[)]/).index + index];
};
var evaluateParenthesis = function (subExpressionString) {
    var subExpression = subExpressionString.replace('(', '');
    subExpression = subExpression.replace(')', '');
    var subExpressionAr = subExpression.split(' ');
    var operations = {
        '+': function (a, b) { return a + b; },
        '*': function (a, b) { return a * b; },
    };
    var val = +subExpressionAr[0];
    var operator = subExpressionAr[1];
    for (var i = 1; i < subExpressionAr.length; i++) {
        if (i % 2 === 1) {
            operator = subExpressionAr[i];
        }
        else {
            val = operations[operator](val, +subExpressionAr[i]);
        }
    }
    return val;
};
var evaluate = function (str) {
    var expression = str;
    while (expression.includes('(')) {
        var indices = deepestPair(expression);
        var parenthesis = expression.substring(indices[0], indices[1] + 1);
        var val = evaluateParenthesis(parenthesis);
        expression = expression.replace(parenthesis, "" + val);
    }
    return evaluateParenthesis(expression);
};
var result = data.map(evaluate).reduce(function (prev, cur) { return prev + cur; }, 0);
console.log(result);
