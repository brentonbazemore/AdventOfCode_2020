import * as fs from 'fs';

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const [rulesData, yourTickeData, nearbyTicketData] = rawData.split('\n\n');

interface Rule {
  field: string;
  ranges: {
    low: number;
    high: number;
  }[]
}

const rules: Rule[] = rulesData.split('\n').map((ru) => {
  const [field, rawRanges] = ru.split(': ');
  const ranges = rawRanges.split(' or ').map((ra) => {
    const [low, high] = ra.split('-').map(n => +n);
    return { low, high };
  });

  return { field, ranges };
});

const rawNearbyTickets = nearbyTicketData.split('\n');
rawNearbyTickets.shift();
const nearbyTickets = rawNearbyTickets.map(v => v.split(',').map(n => +n));

const invalid: number[] = [];
nearbyTickets.forEach((ticket) => {
  ticket.forEach((num) => {
    const isValid = rules.some(rule => rule.ranges.some(range => num >= range.low && num <= range.high))
    if (!isValid) {
      invalid.push(num);
    }
  })
});

console.log(invalid.reduce((prev, cur) => prev + cur, 0));