import { AnyDiagnostics } from './types'
import { Config } from './config'
// ______________________________________________________
//
export function result(diagnostics: AnyDiagnostics, config: Config) {
  if (diagnostics.aggregate.coverage < config.errorThrethold) {
    throw new Error('🚨 Anycop: Error! TypeSafe coverage under threthold.🚨')
  }
  console.log('Anycop: Your project is type safety. ✅')
}
