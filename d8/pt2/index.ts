import * as fs from 'fs';

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const data: string[] = rawData.split('\n');

let accumulator = 0;
let pointer = 0;
const instructionMap = {
  'acc': (argument: number) => {
    accumulator += argument;
    pointer++;
  },
  'jmp': (argument: number) => {
    pointer += argument;
  },
  'nop': (argument: number) => {
    pointer++;
  },
};

const instructionSet = new Set();
while (true) {

  if (instructionSet.has(pointer)) {
    console.log(accumulator);
    break;
  }

  instructionSet.add(pointer);

  const instruction = data[pointer];
  const [operation, argument] = instruction.split(' ');

  instructionMap[operation as 'acc' | 'jmp' | 'nop'](+argument);
}