import * as ts from 'typescript'
import { Diagnostic, BindingFunction } from './types'
// ______________________________________________________
//
function checkAny(
  source: ts.SourceFile,
  node: ts.Node,
  flags: ts.TypeFlags,
  message: string
): Diagnostic | undefined {
  if (flags === ts.TypeFlags.Any) {
    const start = node.getStart()
    const { line, character } = source.getLineAndCharacterOfPosition(start)
    const location = `${source.fileName}:${line + 1}:${character + 1}`
    const log = `${location} 👮‍♂️ < ${message}`
    console.log(log)
    return log
  }
}
// ______________________________________________________
//
export const checkByReturnTypeOfSignature: BindingFunction<ts.SignatureDeclaration> = (
  checker,
  source,
  node,
  name
) => {
  const signature = checker.getSignatureFromDeclaration(node)
  if (signature) {
    const { flags } = checker.getReturnTypeOfSignature(signature)
    return checkAny(source, node, flags, name)
  }
}
// ______________________________________________________
//
export const checkByTypeAtLocation: BindingFunction = (
  checker,
  source,
  node,
  name
) => {
  try {
    const { flags } = checker.getTypeAtLocation(node)
    return checkAny(source, node, flags, name)
  } catch (err) {
    // TODO: checker.getTypeAtLocation(child)
    // TypeError: Cannot read property 'flags' of undefined
    return
  }
}
