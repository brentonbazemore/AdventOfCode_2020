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
var parseKey = function (key) {
    var _a = key.split('_'), x = _a[0], y = _a[1], z = _a[2];
    return { x: +x, y: +y, z: +z };
};
var expandHexadirectionally = function (tileMap) {
    var expandedMap = new Map();
    tileMap.forEach(function (tile, key) {
        var coordinates = parseKey(key);
        expandedMap.set(key, tile);
        var eKey = genKey(dirMap.e(coordinates));
        var eVal = seenTiles.get(eKey);
        expandedMap.set(eKey, !!eVal);
        var seKey = genKey(dirMap.se(coordinates));
        var seVal = seenTiles.get(seKey);
        expandedMap.set(seKey, !!seVal);
        var swKey = genKey(dirMap.sw(coordinates));
        var swVal = seenTiles.get(swKey);
        expandedMap.set(swKey, !!swVal);
        var wKey = genKey(dirMap.w(coordinates));
        var wVal = seenTiles.get(wKey);
        expandedMap.set(wKey, !!wVal);
        var nwKey = genKey(dirMap.nw(coordinates));
        var nwVal = seenTiles.get(nwKey);
        expandedMap.set(nwKey, !!nwVal);
        var neKey = genKey(dirMap.ne(coordinates));
        var neVal = seenTiles.get(neKey);
        expandedMap.set(neKey, !!neVal);
    });
    seenTiles = expandedMap;
};
var shouldFlip = function (coordinates) {
    var currentTile = seenTiles.get(genKey(coordinates));
    var e = seenTiles.get(genKey(dirMap.e(coordinates)));
    var se = seenTiles.get(genKey(dirMap.se(coordinates)));
    var sw = seenTiles.get(genKey(dirMap.sw(coordinates)));
    var w = seenTiles.get(genKey(dirMap.w(coordinates)));
    var nw = seenTiles.get(genKey(dirMap.nw(coordinates)));
    var ne = seenTiles.get(genKey(dirMap.ne(coordinates)));
    var blackCount = +!!e + +!!se + +!!sw + +!!w + +!!nw + +!!ne;
    if (currentTile) { // is black
        return blackCount === 0 || blackCount > 2;
    }
    else { // is white
        return blackCount === 2;
    }
};
var dailyFlip = function (dayCount) {
    var _loop_1 = function (i) {
        expandHexadirectionally(seenTiles);
        var flippedTiles = new Map();
        seenTiles.forEach(function (tile, key) {
            var coords = parseKey(key);
            if (shouldFlip(coords)) {
                flippedTiles.set(key, !tile);
            }
            else {
                flippedTiles.set(key, tile);
            }
        });
        seenTiles = flippedTiles;
    };
    for (var i = 0; i < dayCount; i++) {
        _loop_1(i);
    }
};
var parsedInstructions = data.map(parseInstructions);
parsedInstructions.forEach(followInstructions);
dailyFlip(100);
var sum = 0;
seenTiles.forEach(function (tile) { return sum += +tile; });
console.log(sum);
