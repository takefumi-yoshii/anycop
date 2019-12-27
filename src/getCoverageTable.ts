import Table from 'cli-table3'
import { AnyDiagnostics } from './types'
import { Counter } from './types'
// ______________________________________________________
//
export function getCoverageTable(diagnostics: AnyDiagnostics) {
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
  return table.toString() as string
}
