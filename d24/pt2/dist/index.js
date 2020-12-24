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
var dirMap = {
    e: function (_a) {
        var x = _a.x, y = _a.y, z = _a.z;
        return ({ x: x + 1, y: y - 1, z: z + 0 });
    },
    se: function (_a) {
        var x = _a.x, y = _a.y, z = _a.z;
        return ({ x: x + 0, y: y - 1, z: z + 1 });
    },
    sw: function (_a) {
        var x = _a.x, y = _a.y, z = _a.z;
        return ({ x: x - 1, y: y + 0, z: z + 1 });
    },
    w: function (_a) {
        var x = _a.x, y = _a.y, z = _a.z;
        return ({ x: x - 1, y: y + 1, z: z + 0 });
    },
    nw: function (_a) {
        var x = _a.x, y = _a.y, z = _a.z;
        return ({ x: x + 0, y: y + 1, z: z - 1 });
    },
    ne: function (_a) {
        var x = _a.x, y = _a.y, z = _a.z;
        return ({ x: x + 1, y: y + 0, z: z - 1 });
    },
};
var parseInstructions = function (inst) {
    var instructions = [];
    var rawInst = inst.split('');
    while (rawInst.length > 0) {
        if (rawInst[0] === 's' || rawInst[0] === 'n') {
            instructions.push(rawInst.splice(0, 2).join(''));
        }
        else {
            instructions.push(rawInst.shift());
        }
    }
    return instructions;
};
var seenTiles = new Map();
var followInstructions = function (instructions) {
    var coords = { x: 0, y: 0, z: 0 };
    for (var i = 0; i < instructions.length; i++) {
        coords = dirMap[instructions[i]](coords);
    }
    toggleTile(coords);
};
var toggleTile = function (coordinates) {
    var key = genKey(coordinates);
    var tile = seenTiles.get(key);
    seenTiles.set(key, !tile);
};
var genKey = function (_a) {
    var x = _a.x, y = _a.y, z = _a.z;
    return x + "_" + y + "_" + z;
};
var parsedInstructions = data.map(parseInstructions);
parsedInstructions.forEach(followInstructions);
var sum = 0;
seenTiles.forEach(function (tile) { return sum += +tile; });
console.log(sum);
