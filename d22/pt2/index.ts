import * as fs from 'fs';

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const [p1String, p2String]: string[] = rawData.split('\n\n');

class Player {
  deck: number[];
  constructor(initString: string) {
    const d = initString.split('\n');
    d.shift();
    this.deck = d.map(s => +s);
  }

  getCard() {
    return this.deck.shift() || -1;
  }

  addWinnings(mine: number, theirs: number) {
    this.deck.push(mine, theirs);
  }
}

const playWar = (p1: Player, p2: Player): { player: Player, id: number } => {
  const snapshots = new Set();
  let winner = null;
  let round = 1;
  while (p1.deck.length > 0 && p2.deck.length > 0) {
    const roundSnap = [p1.deck.join(','), p2.deck.join(',')].join(':');
    if (snapshots.has(roundSnap)) {
      return { player: p1, id: 1 };
    }

    snapshots.add([p1.deck.join(','), p2.deck.join(',')].join(':'));

    const p1Card = p1.getCard();
    const p2Card = p2.getCard();

    if (p1.deck.length >= p1Card && p2.deck.length >= p2Card) {
      const fullP1 = [p1Card, ...p1.deck];
      const fullP2 = [p2Card, ...p2.deck];
      const newP1 = new Player(fullP1.slice(0, p1Card + 1).join('\n'));
      const newP2 = new Player(fullP2.slice(0, p2Card + 1).join('\n'));
      winner = playWar(newP1, newP2);

      if (winner.id === 1) {
        p1.addWinnings(p1Card, p2Card);
      } else if (winner.id === 2) {
        p2.addWinnings(p2Card, p1Card);
      }
    } else {
      if (p1Card > p2Card) {
        p1.addWinnings(p1Card, p2Card);
      } else if (p2Card > p1Card) {
        p2.addWinnings(p2Card, p1Card);
      }
    }

    round++;
  }

  if (p1.deck.length === 0) {
    return { player: p2, id: 2 };
  }

  if (p2.deck.length === 0) {
    return { player: p1, id: 1 };
  }

  return { player: p1, id: 1 };
}

const player1 = new Player(p1String);
const player2 = new Player(p2String);
const winner = playWar(player1, player2);

const calculateScore = (p: Player) => {
  const deckSize = p.deck.length;
  let sum = 0;
  for (let i = deckSize; i >= 0; i--) {
    sum += p.getCard() * i;
  }
  console.log(sum);
}

calculateScore(winner.player);