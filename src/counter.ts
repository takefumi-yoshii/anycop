import {
  Counter,
  CounterItem,
  CounterWithCoverage,
  CounterWithCoverageItem
} from './types'
// ______________________________________________________
//
export const createCounter = (): Counter => ({
  VariableDeclaration: { totalCount: 0, anyCount: 0 },
  ParameterDeclaration: { totalCount: 0, anyCount: 0 },
  BindingElement: { totalCount: 0, anyCount: 0 },
  FunctionDeclReturn: { totalCount: 0, anyCount: 0 },
  ArrowFunctionReturn: { totalCount: 0, anyCount: 0 },
  AsExpression: { totalCount: 0, anyCount: 0 }
})
// ______________________________________________________
//
const withCoverage = (counterItem: CounterItem): CounterWithCoverageItem => {
  const coverage =
    counterItem.totalCount === 0
      ? 1
      : 1 - counterItem.anyCount / counterItem.totalCount
  return {
    ...counterItem,
    coverage
  }
}
const convertCounterToWithCoverage = (
  counter: Counter
): CounterWithCoverage => ({
  VariableDeclaration: withCoverage(counter.VariableDeclaration),
  ParameterDeclaration: withCoverage(counter.ParameterDeclaration),
  BindingElement: withCoverage(counter.BindingElement),
  FunctionDeclReturn: withCoverage(counter.FunctionDeclReturn),
  ArrowFunctionReturn: withCoverage(counter.ArrowFunctionReturn),
  AsExpression: withCoverage(counter.AsExpression)
})
const sum = (a: CounterItem, b: CounterItem): CounterItem => ({
  totalCount: a.totalCount + b.totalCount,
  anyCount: a.anyCount + b.anyCount
})
export const mergeCounters = (counters: Counter[]): CounterWithCoverage =>
  convertCounterToWithCoverage(
    counters.reduce((a, b) => ({
      VariableDeclaration: sum(a.VariableDeclaration, b.VariableDeclaration),
      ParameterDeclaration: sum(a.ParameterDeclaration, b.ParameterDeclaration),
      BindingElement: sum(a.BindingElement, b.BindingElement),
      FunctionDeclReturn: sum(a.FunctionDeclReturn, b.FunctionDeclReturn),
      ArrowFunctionReturn: sum(a.ArrowFunctionReturn, b.ArrowFunctionReturn),
      AsExpression: sum(a.AsExpression, b.AsExpression)
    }))
  )
// ______________________________________________________
//
export const aggregateCounter = (counter: Counter) => {
  let totalCount = 0
  let anyCount = 0
  for (let key in counter) {
    const item = counter[key as keyof Counter]
    totalCount += item.totalCount
    anyCount += item.anyCount
  }
  const coverage = totalCount === 0 ? 1 : 1 - anyCount / totalCount
  return {
    totalCount,
    anyCount,
    coverage
  }
}
