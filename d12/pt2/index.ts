import * as fs from 'fs';

interface Ship {
  x: number;
  y: number;
  waypoint: {
    x: number;
    y: number;
  }
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

const clockwise = {
  90: (x: number, y: number) => ({ x: y, y: -x }),
  180: (x: number, y: number) => ({ x: -x, y: -y }),
  270: (x: number, y: number) => ({ x: -y, y: x }),
}

const counterClockwise = {
  90: (x: number, y: number) => ({ x: -y, y: x }),
  180: (x: number, y: number) => ({ x: -x, y: -y }),
  270: (x: number, y: number) => ({ x: y, y: -x }),
}

const actions = {
  N: (ship: Ship, magnitude: number) => ship.waypoint.y += magnitude,
  S: (ship: Ship, magnitude: number) => ship.waypoint.y -= magnitude,
  E: (ship: Ship, magnitude: number) => ship.waypoint.x += magnitude,
  W: (ship: Ship, magnitude: number) => ship.waypoint.x -= magnitude,
  L: (ship: Ship, magnitude: number) => {
    const turn = magnitude as 90 | 180 | 270;
    ship.waypoint = counterClockwise[turn](ship.waypoint.x, ship.waypoint.y);
  },
  R: (ship: Ship, magnitude: number) => {
    const turn = magnitude as 90 | 180 | 270;
    ship.waypoint = clockwise[turn](ship.waypoint.x, ship.waypoint.y);
  },
  F: (ship: Ship, magnitude: number) => {
    ship.x += ship.waypoint.x * magnitude;
    ship.y += ship.waypoint.y * magnitude;
  }
}

let ship = {
  x: 0,
  y: 0,
  waypoint: {
    x: 10,
    y: 1,
  }
};

for (let i = 0; i < data.length; i++) {
  const line = data[i];
  const { action, magnitude } = parseInstruction(line);
  actions[action](ship, magnitude);
}

console.log(ship);
const distance = Math.abs(ship.x) + Math.abs(ship.y);
console.log(distance);