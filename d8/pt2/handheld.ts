export class Handheld {
  private accumulator = 0;
  private pointer = 0;
  private instructionMap = {
    'acc': (argument: number) => {
      this.accumulator += argument;
      this.pointer++;
    },
    'jmp': (argument: number) => {
      this.pointer += argument;
    },
    'nop': (argument: number) => {
      this.pointer++;
    },
  };

  private data;

  constructor(data: string[]) {
    this.data = data;
  }

  run() {
    const instructionSet = new Set();
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

      const instruction = this.data[this.pointer];
      const [operation, argument] = instruction.split(' ');

      this.instructionMap[operation as 'acc' | 'jmp' | 'nop'](+argument);
    }
  }
}