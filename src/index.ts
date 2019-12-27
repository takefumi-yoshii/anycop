import * as ts from 'typescript'
import * as path from 'path'
import { Config, createConfig, defaultConfig } from './config'
import { removeUndefined } from './arrayFilters'
import { createProgram } from './createProgram'
import { getAnyDiagnostics } from './getAnyDiagnostics'
import { emitter } from './emitter'
import { reporter } from './reporter'
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
    if (!!config.diagnosticsLogFileName) {
      emitter(diagnostics, config)
    }
    if (!!config.customReporter) {
      config.customReporter(diagnostics)
      return
    }
    reporter(diagnostics, config)
  }
}
if (process.env.NODE_ENV === 'development') {
  run(createConfig(defaultConfig))
}
