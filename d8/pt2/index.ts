import * as fs from 'fs';
import { Handheld } from './handheld';

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const data: string[] = rawData.split('\n');

for (let i = 0; i < data.length; i++) {
  if (data[i].includes('nop')) {
    const newInstruction = data[i].replace('nop', 'jmp');
    const newData = [...data];
    newData[i] = newInstruction;
    new Handheld(newData).run();
  }
}

for (let i = 0; i < data.length; i++) {
  if (data[i].includes('jmp')) {
    const newInstruction = data[i].replace('jmp', 'nop');
    const newData = [...data];
    newData[i] = newInstruction;
    new Handheld(newData).run();
  }
}
