export interface IToken {
  type: '+' | '-' | '*' | '**' | '/' | '(' | ')' | ',' | 'FUNCTION' | 'NUMBER',
  value?: number,
  name?: string
}

export interface ITokenizer {
  tokenize(str: string): IToken[]
}

export interface IParser {
  parse(tokens: IToken[]): INode
}

export interface IEvaluator {
  evaluate(ast: INode): number
}

export interface ICalculator {
  calculate(str: string): number
}

export interface ILiteralNode {
  type: 'Literal',
  value: number,
}

export interface IUnaryExpressionNode {
  type: 'UnaryExpression',
  op: '-' | 'sqrt',
  node: INode
}

export interface IBinaryExpressionNode {
  type: 'BinaryExpression',
  op: '+' | '-' | '*' | '**' | '/',
  lhs: INode
  rhs: INode
}

export interface IFunctionExpressionNode {
  type: 'FunctionExpression',
  name: string,
  args: INode[]
}

export type INode = ILiteralNode | IUnaryExpressionNode | IBinaryExpressionNode | IFunctionExpressionNode;
