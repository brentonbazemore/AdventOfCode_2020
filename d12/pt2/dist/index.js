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
var clockwise = {
    90: function (x, y) { return ({ x: y, y: -x }); },
    180: function (x, y) { return ({ x: -x, y: -y }); },
    270: function (x, y) { return ({ x: -y, y: x }); },
};
var counterClockwise = {
    90: function (x, y) { return ({ x: -y, y: x }); },
    180: function (x, y) { return ({ x: -x, y: -y }); },
    270: function (x, y) { return ({ x: y, y: -x }); },
};
var actions = {
    N: function (ship, magnitude) { return ship.waypoint.y += magnitude; },
    S: function (ship, magnitude) { return ship.waypoint.y -= magnitude; },
    E: function (ship, magnitude) { return ship.waypoint.x += magnitude; },
    W: function (ship, magnitude) { return ship.waypoint.x -= magnitude; },
    L: function (ship, magnitude) {
        var turn = magnitude;
        ship.waypoint = counterClockwise[turn](ship.waypoint.x, ship.waypoint.y);
    },
    R: function (ship, magnitude) {
        var turn = magnitude;
        ship.waypoint = clockwise[turn](ship.waypoint.x, ship.waypoint.y);
    },
    F: function (ship, magnitude) {
        ship.x += ship.waypoint.x * magnitude;
        ship.y += ship.waypoint.y * magnitude;
    }
};
var ship = {
    x: 0,
    y: 0,
    waypoint: {
        x: 10,
        y: 1,
    }
};
for (var i = 0; i < data.length; i++) {
    var line = data[i];
    var _a = parseInstruction(line), action = _a.action, magnitude = _a.magnitude;
    actions[action](ship, magnitude);
}
console.log(ship);
var distance = Math.abs(ship.x) + Math.abs(ship.y);
console.log(distance);
