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
var accumulator = 0;
var pointer = 0;
var instructionMap = {
    'acc': function (argument) {
        accumulator += argument;
        pointer++;
    },
    'jmp': function (argument) {
        pointer += argument;
    },
    'nop': function (argument) {
        pointer++;
    },
};
var instructionSet = new Set();
while (true) {
    if (instructionSet.has(pointer)) {
        console.log(accumulator);
        break;
    }
    instructionSet.add(pointer);
    var instruction = data[pointer];
    var _a = instruction.split(' '), operation = _a[0], argument = _a[1];
    instructionMap[operation](+argument);
}
