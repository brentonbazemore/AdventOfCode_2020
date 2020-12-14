interface Mask {
  action: string;
  params: {
    mask: string;
  };
}

interface Mem {
  action: string;
  params: {
    address: string;
    value: string;
  };
}

type Instruction = Mask | Mem;

export class Computer {
  instructions;

  mask = '';
  memory: string[] = [];

  actions = {
    mask: (params: { mask: string }) => {
      this.mask = params.mask;
    },
    mem: (params: { address: string, value: string }) => {
      const bits = Number(params.value).toString(2).padStart(36, '0');
      const maskedBits = bits.split('');
      for (let i = 0; i < this.mask.length; i++) {
        if (this.mask[i] !== 'X') {
          maskedBits[i] = this.mask[i];
        }
      }
      this.memory[+params.address] = maskedBits.join('');
    },
  }

  constructor(instructions: Instruction[]) {
    this.instructions = instructions;
  }

  run() {
    this.instructions.forEach((instruction) => {
      const { action, params } = instruction;
      this.actions[action as 'mask' | 'mem'](params as any);
    });

    console.log(this.memory.reduce((prev, cur) => {
      const dec = parseInt(cur, 2);
      return prev + dec;
    }, 0));
  }
}