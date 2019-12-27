"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cli_table3_1 = __importDefault(require("cli-table3"));
// ______________________________________________________
//
function reporter(diagnostics, config) {
    var _a;
    if (!!config.cunstomReporter) {
        config.cunstomReporter(diagnostics);
        return;
    }
    var counter = diagnostics.counter, aggregate = diagnostics.aggregate;
    var table = new cli_table3_1.default({
        head: ['', 'CheckCount', 'AnyCount', 'TypeSafe Coverage']
    });
    for (var key in counter) {
        var item = counter[key];
        table.push((_a = {}, _a[key] = [item.totalCount, item.anyCount, item.coverage], _a));
    }
    table.push({
        Total: [aggregate.totalCount, aggregate.anyCount, aggregate.coverage]
    });
    console.log(table.toString());
    if (aggregate.coverage < config.errorThrethold) {
        throw new Error('🚨 Anycop: Error! TypeSafe coverage under threthold.🚨');
    }
}
exports.reporter = reporter;
