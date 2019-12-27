import * as ts from 'typescript'
import * as path from 'path'
import { Config, createConfig, defaultConfig } from './config'
import { removeUndefined } from './arrayFilters'
import { createProgram } from './createProgram'
import { getAnyDiagnostics } from './getAnyDiagnostics'
import { getCoverageTabele } from './getCoverageTabele'
import { result } from './result'
import { emitter } from './emitter'
import { reporter } from './reporter'
// ______________________________________________________
//
export function run(config: Config) {
  const srcDir = path.resolve(config.targetDir)
  const program: ts.Program = createProgram(srcDir, config)
  const checker: ts.TypeChecker = program.getTypeChecker()
  const sources: ts.SourceFile[] = program
    .getRootFileNames()
    .map(fileName => program.getSourceFile(fileName))
    .filter(removeUndefined)
  if (sources.length) {
    const diagnostics = getAnyDiagnostics(checker, sources)
    const coverageTabele = getCoverageTabele(diagnostics)
    emitter(diagnostics, config)
    reporter(diagnostics, coverageTabele, config)
    result(diagnostics, config)
  }
}
if (process.env.NODE_ENV === 'development') {
  run(createConfig(defaultConfig))
}
