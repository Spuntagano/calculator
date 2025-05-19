import { IToken, ITokenizer } from './types';

class Tokenizer implements ITokenizer {
  private i: number;
  private tokens: IToken[];
  private str: string;

  constructor() {
    this.i;
    this.tokens;
    this.str;
  }

  private handleSpaces() {
    if (this.str[this.i] === ' ') {
      this.i++;
      return true;
    }

    return false;
  }

  private handleSymbols() {
    if (['+', '-', '*', '/', '(', ')', ','].includes(this.str[this.i])) {
      if (this.str[this.i] === '*' && this.str[this.i + 1] === '*') {
        this.tokens.push({type: '**'} as IToken);
        this.i++;
        this.i++;
        return true;
      }

      this.tokens.push({type: this.str[this.i]} as IToken);
      this.i++;
      return true;
    }

    return false;
  }

  private handleNumber() {
    let start = this.i;
    let dotCount = 0;
    let parsed = parseInt(this.str[this.i]);
    while (this.i < this.str.length && (!isNaN(parsed) || this.str[this.i] === '.')) {
      if (this.str[this.i] === '.') {
        dotCount++;
      }

      if (dotCount > 1) {
        throw new Error('Unexpected token: .');
      }

      this.i++;
      parsed = parseInt(this.str[this.i]);
    }

    if (start !== this.i) {
      const float = parseFloat(this.str.slice(start, this.i));

      if (isNaN(float)) {
        throw new Error('Unexpected token: .');
      };

      this.tokens.push({type: 'NUMBER', value: float} as IToken);
      return true;
    }

    return false;
  }

  private handleFunction() {
    let func = '';
    while (this.str[this.i] !== '(' && this.i < this.str.length) {
      func += this.str[this.i]
      this.i++;
    }

    if (func.length > 0) {
      this.tokens.push({type: 'FUNCTION', name: func } as IToken);
      return true;
    }

    return false;
  }

  public tokenize(str: string) {
    this.i = 0;
    this.tokens = [];
    this.str = str;

    while (this.i < this.str.length) {
      if (this.handleSpaces()) {
        continue;
      }

      if (this.handleSymbols()) {
        continue;
      }

      if (this.handleNumber()) {
        continue;
      }

      if (this.handleFunction()) {
        continue;
      }

      throw new Error(`Unexpected token: ${this.str[this.i]}`);
    }

    return this.tokens;
  }
}

export default Tokenizer;
