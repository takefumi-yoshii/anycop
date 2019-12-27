import { Config, AnycopConfig } from './types'
//_______________________________________________________
//
export const defaultConfig: Config = {
  errorThrethold: 0,
  targetDir: '.',
  tsconfigFileName: 'tsconfig.json',
  isEmitLog: false
}
export const createConfig = (injects?: AnycopConfig): Config => ({
  ...defaultConfig,
  ...injects
})
