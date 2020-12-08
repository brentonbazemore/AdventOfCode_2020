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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var handheld_1 = require("./handheld");
var rawData = fs.readFileSync('input.txt', 'utf8');
var data = rawData.split('\n');
for (var i = 0; i < data.length; i++) {
    if (data[i].includes('nop')) {
        var newInstruction = data[i].replace('nop', 'jmp');
        var newData = __spreadArrays(data);
        newData[i] = newInstruction;
        new handheld_1.Handheld(newData).run();
    }
}
for (var i = 0; i < data.length; i++) {
    if (data[i].includes('jmp')) {
        var newInstruction = data[i].replace('jmp', 'nop');
        var newData = __spreadArrays(data);
        newData[i] = newInstruction;
        new handheld_1.Handheld(newData).run();
    }
}
