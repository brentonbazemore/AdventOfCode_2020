"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Computer = void 0;
var Computer = /** @class */ (function () {
    function Computer(instructions) {
        var _this = this;
        this.mask = '';
        this.memory = {};
        this.actions = {
            mask: function (params) {
                _this.mask = params.mask;
            },
            mem: function (params) {
                var addressBits = Number(params.address).toString(2).padStart(36, '0');
                var maskedBits = addressBits.split('');
                var xCount = 0;
                for (var i = 0; i < _this.mask.length; i++) {
                    if (_this.mask[i] === '0') {
                        continue;
                    }
                    if (_this.mask[i] === 'X') {
                        maskedBits[i] = _this.mask[i];
                        xCount++;
                    }
                    if (_this.mask[i] === '1') {
                        maskedBits[i] = '1';
                    }
                }
                var combos = Math.pow(2, xCount);
                var impactedAddresses = [];
                for (var i = 0; i < combos; i++) {
                    var binaryAddress = maskedBits.join('');
                    var digits = Number(i).toString(2).padStart(xCount, '0');
                    for (var j = 0; j < xCount; j++) {
                        binaryAddress = binaryAddress.replace('X', digits[j]);
                    }
                    var addr = parseInt(binaryAddress, 2);
                    impactedAddresses.push(addr);
                }
                impactedAddresses.forEach(function (addr) {
                    _this.memory[addr] = params.value;
                });
            },
        };
        this.instructions = instructions;
    }
    Computer.prototype.run = function () {
        var _this = this;
        this.instructions.forEach(function (instruction) {
            var action = instruction.action, params = instruction.params;
            _this.actions[action](params);
        });
        var sum = 0;
        var keys = Object.keys(this.memory);
        keys.forEach(function (key) {
            sum += +_this.memory[key];
        });
        console.log(sum);
    };
    return Computer;
}());
exports.Computer = Computer;
