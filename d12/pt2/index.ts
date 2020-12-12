import * as fs from 'fs';

interface Ship {
  direction: number;
  x: number;
  y: number;
}

interface Instruction {
  action: string;
  magnitude: number;
}

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const data: string[] = rawData.split('\n');

const parseInstruction = (line: string) => {
  const action = line[0] as 'N' | 'S' | 'E' | 'W' | 'R' | 'L' | 'F';
  const magnitude = +line.slice(1);

  return { action, magnitude };
}

const DIRECTION = {
  EAST: 0,
  0: 'EAST',
  SOUTH: 1,
  1: 'SOUTH',
  WEST: 2,
  2: 'WEST',
  NORTH: 3,
  3: 'NORTH',
};

const actions = {
  N: (ship: Ship, magnitude: number) => ship.y += magnitude,
  S: (ship: Ship, magnitude: number) => ship.y -= magnitude,
  E: (ship: Ship, magnitude: number) => ship.x += magnitude,
  W: (ship: Ship, magnitude: number) => ship.x -= magnitude,
  L: (ship: Ship, magnitude: number) => {
    const turn = magnitude / 90;
    const dir = (ship.direction - turn + 4) % 4;
    ship.direction = dir;
  },
  R: (ship: Ship, magnitude: number) => {
    const turn = magnitude / 90;
    const dir = (ship.direction + turn) % 4;
    ship.direction = dir;
  },
  F: (ship: Ship, magnitude: number) => {
    if (ship.direction === DIRECTION.EAST) {
      actions.E(ship, magnitude);
    }
    if (ship.direction === DIRECTION.SOUTH) {
      actions.S(ship, magnitude);
    }
    if (ship.direction === DIRECTION.WEST) {
      actions.W(ship, magnitude);
    }
    if (ship.direction === DIRECTION.NORTH) {
      actions.N(ship, magnitude);
    }
  }
}

let ship = {
  direction: DIRECTION.EAST,
  x: 0,
  y: 0,
};

for (let i = 0; i < data.length; i++) {
  const line = data[i];
  const { action, magnitude } = parseInstruction(line);
  actions[action](ship, magnitude);
}

console.log(ship);
const distance = Math.abs(ship.x) + Math.abs(ship.y);
console.log(distance);