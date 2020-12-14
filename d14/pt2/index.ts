import * as fs from 'fs';
import { Computer } from './computer';

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const data: string[] = rawData.split('\n');

const instructions = data.map((line) => {
  const [action, value] = line.split(' = ');

  if (action === 'mask') {
    return { action, params: { mask: value } };
  }

  const [mem, dirtyAddress] = action.split('[');
  const address = dirtyAddress.replace(']', '');

  return { action: mem, params: { address, value } }
});

const computer = new Computer(instructions);
computer.run();
