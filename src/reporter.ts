import { AnyDiagnostics } from './types'
import { Config } from './types'
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
