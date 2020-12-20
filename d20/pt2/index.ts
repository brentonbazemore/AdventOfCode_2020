import * as fs from 'fs';

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const data: string[] = rawData.split('\n\n');

const SIDE = {
  TOP: 0,
  RIGHT: 1,
  BOTTOM: 2,
  LEFT: 3,
};

class Tile {
  id: number;
  // Orientation shifts starting index and mod back to the beginning
  rotation: number;
  flipped: boolean;
  edges: string[];

  constructor(init: string) {
    const d = init.split('\n');
    this.id = +d[0].split(':')[0].split(' ')[1];
    this.rotation = 0;
    this.flipped = false;
    const left = [];
    const right = [];
    const lastCol = 9;
    for (let i = 1; i < d.length; i++) {
      left.push(d[i][0]);
      right.push(d[i][lastCol]);
    }
    // for (let i = d.length - 1; i >= 1; i--) {
    // }
    this.edges = [
      d[1],
      right.join(''),
      d[d.length - 1],
      left.join(''),
    ]
  }
}

const tiles = data.map(d => new Tile(d));

const findMatch = (tile: Tile, availableTiles: Tile[]) => {
  // console.log(tile.id);
  const siblings = [];
  for (let i = 0; i < tile.edges.length; i++) {
    const edge = tile.edges[i];
    for (let j = 0; j < availableTiles.length; j++) {

      const newTile = availableTiles[j];
      if (newTile.edges.includes(edge)) {
        // console.log('found it', newTile.id);
        siblings.push(newTile.id);
      }
    }

    for (let j = 0; j < availableTiles.length; j++) {
      const newTile = availableTiles[j];
      if (newTile.edges.map(s => s.split('').reverse().join('')).includes(edge)) {
        // console.log('found it flipped', newTile.id);
        siblings.push(newTile.id);
      }
    }
  }

  return siblings;
}

const checked = [];

for (let i = 0; i < tiles.length; i++) {
  const newTiles = [...tiles];
  const t = newTiles.splice(i, 1)[0];
  checked.push({ id: t.id, siblings: findMatch(t!, newTiles) });
}

const result = checked.filter((c => c.siblings.length === 2))
  .reduce((prev, cur) => cur.id * prev, 1);
console.log(result);