import { AnyDiagnostics } from './types'
import { Config } from './config'
// ______________________________________________________
//
export function emitter(diagnostics: AnyDiagnostics, coverageTabele: string, config: Config) {
  if (!config.diagnosticsLogFileName && !config.emitDiagnosticsLog) return
  const logFileName = config.diagnosticsLogFileName || 'anycop.log'
  const diagnosticsLog = diagnostics.allDiagnostics.reduce((a, b) => `${a}\n${b}`)
}
