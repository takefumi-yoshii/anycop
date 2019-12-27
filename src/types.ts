import * as ts from 'typescript'
import { getAnyDiagnostics } from './getAnyDiagnostics'
// ______________________________________________________
//
export type Diagnostic = string
export type BindingFunction<T extends ts.Node = ts.Node> = (props: {
  checker: ts.TypeChecker
  source: ts.SourceFile
  node: T
  name: string
}) => Diagnostic | undefined
//_______________________________________________________
//
export type AnyDiagnostics = ReturnType<typeof getAnyDiagnostics>
//_______________________________________________________
//
export type CounterItem = { totalCount: number; anyCount: number }
export type CounterWithCoverageItem = CounterItem & { coverage: number }
export type CounterType<T> = {
  VariableDeclaration: T
  ParameterDeclaration: T
  BindingElement: T
  FunctionDeclReturn: T
  ArrowFunctionReturn: T
  AsExpression: T
}
export type Counter = CounterType<CounterItem>
export type CounterWithCoverage = CounterType<CounterWithCoverageItem>
//_______________________________________________________
//
export type Config = {
  errorThrethold: number
  targetDir: string
  tsconfigFileName: string
  isEmitLog: boolean
  logFileName?: string
  customReporter?: (anyDiagnostics: AnyDiagnostics) => unknown
}
export type AnycopConfig = Partial<Config>
