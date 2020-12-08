"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handheld = void 0;
var Handheld = /** @class */ (function () {
    function Handheld(data) {
        var _this = this;
        this.accumulator = 0;
        this.pointer = 0;
        this.instructionMap = {
            'acc': function (argument) {
                _this.accumulator += argument;
                _this.pointer++;
            },
            'jmp': function (argument) {
                _this.pointer += argument;
            },
            'nop': function (argument) {
                _this.pointer++;
            },
        };
        this.data = data;
    }
    Handheld.prototype.run = function () {
        var instructionSet = new Set();
        while (true) {
            if (instructionSet.has(this.pointer)) {
                console.log('Infinite loop: ', this.accumulator);
                break;
            }
            if (this.pointer >= this.data.length) {
                console.log('End of program: ', this.accumulator);
                return;
            }
            instructionSet.add(this.pointer);
            var instruction = this.data[this.pointer];
            var _a = instruction.split(' '), operation = _a[0], argument = _a[1];
            this.instructionMap[operation](+argument);
        }
    };
    return Handheld;
}());
exports.Handheld = Handheld;
