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
    // ログ出力用の文字列
    const log = `${location} 👮‍♂️ < ${message}`
    console.log(log)
    return log
  }
}
// ______________________________________________________
//
export const checkByReturnTypeOfSignature: BindingFunction<ts.FunctionLike> = (
  checker,
  source,
  node,
  name
) => {
  // 関数宣言 または ArrowFunctionReturn の戻り型が any か否かを診断
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
    // ts.TypeChecker を利用し ts.Node(child) に推論されている型を調べる
    const { flags } = checker.getTypeAtLocation(node)
    return checkAny(source, node, flags, name)
  } catch (err) {
    // TODO: checker.getTypeAtLocation(child) で以下エラーがでる Node がある
    // TypeError: Cannot read property 'flags' of undefined
    return
  }
}
