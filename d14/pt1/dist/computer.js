"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Computer = void 0;
var Computer = /** @class */ (function () {
    function Computer(instructions) {
        var _this = this;
        this.mask = '';
        this.memory = [];
        this.actions = {
            mask: function (params) {
                _this.mask = params.mask;
            },
            mem: function (params) {
                var bits = Number(params.value).toString(2).padStart(36, '0');
                var maskedBits = bits.split('');
                for (var i = 0; i < _this.mask.length; i++) {
                    if (_this.mask[i] !== 'X') {
                        maskedBits[i] = _this.mask[i];
                    }
                }
                _this.memory[+params.address] = maskedBits.join('');
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
        console.log(this.memory.reduce(function (prev, cur) {
            var dec = parseInt(cur, 2);
            return prev + dec;
        }, 0));
    };
    return Computer;
}());
exports.Computer = Computer;
