import * as ts from 'typescript'
import * as path from 'path'
import { Config, config } from './config'
import { removeUndefined } from './arrayFilters'
import { createProgram } from './createProgram'
import { getAnyDiagnostics } from './getAnyDiagnostics'
import { log } from './log'
// ______________________________________________________
//
export function run(config: Config) {
  const srcDir = path.resolve(config.targetDir)
  const program: ts.Program = createProgram(srcDir)
  const checker: ts.TypeChecker = program.getTypeChecker()
  const sources: ts.SourceFile[] = program
    .getRootFileNames()
    .map(fileName => program.getSourceFile(fileName))
    .filter(removeUndefined)
  if (sources.length) {
    const diagnostics = getAnyDiagnostics(checker, sources)
    if (diagnostics.aggregate.coverage !== 1) {
      log(diagnostics, config)
    }
  }
}
if (process.env.NODE_ENV === 'development') {
  run(config())
}
