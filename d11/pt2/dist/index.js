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
var data = rawData.split('\n');
// 1 2 3
// 4 5 6
// 7 8 9
var EMPTY = 'L';
var OCCUPIED = '#';
var FLOOR = '.';
var isFloor = function (x, y, model) {
    return model[y][x] === FLOOR;
};
var isEmpty = function (x, y, model) {
    return model[y][x] === EMPTY;
};
var isOccupied = function (x, y, model) {
    return model[y][x] === OCCUPIED;
};
var getOccupiedCount = function (x, y, model) {
    var count = 0;
    count += checkHoriz(x, y, model);
    count += checkVert(x, y, model);
    count += checkDiag(x, y, model);
    return count;
};
var checkHoriz = function (x, y, model) {
    var BOUNDS = { y: model.length, x: model[0].length };
    var count = 0;
    // positive x
    var distance = 1;
    while (true) {
        if (x + distance >= BOUNDS.x) {
            break;
        }
        var val = model[y][x + distance];
        if (val === OCCUPIED) {
            count++;
            break;
        }
        if (val === EMPTY) {
            break;
        }
        distance++;
    }
    // negative x
    distance = 1;
    while (true) {
        if (x - distance < 0) {
            break;
        }
        var val = model[y][x - distance];
        if (val === OCCUPIED) {
            count++;
            break;
        }
        if (val === EMPTY) {
            break;
        }
        distance++;
    }
    return count;
};
var checkVert = function (x, y, model) {
    var BOUNDS = { y: model.length, x: model[0].length };
    var count = 0;
    // positive y
    var distance = 1;
    while (true) {
        if (y + distance >= BOUNDS.y) {
            break;
        }
        var val = model[y + distance][x];
        if (val === OCCUPIED) {
            count++;
            break;
        }
        if (val === EMPTY) {
            break;
        }
        distance++;
    }
    // negative x
    distance = 1;
    while (true) {
        if (y - distance < 0) {
            break;
        }
        var val = model[y - distance][x];
        if (val === OCCUPIED) {
            count++;
            break;
        }
        if (val === EMPTY) {
            break;
        }
        distance++;
    }
    return count;
};
var checkDiag = function (x, y, model) {
    var BOUNDS = { y: model.length, x: model[0].length };
    var count = 0;
    // positive y, positive x
    var distance = 1;
    while (true) {
        if (y + distance >= BOUNDS.y || x + distance >= BOUNDS.x) {
            break;
        }
        var val = model[y + distance][x + distance];
        if (val === OCCUPIED) {
            count++;
            break;
        }
        if (val === EMPTY) {
            break;
        }
        distance++;
    }
    // negative x, positive y
    distance = 1;
    while (true) {
        if (y + distance >= BOUNDS.y || x - distance < 0) {
            break;
        }
        var val = model[y + distance][x - distance];
        if (val === OCCUPIED) {
            count++;
            break;
        }
        if (val === EMPTY) {
            break;
        }
        distance++;
    }
    // negative x, positive y
    distance = 1;
    while (true) {
        if (y - distance < 0 || x + distance >= BOUNDS.x) {
            break;
        }
        var val = model[y - distance][x + distance];
        if (val === OCCUPIED) {
            count++;
            break;
        }
        if (val === EMPTY) {
            break;
        }
        distance++;
    }
    // negative x, negative y
    distance = 1;
    while (true) {
        if (y - distance < 0 || x - distance < 0) {
            break;
        }
        var val = model[y - distance][x - distance];
        if (val === OCCUPIED) {
            count++;
            break;
        }
        if (val === EMPTY) {
            break;
        }
        distance++;
    }
    return count;
};
var checkDiff = function (x, cur, next) {
    return cur[x] === next[x] ? 0 : 1;
};
var runRound = function (oldData) {
    var curData = __spreadArrays(oldData);
    var newData = [];
    var diffs = 0;
    for (var y = 0; y < curData.length; y++) {
        var seatRow = curData[y];
        var newRow = '';
        for (var x = 0; x < seatRow.length; x++) {
            if (isFloor(x, y, curData)) {
                newRow += FLOOR;
                continue;
            }
            if (isEmpty(x, y, curData) && getOccupiedCount(x, y, curData) === 0) {
                newRow += OCCUPIED;
            }
            else if (isOccupied(x, y, curData) && getOccupiedCount(x, y, curData) >= 5) {
                newRow += EMPTY;
            }
            else {
                newRow += seatRow[x];
            }
            diffs += checkDiff(x, seatRow, newRow);
        }
        newData.push(newRow);
    }
    return { result: newData, diffs: diffs };
};
var freshData = data;
while (true) {
    var _a = runRound(freshData), result = _a.result, diffs = _a.diffs;
    freshData = result;
    if (diffs === 0) {
        break;
    }
}
var totalOccupiedCount = 0;
for (var y = 0; y < freshData.length; y++) {
    var row = freshData[y];
    for (var x = 0; x < row.length; x++) {
        if (row[x] === OCCUPIED) {
            totalOccupiedCount++;
        }
    }
}
console.log(totalOccupiedCount);
