"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ______________________________________________________
//
function reporter(diagnostics, coverageTabele, config) {
    if (!!config.customReporter) {
        config.customReporter(diagnostics);
        return;
    }
    console.log(coverageTabele);
}
exports.reporter = reporter;
