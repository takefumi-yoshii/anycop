"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var visitSource_1 = require("./visitSource");
var counter_1 = require("./counter");
// ______________________________________________________
//
function getAnyDiagnostics(checker, sources) {
    var counters = [];
    var allDiagnostics = sources
        .map(function (source) {
        var _a = visitSource_1.visitSource(checker, source), diagnostics = _a.diagnostics, counter = _a.counter;
        counters.push(counter);
        return diagnostics;
    })
        .flat();
    var counter = counter_1.mergeCounters(counters);
    var aggregate = counter_1.aggregateCounter(counter);
    return {
        allDiagnostics: allDiagnostics,
        counter: counter,
        aggregate: aggregate
    };
}
exports.getAnyDiagnostics = getAnyDiagnostics;
