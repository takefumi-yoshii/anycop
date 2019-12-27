"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ______________________________________________________
//
function result(diagnostics, config) {
    if (diagnostics.aggregate.coverage < config.errorThrethold) {
        throw new Error('🚨 Anycop: Error! TypeSafe coverage under threthold.🚨');
    }
    console.log('Anycop: Your project is type safety. ✅');
}
exports.result = result;
