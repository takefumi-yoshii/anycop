import { AnyDiagnostics } from './types'
import { Config } from './config'
// ______________________________________________________
//
export function reporter(
  diagnostics: AnyDiagnostics,
  coverageTabele: string,
  config: Config
) {
  if (!!config.customReporter) {
    config.customReporter(diagnostics)
    return
  }
  console.log(coverageTabele)
}
