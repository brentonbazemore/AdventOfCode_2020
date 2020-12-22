import * as fs from 'fs';
const { rotate, hflip } = require('2d-array-rotation');

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const data: string[] = rawData.split('\n\n');

enum DIRECTION {
  'UP',
  'RIGHT',
  'DOWN',
  'LEFT',
}

class Tile {
  id: number;
  flipped: boolean;
  links: { [edge: string]: { edge: number, id: number, isFlipped: boolean } | null } = {
    0: null,
    1: null,
    2: null,
    3: null,
  }
  fullPiece: string[][];
  location: { x: number, y: number };
  hasTransformed = false;
  hasSet = false;

  constructor(init: string) {
    const d = init.split('\n');
    this.id = +d[0].split(':')[0].split(' ')[1];
    this.flipped = false;

    const rows = [];
    for (let i = 1; i < d.length; i++) {
      rows.push(d[i].split(''));
    }

    this.fullPiece = rows;
    this.location = { x: NaN, y: NaN };
  }

  setLocation(anchor: { x: number, y: number }, direction: DIRECTION) {
    this.hasSet = true;

    switch (direction) {
      case DIRECTION.UP:
        this.location = { x: anchor.x, y: anchor.y + 1 };
        break;
      case DIRECTION.RIGHT:
        this.location = { x: anchor.x + 1, y: anchor.y };
        break;
      case DIRECTION.DOWN:
        this.location = { x: anchor.x, y: anchor.y - 1 };
        break;
      case DIRECTION.LEFT:
        this.location = { x: anchor.x - 1, y: anchor.y };
        break;
      default:
        throw new Error('idk');
    }
  }

  setLink(thisEdge: number, otherTile: { edge: number, id: number, isFlipped: boolean }) {
    this.links[thisEdge] = otherTile;
  }

  rotate(degrees: number) {
    this.fullPiece = rotate(this.fullPiece, degrees);
    this.hasTransformed = true;
  }

  flip() {
    this.fullPiece = hflip(this.fullPiece);
    this.flipped = !this.flipped;
    this.hasTransformed = true;
  }
}

const tiles = data.map(d => new Tile(d));

const dimensions = Math.sqrt(tiles.length);
const puzzle: { [coords: string]: Tile } = {};

const topOf = (t: Tile) => t.fullPiece[0].join('');
const rigthOf = (t: Tile) => {
  const out = [];
  for (let i = 0; i < t.fullPiece.length; i++) {
    out.push(t.fullPiece[i][9]);
  }
  return out.join('');
};
const bottomOf = (t: Tile) => t.fullPiece[t.fullPiece.length - 1].join('');
const leftOf = (t: Tile) => {
  const out = [];
  for (let i = 0; i < t.fullPiece.length; i++) {
    out.push(t.fullPiece[i][0]);
  }
  return out.join('');
};

const findMatch = (tile: Tile, availableTiles: Tile[]) => {
  if (isNaN(tile.location.x)) {
    return;
  }

  for (let j = 0; j < availableTiles.length; j++) {
    const newTile = availableTiles[j];
    if (tile.id === newTile.id || newTile.hasSet) {
      continue;
    }

    for (let rotation = 0; rotation < 4; rotation++) {
      if (topOf(tile) === bottomOf(newTile)) {
        newTile.setLocation(tile.location, DIRECTION.UP);
        break;
      } else if (bottomOf(tile) === topOf(newTile)) {
        newTile.setLocation(tile.location, DIRECTION.DOWN);
        break;
      } else if (leftOf(tile) === rigthOf(newTile)) {
        newTile.setLocation(tile.location, DIRECTION.LEFT);
        break;
      } else if (rigthOf(tile) === leftOf(newTile)) {
        newTile.setLocation(tile.location, DIRECTION.RIGHT);
        break;
      }

      newTile.rotate(90);
    }
  }

  for (let j = 0; j < availableTiles.length; j++) {
    const newTile = availableTiles[j];
    if (tile.id === newTile.id || newTile.hasSet) {
      continue;
    }

    newTile.flip();
    for (let rotation = 0; rotation < 4; rotation++) {
      if (topOf(tile) === bottomOf(newTile)) {
        newTile.setLocation(tile.location, DIRECTION.UP);
        break;
      } else if (bottomOf(tile) === topOf(newTile)) {
        newTile.setLocation(tile.location, DIRECTION.DOWN);
        break;
      } else if (leftOf(tile) === rigthOf(newTile)) {
        newTile.setLocation(tile.location, DIRECTION.LEFT);
        break;
      } else if (rigthOf(tile) === leftOf(newTile)) {
        newTile.setLocation(tile.location, DIRECTION.RIGHT);
        break;
      }

      newTile.rotate(90);
    }
  }
}

