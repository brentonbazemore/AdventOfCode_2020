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


let seenTiles = new Map<string, boolean>();
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
const parseKey = (key: string): Coordinates => {
  const [x, y, z] = key.split('_');
  return { x: +x, y: +y, z: +z };
}

const expandHexadirectionally = (tileMap: Map<string, boolean>) => {
  const expandedMap = new Map<string, boolean>();
  tileMap.forEach((tile, key) => {
    const coordinates = parseKey(key);
    expandedMap.set(key, tile);

    const eKey = genKey(dirMap.e(coordinates));
    const eVal = seenTiles.get(eKey);
    expandedMap.set(eKey, !!eVal);

    const seKey = genKey(dirMap.se(coordinates));
    const seVal = seenTiles.get(seKey);
    expandedMap.set(seKey, !!seVal);

    const swKey = genKey(dirMap.sw(coordinates));
    const swVal = seenTiles.get(swKey);
    expandedMap.set(swKey, !!swVal);

    const wKey = genKey(dirMap.w(coordinates));
    const wVal = seenTiles.get(wKey);
    expandedMap.set(wKey, !!wVal);

    const nwKey = genKey(dirMap.nw(coordinates));
    const nwVal = seenTiles.get(nwKey);
    expandedMap.set(nwKey, !!nwVal);

    const neKey = genKey(dirMap.ne(coordinates));
    const neVal = seenTiles.get(neKey);
    expandedMap.set(neKey, !!neVal);
  });

  seenTiles = expandedMap;
}

const shouldFlip = (coordinates: Coordinates) => {
  const currentTile = seenTiles.get(genKey(coordinates));

  const e = seenTiles.get(genKey(dirMap.e(coordinates)));
  const se = seenTiles.get(genKey(dirMap.se(coordinates)));
  const sw = seenTiles.get(genKey(dirMap.sw(coordinates)));
  const w = seenTiles.get(genKey(dirMap.w(coordinates)));
  const nw = seenTiles.get(genKey(dirMap.nw(coordinates)));
  const ne = seenTiles.get(genKey(dirMap.ne(coordinates)));

  const blackCount = +!!e + +!!se + +!!sw + +!!w + +!!nw + +!!ne;
  if (currentTile) { // is black
    return blackCount === 0 || blackCount > 2;
  } else { // is white
    return blackCount === 2;
  }
}

const dailyFlip = (dayCount: number) => {
  for (let i = 0; i < dayCount; i++) {
    expandHexadirectionally(seenTiles);
    const flippedTiles = new Map();

    seenTiles.forEach((tile, key) => {
      const coords = parseKey(key);
      if (shouldFlip(coords)) {
        flippedTiles.set(key, !tile);
      } else {
        flippedTiles.set(key, tile);
      }
    });

    seenTiles = flippedTiles;
  }
}

const parsedInstructions = data.map(parseInstructions);
parsedInstructions.forEach(followInstructions);

dailyFlip(100);

let sum = 0;
seenTiles.forEach(tile => sum += +tile);
console.log(sum);