import * as path from 'path'
import * as fs from 'fs-extra'
import { AnyDiagnostics } from './types'
import { Config } from './config'
// ______________________________________________________
//
export function emitter(diagnostics: AnyDiagnostics, config: Config) {
  if (!config.diagnosticsLogFileName && !config.emitDiagnosticsLog) return
  const logFileName = config.diagnosticsLogFileName || 'anycop.log'
  try {
    fs.writeFileSync(path.resolve(logFileName), JSON.stringify(diagnostics), {
      encoding: 'utf-8'
    })
  } catch (err) {
    throw new Error(`Anycop: Error! Failed emit log file.`)
  }
}
