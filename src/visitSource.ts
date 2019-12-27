import * as ts from 'typescript'
import { Diagnostic, BindingFunction, CounterItem } from './types'
import { createCounter } from './counter'
import { checkByReturnTypeOfSignature, checkByTypeAtLocation } from './checkers'
// ______________________________________________________
//
export function visitSource(checker: ts.TypeChecker, source: ts.SourceFile) {
  const diagnostics: Diagnostic[] = []
  const counter = createCounter()
  // ------------------------------
  function checkNode<T extends ts.Node>(
    node: T,
    bindingFunction: BindingFunction<T>,
    counterItem: CounterItem,
    name: string
  ) {
    const diagnostic = bindingFunction({ checker, source, node, name })
    counterItem.totalCount++
    if (diagnostic) {
      counterItem.anyCount++
      diagnostics.push(diagnostic)
    }
  }
  // ------------------------------
  function visit(node: ts.Node) {
    switch (node.kind) {
      case ts.SyntaxKind.VariableDeclaration:
        if (ts.isVariableDeclaration(node)) {
          checkNode(
            node,
            checkByTypeAtLocation,
            counter.VariableDeclaration,
            'VariableDeclaration'
          )
        }
        break
      case ts.SyntaxKind.Parameter:
        if (ts.isParameter(node)) {
          checkNode(
            node,
            checkByTypeAtLocation,
            counter.ParameterDeclaration,
            'ParameterDeclaration'
          )
        }
        break
      case ts.SyntaxKind.BindingElement:
        if (ts.isBindingElement(node)) {
          checkNode(
            node,
            checkByTypeAtLocation,
            counter.BindingElement,
            'BindingElement'
          )
        }
        break
      case ts.SyntaxKind.FunctionDeclaration:
        if (ts.isFunctionDeclaration(node)) {
          checkNode(
            node,
            checkByReturnTypeOfSignature,
            counter.FunctionDeclReturn,
            'FunctionDeclaration'
          )
        }
        break
      case ts.SyntaxKind.ArrowFunction:
        if (ts.isArrowFunction(node)) {
          checkNode(
            node,
            checkByReturnTypeOfSignature,
            counter.ArrowFunctionReturn,
            'ArrowFunction'
          )
        }
        break
      case ts.SyntaxKind.AsExpression:
        if (ts.isAsExpression(node)) {
          checkNode(
            node,
            checkByTypeAtLocation,
            counter.AsExpression,
            'AsExpression'
          )
        }
        break
    }
    ts.forEachChild(node, visit)
  }
  visit(source)
  return {
    diagnostics,
    counter
  }
}
