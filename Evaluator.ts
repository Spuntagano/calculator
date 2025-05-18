import { IEvaluator, INode } from './types';

class Evaluator implements IEvaluator {
  private dfs(node: INode) {
    switch (node.type) {
      case 'Literal':
        return node.value;

      case 'FunctionExpression':
        const args = node.args.map(node => this.dfs(node));
        switch (node.name) {
          case 'Math.sqrt':
            return Math.sqrt.apply(this, args);
          case 'Math.max':
            return Math.max.apply(this, args);
          default:
            throw new Error('Unknown function name: ' + node.name);
        }

      case 'UnaryExpression':
        if (node.op === '-') {
          return -this.dfs(node.node);
        }

        throw new Error('Unsupported unary operator: ' + node);

      case 'BinaryExpression': {
        const left = this.dfs(node.lhs);
        const right = this.dfs(node.rhs);
        switch (node.op) {
          case '+': 
            return left + right;
          case '-': 
            return left - right;
          case '*': 
            return left * right;
          case '/': 
            return left / right;
          case '**': 
            return left ** right;
          default:
            throw new Error('Unsupported binary operator: ' + node);
        }
      }
    }
  }

  public evaluate(ast: INode) {
    return this.dfs(ast);
  }
}

export default Evaluator;
