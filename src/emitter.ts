import * as path from 'path'
import * as fs from 'fs-extra'
import { AnyDiagnostics } from './types'
import { Config } from './config'
// ______________________________________________________
//
export function emitter(diagnostics: AnyDiagnostics, config: Config) {
  if (!config.logFileName && !config.isEmitLog) return
  const logFileName = config.logFileName || 'anycop.log'
  try {
    fs.writeFileSync(path.resolve(logFileName), JSON.stringify(diagnostics), {
      encoding: 'utf-8'
    })
  } catch (err) {
    throw new Error(`Anycop: Error! Failed emit log file.`)
  }
}
