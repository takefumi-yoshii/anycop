import { AnyDiagnostics } from '../types'
const config = {
  customReporter: (anyDiagnostics: AnyDiagnostics) => {
    console.log(anyDiagnostics)
  }
}
export default config
