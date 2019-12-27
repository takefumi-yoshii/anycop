import Table from 'cli-table3'
import { AnyDiagnostics } from './types'
import { Counter } from './counter'
import { Config } from './config'
// ______________________________________________________
//
export function reporter(diagnostics: AnyDiagnostics, config: Config) {
  const { counter, aggregate } = diagnostics
  const table = new Table({
    head: ['', 'CheckCount', 'AnyCount', 'TypeSafe Coverage']
  }) as any
  for (let key in counter) {
    const item = counter[key as keyof Counter]
    table.push({ [key]: [item.totalCount, item.anyCount, item.coverage] })
  }
  table.push({
    Total: [aggregate.totalCount, aggregate.anyCount, aggregate.coverage]
  })
  console.log(table.toString())
  if (aggregate.coverage < config.errorThrethold) {
    throw new Error('🚨 Anycop: Error! TypeSafe coverage under threthold.🚨')
  }
}
