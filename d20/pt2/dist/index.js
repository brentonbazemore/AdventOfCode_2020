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
var rawData = fs.readFileSync('input.txt', 'utf8');
var data = rawData.split('\n\n');
var SIDE = {
    TOP: 0,
    RIGHT: 1,
    BOTTOM: 2,
    LEFT: 3,
};
var Tile = /** @class */ (function () {
    function Tile(init) {
        var d = init.split('\n');
        this.id = +d[0].split(':')[0].split(' ')[1];
        this.rotation = 0;
        this.flipped = false;
        var left = [];
        var right = [];
        var lastCol = 9;
        for (var i = 1; i < d.length; i++) {
            left.push(d[i][0]);
            right.push(d[i][lastCol]);
        }
        // for (let i = d.length - 1; i >= 1; i--) {
        // }
        this.edges = [
            d[1],
            right.join(''),
            d[d.length - 1],
            left.join(''),
        ];
    }
    return Tile;
}());
var tiles = data.map(function (d) { return new Tile(d); });
var findMatch = function (tile, availableTiles) {
    // console.log(tile.id);
    var siblings = [];
    for (var i = 0; i < tile.edges.length; i++) {
        var edge = tile.edges[i];
        for (var j = 0; j < availableTiles.length; j++) {
            var newTile = availableTiles[j];
            if (newTile.edges.includes(edge)) {
                // console.log('found it', newTile.id);
                siblings.push(newTile.id);
            }
        }
        for (var j = 0; j < availableTiles.length; j++) {
            var newTile = availableTiles[j];
            if (newTile.edges.map(function (s) { return s.split('').reverse().join(''); }).includes(edge)) {
                // console.log('found it flipped', newTile.id);
                siblings.push(newTile.id);
            }
        }
    }
    return siblings;
};
var checked = [];
for (var i = 0; i < tiles.length; i++) {
    var newTiles = __spreadArrays(tiles);
    var t = newTiles.splice(i, 1)[0];
    checked.push({ id: t.id, siblings: findMatch(t, newTiles) });
}
var result = checked.filter((function (c) { return c.siblings.length === 2; }))
    .reduce(function (prev, cur) { return cur.id * prev; }, 1);
console.log(result);
