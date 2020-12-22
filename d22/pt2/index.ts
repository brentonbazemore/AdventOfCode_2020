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

const player1 = new Player(p1String);
const player2 = new Player(p2String);

while (player1.deck.length > 0 && player2.deck.length > 0) {
  const p1Card = player1.getCard();
  const p2Card = player2.getCard();

  if (p1Card > p2Card) {
    player1.addWinnings(p1Card, p2Card);
  } else if (p2Card > p1Card) {
    player2.addWinnings(p2Card, p1Card);
  }
}

const calculateScore = (p: Player) => {
  const deckSize = p.deck.length;
  let sum = 0;
  for (let i = deckSize; i >= 0; i--) {
    sum += p.getCard() * i;
  }
  console.log(sum);
}

calculateScore(player1);
calculateScore(player2);