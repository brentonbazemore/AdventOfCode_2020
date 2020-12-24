import * as fs from 'fs';

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const data: string[] = rawData.split('\n');

interface Coordinates {
  x: number,
  y: number,
  z: number,
}

type Direction = 'e' | 'se' | 'sw' | 'w' | 'nw' | 'ne';

const dirMap = {
  e: ({ x, y, z }: Coordinates) => ({ x: x + 1, y: y - 1, z: z + 0 }),
  se: ({ x, y, z }: Coordinates) => ({ x: x + 0, y: y - 1, z: z + 1 }),
  sw: ({ x, y, z }: Coordinates) => ({ x: x - 1, y: y + 0, z: z + 1 }),
  w: ({ x, y, z }: Coordinates) => ({ x: x - 1, y: y + 1, z: z + 0 }),
  nw: ({ x, y, z }: Coordinates) => ({ x: x + 0, y: y + 1, z: z - 1 }),
  ne: ({ x, y, z }: Coordinates) => ({ x: x + 1, y: y + 0, z: z - 1 }),
};

const parseInstructions = (inst: string) => {
  const instructions: string[] = [];
  const rawInst = inst.split('');
  while (rawInst.length > 0) {
    if (rawInst[0] === 's' || rawInst[0] === 'n') {
      instructions.push(rawInst.splice(0, 2).join(''));
    } else {
      instructions.push(rawInst.shift()!);
    }
  }

  return instructions;
};


const seenTiles = new Map<string, boolean>();
const followInstructions = (instructions: string[]) => {
  let coords = { x: 0, y: 0, z: 0 };
  for (let i = 0; i < instructions.length; i++) {
    coords = dirMap[instructions[i] as Direction](coords);
  }

  toggleTile(coords);
}

const toggleTile = (coordinates: Coordinates) => {
  const key = genKey(coordinates);
  const tile = seenTiles.get(key);

  seenTiles.set(key, !tile);
}

const genKey = ({ x, y, z }: Coordinates) => `${x}_${y}_${z}`;

const parsedInstructions = data.map(parseInstructions);
parsedInstructions.forEach(followInstructions);

let sum = 0;
seenTiles.forEach(tile => sum += +tile);
console.log(sum);