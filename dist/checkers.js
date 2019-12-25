"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts = __importStar(require("typescript"));
// ______________________________________________________
//
function checkAny(source, node, flags, message) {
    if (flags === ts.TypeFlags.Any) {
        var start = node.getStart();
        var _a = source.getLineAndCharacterOfPosition(start), line = _a.line, character = _a.character;
        var location = source.fileName + ":" + (line + 1) + ":" + (character + 1);
        var log = location + " \uD83D\uDC6E\u200D\u2642\uFE0F < " + message;
        console.log(log);
        return log;
    }
}
// ______________________________________________________
//
exports.checkByReturnTypeOfSignature = function (checker, source, node, name) {
    var signature = checker.getSignatureFromDeclaration(node);
    if (signature) {
        var flags = checker.getReturnTypeOfSignature(signature).flags;
        return checkAny(source, node, flags, name);
    }
};
// ______________________________________________________
//
exports.checkByTypeAtLocation = function (checker, source, node, name) {
    try {
        var flags = checker.getTypeAtLocation(node).flags;
        return checkAny(source, node, flags, name);
    }
    catch (err) {
        // TODO: checker.getTypeAtLocation(child)
        // TypeError: Cannot read property 'flags' of undefined
        return;
    }
};