tiles[0].setLocation({ x: 0, y: -1 }, DIRECTION.UP);
for (let i = 0; i < tiles.length * 8; i++) {
  const t = tiles[i % tiles.length];

  findMatch(t!, tiles);
}

let minX = Infinity;
let minY = Infinity;
let maxX = -Infinity;
let maxY = -Infinity;
for (let i = 0; i < tiles.length; i++) {
  const t = tiles[i];
  minX = Math.min(minX, t.location.x);
  maxX = Math.max(maxX, t.location.x);
  minY = Math.min(minY, t.location.y);
  maxY = Math.max(maxY, t.location.y);
  puzzle[`${tiles[i].location.x}_${tiles[i].location.y}`] = tiles[i];
}

// for (let j = minY; j <= maxY; j++) {
//   let row = [];
//   for (let i = minX; i <= maxX; i++) {
//     row.push(puzzle[`${i}_${j}`]?.id || '  ');
//   }

//   console.log(row);
// }

let fullPuzzle: string[] = [];
for (let j = minY; j <= maxY; j++) {
  const row: string[] = [];
  for (let i = minX; i <= maxX; i++) {
    const fullPiece = puzzle[`${i}_${j}`]?.fullPiece.reverse(); // reverse here to go bottom up
    for (let k = 1; k < 9; k++) {
      const inner = fullPiece[k].slice(1, fullPiece[k].length - 1).join('');
      row[k - 1] = (row[k - 1] || '') + inner;
    }
  }
  fullPuzzle.push(...row);
}

const overwrite = (puzz: string[], x: number, y: number) => {
  const explodedHead = puzz[y].split('');
  explodedHead[x + 18] = 'O';
  puzz[y] = explodedHead.join('');

  const explodedBack = puzz[y + 1].split('');
  explodedBack[x + 0] = 'O';
  explodedBack[x + 5] = 'O';
  explodedBack[x + 6] = 'O';
  explodedBack[x + 11] = 'O';
  explodedBack[x + 12] = 'O';
  explodedBack[x + 17] = 'O';
  explodedBack[x + 18] = 'O';
  explodedBack[x + 19] = 'O';
  puzz[y + 1] = explodedBack.join('');

  const explodedStomach = puzz[y + 2].split('');
  explodedStomach[x + 1] = 'O';
  explodedStomach[x + 4] = 'O';
  explodedStomach[x + 7] = 'O';
  explodedStomach[x + 10] = 'O';
  explodedStomach[x + 13] = 'O';
  explodedStomach[x + 16] = 'O';
  puzz[y + 2] = explodedStomach.join('');
}

// Test input
// fullPuzzle = hflip(fullPuzzle).map((m: string[]) => m.join(''));
// fullPuzzle = rotate(fullPuzzle, 270).map((m: string[]) => m.join(''));

// Real input
fullPuzzle = hflip(fullPuzzle).map((m: string[]) => m.join(''));
fullPuzzle = rotate(fullPuzzle, 90).map((m: string[]) => m.join(''));

const head = new RegExp(/.{18}#.{1}/);
const back = new RegExp(/#.{4}##.{4}##.{4}###/);
const stomach = new RegExp(/.{1}#.{2}#.{2}#.{2}#.{2}#.{2}#.{3}/);


for (let y = 2; y < fullPuzzle.length; y++) {

  const headResult = matchOverlap(fullPuzzle[y - 2], head);
  const backResult = matchOverlap(fullPuzzle[y - 1], back);
  const stomachResult = matchOverlap(fullPuzzle[y], stomach);

  if (headResult.length > 0 && backResult.length > 0 && stomachResult.length > 0) {
    for (let i = 0; i < backResult.length; i++) {
      let backIndex = backResult[i].index;

      const headIndex = headResult.find(h => h.index === backIndex)?.index;
      const stomachIndex = stomachResult.find(s => s.index === backIndex)?.index;


      if (backIndex === headIndex && headIndex === stomachIndex) {
        overwrite(fullPuzzle, backIndex, y - 2);
      }

    }
  }
}

console.log(fullPuzzle);

let count = 0;
for (let y = 0; y < fullPuzzle.length; y++) {
  for (let x = 0; x < fullPuzzle[0].length; x++) {
    if (fullPuzzle[y][x] === '#') {
      count++;
    }
  }
}

console.log(count);

// Regex the way I expected it to...
function matchOverlap(input: any, re: any): { string: string, index: number }[] {
  var r = [], m;
  // prevent infinite loops
  if (!re.global) re = new RegExp(
    re.source, (re + '').split('/').pop() + 'g'
  );
  while (m = re.exec(input)) {
    re.lastIndex -= m[0].length - 1;
    r.push({ string: m[0], index: m.index });
  }
  return r;
}