import { AnyDiagnostics } from './types'
//_______________________________________________________
//
export type Config = {
  errorThrethold: number
  targetDir: string
  tsconfigFileName: string
  diagnosticsLogFileName?: string
  customReporter?: (anyDiagnostics: AnyDiagnostics) => unknown
}
export type AnycopConfig = Partial<Config>
//_______________________________________________________
//
export const defaultConfig: Config = {
  errorThrethold: 0,
  targetDir: '.',
  tsconfigFileName: ''
}
export const createConfig = (injects?: Config): Config => ({
  ...defaultConfig,
  ...injects
})
