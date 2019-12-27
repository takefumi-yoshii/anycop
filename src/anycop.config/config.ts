import { AnyDiagnostics } from '../types'
const config = {
  cunstomReporter: (anyDiagnostics: AnyDiagnostics) => {
    console.log(anyDiagnostics)
  }
}
export default config
