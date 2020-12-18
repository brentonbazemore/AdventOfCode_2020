import * as fs from 'fs';

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const data: string[] = rawData.split('\n');

const deepestPair = (str: any, index = null): [number, number] =>
  [index = str.match(/([(])[^()]+[)]/).index
    , str.slice(index).match(/[)]/).index + index];

const evaluateParenthesis = (subExpressionString: string) => {
  let subExpression = subExpressionString.replace('(', '');
  subExpression = subExpression.replace(')', '');
  let subExpressionAr = subExpression.split(' ');

  const operations = {
    '+': (a: number, b: number) => a + b,
    '*': (a: number, b: number) => a * b,
  };

  let val = +subExpressionAr[0];
  let operator = subExpressionAr[1];
  for (let i = 1; i < subExpressionAr.length; i++) {
    if (i % 2 === 1) {
      operator = subExpressionAr[i];
    } else {
      val = operations[operator as '*' | '+'](val, +subExpressionAr[i]);
    }
  }

  return val;
}

const evaluate = (str: string) => {
  let expression = str;
  while (expression.includes('(')) {
    const indices = deepestPair(expression);
    let parenthesis = expression.substring(indices[0], indices[1] + 1);
    const val = evaluateParenthesis(parenthesis);
    expression = expression.replace(parenthesis, `${val}`);
  }

  return evaluateParenthesis(expression);
}

const result = data.map(evaluate).reduce((prev, cur) => prev + cur, 0);
console.log(result);