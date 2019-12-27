import * as path from 'path'
import * as fs from 'fs-extra'
import { AnyDiagnostics } from './types'
import { Config } from './types'
// ______________________________________________________
//
export function emitter(diagnostics: AnyDiagnostics, config: Config) {
  if (!config.logFileName && !config.isEmitLog) return
  const logFileName = config.logFileName || 'anycop.log'
  const distDirArr = logFileName.split('/')
  distDirArr.pop()
  const distDir = distDirArr.join('/')
  try {
    if (distDir !== '') {
      if (!fs.existsSync(distDir)) {
        fs.mkdirsSync(distDir)
      }
    }
    fs.writeFileSync(path.resolve(logFileName), JSON.stringify(diagnostics), {
      encoding: 'utf-8'
    })
  } catch (err) {
    throw new Error(`Anycop: Error! Failed emit log file.`)
  }
}
