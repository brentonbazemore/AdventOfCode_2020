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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var _d = require('2d-array-rotation'), rotate = _d.rotate, hflip = _d.hflip;
var rawData = fs.readFileSync('input.txt', 'utf8');
var data = rawData.split('\n\n');
var DIRECTION;
(function (DIRECTION) {
    DIRECTION[DIRECTION["UP"] = 0] = "UP";
    DIRECTION[DIRECTION["RIGHT"] = 1] = "RIGHT";
    DIRECTION[DIRECTION["DOWN"] = 2] = "DOWN";
    DIRECTION[DIRECTION["LEFT"] = 3] = "LEFT";
})(DIRECTION || (DIRECTION = {}));
var Tile = /** @class */ (function () {
    function Tile(init) {
        this.links = {
            0: null,
            1: null,
            2: null,
            3: null,
        };
        this.hasTransformed = false;
        this.hasSet = false;
        var d = init.split('\n');
        this.id = +d[0].split(':')[0].split(' ')[1];
        this.flipped = false;
        var rows = [];
        for (var i = 1; i < d.length; i++) {
            rows.push(d[i].split(''));
        }
        this.fullPiece = rows;
        this.location = { x: NaN, y: NaN };
    }
    Tile.prototype.setLocation = function (anchor, direction) {
        this.hasSet = true;
        switch (direction) {
            case DIRECTION.UP:
                this.location = { x: anchor.x, y: anchor.y + 1 };
                break;
            case DIRECTION.RIGHT:
                this.location = { x: anchor.x + 1, y: anchor.y };
                break;
            case DIRECTION.DOWN:
                this.location = { x: anchor.x, y: anchor.y - 1 };
                break;
            case DIRECTION.LEFT:
                this.location = { x: anchor.x - 1, y: anchor.y };
                break;
            default:
                throw new Error('idk');
        }
    };
    Tile.prototype.setLink = function (thisEdge, otherTile) {
        this.links[thisEdge] = otherTile;
    };
    Tile.prototype.rotate = function (degrees) {
        this.fullPiece = rotate(this.fullPiece, degrees);
        this.hasTransformed = true;
    };
    Tile.prototype.flip = function () {
        this.fullPiece = hflip(this.fullPiece);
        this.flipped = !this.flipped;
        this.hasTransformed = true;
    };
    return Tile;
}());
var tiles = data.map(function (d) { return new Tile(d); });
var dimensions = Math.sqrt(tiles.length);
var puzzle = {};
var topOf = function (t) { return t.fullPiece[0].join(''); };
var rigthOf = function (t) {
    var out = [];
    for (var i = 0; i < t.fullPiece.length; i++) {
        out.push(t.fullPiece[i][9]);
    }
    return out.join('');
};
var bottomOf = function (t) { return t.fullPiece[t.fullPiece.length - 1].join(''); };
var leftOf = function (t) {
    var out = [];
    for (var i = 0; i < t.fullPiece.length; i++) {
        out.push(t.fullPiece[i][0]);
    }
    return out.join('');
};
var findMatch = function (tile, availableTiles) {
    if (isNaN(tile.location.x)) {
        return;
    }
    for (var j = 0; j < availableTiles.length; j++) {
        var newTile = availableTiles[j];
        if (tile.id === newTile.id || newTile.hasSet) {
            continue;
        }
        for (var rotation = 0; rotation < 4; rotation++) {
            if (topOf(tile) === bottomOf(newTile)) {
                newTile.setLocation(tile.location, DIRECTION.UP);
                break;
            }
            else if (bottomOf(tile) === topOf(newTile)) {
                newTile.setLocation(tile.location, DIRECTION.DOWN);
                break;
            }
            else if (leftOf(tile) === rigthOf(newTile)) {
                newTile.setLocation(tile.location, DIRECTION.LEFT);
                break;
            }
            else if (rigthOf(tile) === leftOf(newTile)) {
                newTile.setLocation(tile.location, DIRECTION.RIGHT);
                break;
            }
            newTile.rotate(90);
        }
    }
    for (var j = 0; j < availableTiles.length; j++) {
        var newTile = availableTiles[j];
        if (tile.id === newTile.id || newTile.hasSet) {
            continue;
        }
        newTile.flip();
        for (var rotation = 0; rotation < 4; rotation++) {
            if (topOf(tile) === bottomOf(newTile)) {
                newTile.setLocation(tile.location, DIRECTION.UP);
                break;
            }
            else if (bottomOf(tile) === topOf(newTile)) {
                newTile.setLocation(tile.location, DIRECTION.DOWN);
                break;
            }
            else if (leftOf(tile) === rigthOf(newTile)) {
                newTile.setLocation(tile.location, DIRECTION.LEFT);
                break;
            }
            else if (rigthOf(tile) === leftOf(newTile)) {
                newTile.setLocation(tile.location, DIRECTION.RIGHT);
                break;
            }
            newTile.rotate(90);
        }
    }
};
tiles[0].setLocation({ x: 0, y: -1 }, DIRECTION.UP);
for (var i = 0; i < tiles.length * 8; i++) {
    var t = tiles[i % tiles.length];
    findMatch(t, tiles);
}
var minX = Infinity;
var minY = Infinity;
var maxX = -Infinity;
var maxY = -Infinity;
for (var i = 0; i < tiles.length; i++) {
    var t = tiles[i];
    minX = Math.min(minX, t.location.x);
    maxX = Math.max(maxX, t.location.x);
    minY = Math.min(minY, t.location.y);
    maxY = Math.max(maxY, t.location.y);
    puzzle[tiles[i].location.x + "_" + tiles[i].location.y] = tiles[i];
}
// for (let j = minY; j <= maxY; j++) {
//   let row = [];
//   for (let i = minX; i <= maxX; i++) {
//     row.push(puzzle[`${i}_${j}`]?.id || '  ');
//   }
//   console.log(row);
// }
var fullPuzzle = [];
for (var j = minY; j <= maxY; j++) {
    var row = [];
    for (var i = minX; i <= maxX; i++) {
        var fullPiece = (_a = puzzle[i + "_" + j]) === null || _a === void 0 ? void 0 : _a.fullPiece.reverse(); // reverse here to go bottom up
        for (var k = 1; k < 9; k++) {
            var inner = fullPiece[k].slice(1, fullPiece[k].length - 1).join('');
            row[k - 1] = (row[k - 1] || '') + inner;
        }
    }
    fullPuzzle.push.apply(fullPuzzle, row);
}
var overwrite = function (puzz, x, y) {
    var explodedHead = puzz[y].split('');
    explodedHead[x + 18] = 'O';
    puzz[y] = explodedHead.join('');
    var explodedBack = puzz[y + 1].split('');
    explodedBack[x + 0] = 'O';
    explodedBack[x + 5] = 'O';
    explodedBack[x + 6] = 'O';
    explodedBack[x + 11] = 'O';
    explodedBack[x + 12] = 'O';
    explodedBack[x + 17] = 'O';
    explodedBack[x + 18] = 'O';
    explodedBack[x + 19] = 'O';
    puzz[y + 1] = explodedBack.join('');
    var explodedStomach = puzz[y + 2].split('');
    explodedStomach[x + 1] = 'O';
    explodedStomach[x + 4] = 'O';
    explodedStomach[x + 7] = 'O';
    explodedStomach[x + 10] = 'O';
    explodedStomach[x + 13] = 'O';
    explodedStomach[x + 16] = 'O';
    puzz[y + 2] = explodedStomach.join('');
};
// Test input
// fullPuzzle = hflip(fullPuzzle).map((m: string[]) => m.join(''));
// fullPuzzle = rotate(fullPuzzle, 270).map((m: string[]) => m.join(''));
// Real input
fullPuzzle = hflip(fullPuzzle).map(function (m) { return m.join(''); });
fullPuzzle = rotate(fullPuzzle, 90).map(function (m) { return m.join(''); });
var head = new RegExp(/.{18}#.{1}/);
var back = new RegExp(/#.{4}##.{4}##.{4}###/);
var stomach = new RegExp(/.{1}#.{2}#.{2}#.{2}#.{2}#.{2}#.{3}/);
for (var y = 2; y < fullPuzzle.length; y++) {
    var headResult = matchOverlap(fullPuzzle[y - 2], head);
    var backResult = matchOverlap(fullPuzzle[y - 1], back);
    var stomachResult = matchOverlap(fullPuzzle[y], stomach);
    if (headResult.length > 0 && backResult.length > 0 && stomachResult.length > 0) {
        console.log('candidate');
        var _loop_1 = function (i) {
            var backIndex = backResult[i].index;
            var headIndex = (_b = headResult.find(function (h) { return h.index === backIndex; })) === null || _b === void 0 ? void 0 : _b.index;
            var stomachIndex = (_c = stomachResult.find(function (s) { return s.index === backIndex; })) === null || _c === void 0 ? void 0 : _c.index;
            // console.log(headIndex, stomachIndex, backIndex);
            if (backIndex === headIndex && headIndex === stomachIndex) {
                overwrite(fullPuzzle, backIndex, y - 2);
            }
        };
        for (var i = 0; i < backResult.length; i++) {
            _loop_1(i);
        }
        // console.log('candidate');
        // console.log(headResult)
        // console.log(backResult)
        // console.log(stomachResult)
    }
    // if (backResult != null && stomachResult != null) {
    //   if (backResult.index === stomachResult.index) {
    //     const headString = fullPuzzle[i - 2].substring(backResult.index);
    //     console.log(headString);
    //     const headResult = head.exec(headString);
    //     console.log('potential', backResult.index, stomachResult.index);
    //     console.log(headResult);
    //     if (0 === headResult?.index) {
    //       console.log('did it make the cut?');
    //       overwrite(fullPuzzle, backResult.index, i - 2);
    //     }
    //   }
    // }
    // if (headResult != null && backResult != null && stomachResult != null) {
    //   console.log('found one, but not linked?')
    //   if (headResult.index === backResult.index && backResult.index === stomachResult.index) {
    //     console.log('found one');
    //   }
    // }
}
console.log(fullPuzzle);
var count = 0;
for (var y = 0; y < fullPuzzle.length; y++) {
    for (var x = 0; x < fullPuzzle[0].length; x++) {
        if (fullPuzzle[y][x] === '#') {
            count++;
        }
    }
}
console.log(count);
// check; build the puzzle
// check; strip the edges
// not needed; output the result to 'cache' it
// find the first orientation that has some dragons, then find the rest of the dragons
function matchOverlap(input, re) {
    var r = [], m;
    // prevent infinite loops
    if (!re.global)
        re = new RegExp(re.source, (re + '').split('/').pop() + 'g');
    while (m = re.exec(input)) {
        re.lastIndex -= m[0].length - 1;
        r.push({ string: m[0], index: m.index });
    }
    return r;
}
