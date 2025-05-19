import { ICalculator, IEvaluator, IParser, ITokenizer } from './types';

class Calculator implements ICalculator {
  private tokenizer: ITokenizer;
  private parser: IParser;
  private evaluator: IEvaluator

  constructor(Tokenizer: new () => ITokenizer, Parser: new () => IParser, Evaluator: new () => IEvaluator) {
    this.tokenizer = new Tokenizer();
    this.parser = new Parser();
    this.evaluator = new Evaluator();
  }

  public calculate(str: string) {
    const tokens = this.tokenizer.tokenize(str);
    console.log(tokens);
    const ast = this.parser.parse(tokens);
    console.log(ast);
    const result = this.evaluator.evaluate(ast);

    return result;
  }
}

export default Calculator;
