import { IToken, INode, IParser, IFunctionExpressionNode, IBinaryExpressionNode, IUnaryExpressionNode, ILiteralNode } from './types';

const precedence = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  '**': 3
} as const

class Parser implements IParser {
  private tokens: IToken[];
  private index: number;
  private precedence: typeof precedence

  constructor() {
    this.tokens;
    this.index;
    this.precedence = precedence;
  }

  private peek() {
    return this.tokens[this.index];
  }

  private consume() {
    const token = this.tokens[this.index];
    this.index++;
    return token;
  }

  private parseFunction() {
    const token = this.consume();

    if (this.consume()?.type !== '(') {
      throw new Error('Expected token: (');
    }

    const args: INode[] = [];
    do {
      if (this.peek()?.type === ',') {
        this.consume();
      }

      const expression =  this.parseExpression();
      args.push(expression);
    } while (this.peek()?.type === ',');

    if (this.consume()?.type !== ')') {
      throw new Error('Expected token: )');
    }

    return { type: 'FunctionExpression', name: token.name, args } as IFunctionExpressionNode;
  }

  private parseParenthesis() {
      this.consume();
      const expresion =  this.parseExpression();

      if (this.consume()?.type !== ')') {
        throw new Error('Expected token: )');
      }

      return expresion;
  }

  private parseNumber() {
    const token = this.consume();
    if (this.peek()?.type === 'NUMBER') { 
      throw new Error('Unexpected token: NUMBER');
    }

    return { type: 'Literal', value: token.value } as ILiteralNode;
  }

  private parseNegative() {
    this.consume();
    const node = this.parseSingle();
    return { type: 'UnaryExpression', op: '-', node } as IUnaryExpressionNode;
  }

  private parseSingle() {
    const token = this.peek();

    if (token?.type === 'FUNCTION') {
      return this.parseFunction();
    }

    if (token?.type === '(') {
      return this.parseParenthesis();
    }

    if (token.type === 'NUMBER') {
      return this.parseNumber();
    }

    if (token.type === '-') {
      return this.parseNegative();
    }

    throw new Error('Unexpected token: ' + JSON.stringify(token));
  }

  private parseHigher(previousPrecedence: number) {
    let node = this.parseSingle();

    while (this.precedence[this.peek()?.type] > previousPrecedence) {
      const token = this.consume();
      const rhs = this.parseHigher(this.precedence[token.type]);
      node = { type: 'BinaryExpression', op: token.type, lhs: node, rhs } as IBinaryExpressionNode;
    }

    return node;
  }

  private parseExpression() {
    let node: INode = this.parseHigher(1);
    let precedence = node.type !== 'Literal' && node.type !== 'FunctionExpression' ? this.precedence[node.op] : 1;

    while (this.precedence[this.peek()?.type] <= precedence) {
      const token = this.consume();
      const rhs = this.parseHigher(this.precedence[token.type]);
      node = { type: 'BinaryExpression', op: token.type, lhs: node, rhs } as IBinaryExpressionNode;
    }

    return node;
  }

  public parse(tokens: IToken[]) {
    this.tokens = tokens;
    this.index = 0;
    return this.parseExpression();
  }
}

export default Parser;
