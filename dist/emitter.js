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
var fs = __importStar(require("fs-extra"));
// ______________________________________________________
//
function emitter(diagnostics, config) {
    if (!config.diagnosticsLogFileName && !config.emitDiagnosticsLog)
        return;
    var logFileName = config.diagnosticsLogFileName || 'anycop.log';
    try {
        fs.writeFileSync(path.resolve(logFileName), JSON.stringify(diagnostics), {
            encoding: 'utf-8'
        });
    }
    catch (err) {
        throw new Error("Anycop: Error! Failed emit log file.");
    }
}
exports.emitter = emitter;
