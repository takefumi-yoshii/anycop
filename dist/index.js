"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = __importStar(require("path"));
var config_1 = require("./config");
var arrayFilters_1 = require("./arrayFilters");
var createProgram_1 = require("./createProgram");
var getAnyDiagnostics_1 = require("./getAnyDiagnostics");
var getCoverageTable_1 = require("./getCoverageTable");
var result_1 = require("./result");
var emitter_1 = require("./emitter");
var reporter_1 = require("./reporter");
// ______________________________________________________
//
function run(config) {
    var srcDir = path.resolve(config.targetDir);
    var program = createProgram_1.createProgram(srcDir, config);
    var checker = program.getTypeChecker();
    var sources = program
        .getRootFileNames()
        .map(function (fileName) { return program.getSourceFile(fileName); })
        .filter(arrayFilters_1.removeUndefined);
    if (sources.length) {
        var diagnostics = getAnyDiagnostics_1.getAnyDiagnostics(checker, sources);
        var coverageTabele = getCoverageTable_1.getCoverageTable(diagnostics);
        emitter_1.emitter(diagnostics, config);
        reporter_1.reporter(diagnostics, coverageTabele, config);
        result_1.result(diagnostics, config);
    }
}
exports.run = run;
if (process.env.NODE_ENV === 'development') {
    run(config_1.createConfig(config_1.defaultConfig));
}
