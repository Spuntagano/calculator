import Calculator from './Calculator';
import Tokenizer from './Tokenizer';
import Parser from './Parser';
import Evaluator from './Evaluator';

const calculator = new Calculator(Tokenizer, Parser, Evaluator);

const str = '3 + (5 + 7) - 5 - ((3 / 4) + 53.454) * 4 + Math.sqrt(321) * (3 * -4 + Math.max(3,5,2) ** 4 + 2) / 5 - 5 ** 2';

console.log(calculator.calculate(str), eval(str));
