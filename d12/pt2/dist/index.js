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
var parseInstruction = function (line) {
    var action = line[0];
    var magnitude = +line.slice(1);
    return { action: action, magnitude: magnitude };
};
var DIRECTION = {
    EAST: 0,
    0: 'EAST',
    SOUTH: 1,
    1: 'SOUTH',
    WEST: 2,
    2: 'WEST',
    NORTH: 3,
    3: 'NORTH',
};
var actions = {
    N: function (ship, magnitude) { return ship.y += magnitude; },
    S: function (ship, magnitude) { return ship.y -= magnitude; },
    E: function (ship, magnitude) { return ship.x += magnitude; },
    W: function (ship, magnitude) { return ship.x -= magnitude; },
    L: function (ship, magnitude) {
        var turn = magnitude / 90;
        var dir = (ship.direction - turn + 4) % 4;
        ship.direction = dir;
    },
    R: function (ship, magnitude) {
        var turn = magnitude / 90;
        var dir = (ship.direction + turn) % 4;
        ship.direction = dir;
    },
    F: function (ship, magnitude) {
        if (ship.direction === DIRECTION.EAST) {
            actions.E(ship, magnitude);
        }
        if (ship.direction === DIRECTION.SOUTH) {
            actions.S(ship, magnitude);
        }
        if (ship.direction === DIRECTION.WEST) {
            actions.W(ship, magnitude);
        }
        if (ship.direction === DIRECTION.NORTH) {
            actions.N(ship, magnitude);
        }
    }
};
var ship = {
    direction: DIRECTION.EAST,
    x: 0,
    y: 0,
};
for (var i = 0; i < data.length; i++) {
    var line = data[i];
    var _a = parseInstruction(line), action = _a.action, magnitude = _a.magnitude;
    actions[action](ship, magnitude);
}
console.log(ship);
var distance = Math.abs(ship.x) + Math.abs(ship.y);
console.log(distance);
