import * as fs from 'fs';
import * as _ from 'lodash';

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const [rulesData, yourTickeData, nearbyTicketData] = rawData.split('\n\n');

interface Rule {
  field: string;
  ranges: {
    low: number;
    high: number;
  }[]
}

//
const rules: Rule[] = rulesData.split('\n').map((ru) => {
  const [field, rawRanges] = ru.split(': ');
  const ranges = rawRanges.split(' or ').map((ra) => {
    const [low, high] = ra.split('-').map(n => +n);
    return { low, high };
  });

  return { field, ranges };
});

//
const yourTicket = yourTickeData.split('\n').pop()!.split(',').map(n => +n);

const rawNearbyTickets = nearbyTicketData.split('\n');
rawNearbyTickets.shift();
const nearbyTickets = rawNearbyTickets.map(v => v.split(',').map(n => +n));

//
const validTickets = nearbyTickets.filter((ticket) => ticket.every((num) => rules.some(rule => rule.ranges.some(range => num >= range.low && num <= range.high))));

const determinePossibleFieldByIndex = (index: number) => {
  const fieldArrays = validTickets.map(ticket => {
    const num = ticket[index];
    const validRules = rules.filter(rule => rule.ranges.some(range => num >= range.low && num <= range.high));
    return validRules.map(r => r.field);
  });

  const fields = _.intersection(...fieldArrays);
  return { index, fields };
};

const indices = _.range(0, yourTicket.length);

const confirmedIndices: { [key: string]: number } = {};
const confirmedFields: string[] = [];
let candidateFields: { index: number, fields: string[] }[] = [];
indices.forEach(index => {
  const out = determinePossibleFieldByIndex(index);
  if (out.fields.length === 1) {
    confirmedFields.push(out.fields[0]);
    confirmedIndices[out.fields[0]] = index;
  } else {
    candidateFields.push(out);
  }
});

while (confirmedFields.length !== indices.length) {
  candidateFields = candidateFields.filter((obj, i) => {
    const remainingFields = _.difference(obj.fields, confirmedFields);

    if (remainingFields.length === 1) {
      confirmedFields.push(remainingFields[0]);
      confirmedIndices[remainingFields[0]] = obj.index;
      return false;
    } else {
      candidateFields[i].fields = remainingFields;
      return true;
    }
  });
}

const result = yourTicket[confirmedIndices['departure location']]
  * yourTicket[confirmedIndices['departure station']]
  * yourTicket[confirmedIndices['departure platform']]
  * yourTicket[confirmedIndices['departure track']]
  * yourTicket[confirmedIndices['departure date']]
  * yourTicket[confirmedIndices['departure time']];

console.log(result);
