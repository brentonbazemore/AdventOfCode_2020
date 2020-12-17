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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var logDimension = function (dim) {
    var _a, _b;
    for (var z = bounds.z[0]; z <= bounds.z[1]; z++) {
        console.log('\nz =', z);
        for (var y = bounds.y[0]; y <= bounds.y[1]; y++) {
            var row = '';
            for (var x = bounds.x[0]; x <= bounds.x[1]; x++) {
                var state = ((_b = (_a = dim === null || dim === void 0 ? void 0 : dim[z]) === null || _a === void 0 ? void 0 : _a[y]) === null || _b === void 0 ? void 0 : _b[x]) || INACTIVE;
                row += state;
            }
            console.log(row);
        }
    }
};
var rawData = fs.readFileSync('input.txt', 'utf8');
var data = rawData.split('\n').map(function (s) { return s.split(''); });
var ACTIVE = '#';
var INACTIVE = '.';
var bounds = {
    x: [-1, data[0].length],
    y: [-1, data.length],
    z: [-1, 1],
};
var pocketDimension = [data];
// logDimension(pocketDimension);
var checkState = function (x, y, z) {
    var _a, _b;
    var state = (_b = (_a = pocketDimension === null || pocketDimension === void 0 ? void 0 : pocketDimension[z]) === null || _a === void 0 ? void 0 : _a[y]) === null || _b === void 0 ? void 0 : _b[x];
    return state === ACTIVE ? ACTIVE : INACTIVE;
};
var checkNeighbors = function (x, y, z) {
    var activeCount = 0;
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            for (var k = -1; k <= 1; k++) {
                if (i === 0 && j === 0 && k === 0) {
                    continue;
                }
                var state = checkState(x + k, y + j, z + i);
                if (state === ACTIVE) {
                    activeCount++;
                }
            }
        }
    }
    return activeCount;
};
var safeAdd = function (dimension, x, y, z, value) {
    if (!dimension[z]) {
        dimension[z] = [];
    }
    if (!dimension[z][y]) {
        dimension[z][y] = [];
    }
    dimension[z][y][x] = value;
};
var CYCLE_COUNT = 6;
for (var cycle = 0; cycle < CYCLE_COUNT; cycle++) {
    console.log('cycle: ', cycle + 1);
    var newDimension = [];
    for (var z = bounds.z[0]; z <= bounds.z[1]; z++) {
        for (var y = bounds.y[0]; y <= bounds.y[1]; y++) {
            for (var x = bounds.x[0]; x <= bounds.x[1]; x++) {
                var curState = checkState(x, y, z);
                var count = checkNeighbors(x, y, z);
                if (curState === ACTIVE) {
                    if (count === 2 || count === 3) {
                        safeAdd(newDimension, x, y, z, ACTIVE); // active
                    }
                    else {
                        safeAdd(newDimension, x, y, z, INACTIVE); // inactive
                    }
                }
                else { // === INACTIVE
                    if (count === 3) {
                        safeAdd(newDimension, x, y, z, ACTIVE); // active
                    }
                    else {
                        safeAdd(newDimension, x, y, z, INACTIVE); // inactive
                    }
                }
            }
        }
    }
    bounds.x = [bounds.x[0] - 1, bounds.x[1] + 1];
    bounds.y = [bounds.y[0] - 1, bounds.y[1] + 1];
    bounds.z = [bounds.z[0] - 1, bounds.z[1] + 1];
    pocketDimension = newDimension;
}
// logDimension(pocketDimension);
var activeCount = 0;
for (var z = bounds.z[0]; z <= bounds.z[1]; z++) {
    for (var y = bounds.y[0]; y <= bounds.y[1]; y++) {
        for (var x = bounds.x[0]; x <= bounds.x[1]; x++) {
            if (((_b = (_a = pocketDimension === null || pocketDimension === void 0 ? void 0 : pocketDimension[z]) === null || _a === void 0 ? void 0 : _a[y]) === null || _b === void 0 ? void 0 : _b[x]) === ACTIVE) {
                activeCount++;
            }
        }
    }
}
console.log(activeCount);
