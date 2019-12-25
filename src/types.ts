import * as ts from 'typescript'
// ______________________________________________________
//
export type Diagnostic = string
export type BindingFunction<T extends ts.Node = ts.Node> = (
  checker: ts.TypeChecker,
  source: ts.SourceFile,
  node: T,
  name: string
) => Diagnostic | undefined
