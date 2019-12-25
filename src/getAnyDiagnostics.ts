import * as ts from 'typescript'
import { Diagnostic } from './types'
import { visitSource } from './visitSource'
import { Counter, mergeCounters, aggregateCounter } from './counter'
// ______________________________________________________
//
export function getAnyDiagnostics(
  checker: ts.TypeChecker,
  sources: readonly ts.SourceFile[]
) {
  const counters: Counter[] = []
  const allDiagnostics: Diagnostic[] = sources
    .map(source => {
      const { diagnostics, counter } = visitSource(checker, source)
      counters.push(counter)
      return diagnostics
    })
    .flat()
  const counter = mergeCounters(counters)
  const aggregate = aggregateCounter(counter)
  return {
    allDiagnostics,
    counter,
    aggregate
  }
}
// ______________________________________________________
//
export type AnyDiagnostics = ReturnType<typeof getAnyDiagnostics>
