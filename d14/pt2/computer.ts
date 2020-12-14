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
  memory: { [ind: string]: string } = {};

  actions = {
    mask: (params: { mask: string }) => {
      this.mask = params.mask;
    },
    mem: (params: { address: string, value: string }) => {
      const addressBits = Number(params.address).toString(2).padStart(36, '0');
      const maskedBits = addressBits.split('');
      let xCount = 0;
      for (let i = 0; i < this.mask.length; i++) {
        if (this.mask[i] === '0') {
          continue;
        }

        if (this.mask[i] === 'X') {
          maskedBits[i] = this.mask[i];
          xCount++;
        }

        if (this.mask[i] === '1') {
          maskedBits[i] = '1';
        }
      }

      const combos = 2 ** xCount;
      const impactedAddresses: number[] = [];
      for (let i = 0; i < combos; i++) {
        let binaryAddress = maskedBits.join('');
        let digits = Number(i).toString(2).padStart(xCount, '0');
        for (let j = 0; j < xCount; j++) {
          binaryAddress = binaryAddress.replace('X', digits[j]);
        }
        const addr = parseInt(binaryAddress, 2);
        impactedAddresses.push(addr);
      }

      impactedAddresses.forEach((addr) => {
        this.memory[addr] = params.value;
      });
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

    let sum = 0;
    const keys = Object.keys(this.memory);
    keys.forEach((key) => {
      sum += +this.memory[key];
    });

    console.log(sum);
  }
}