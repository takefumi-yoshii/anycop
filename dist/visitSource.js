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
var counter_1 = require("./counter");
var checkers_1 = require("./checkers");
// ______________________________________________________
//
function visitSource(checker, source) {
    var diagnostics = [];
    var counter = counter_1.createCounter();
    // ------------------------------
    function checkNode(node, bindingFunction, counterItem, name) {
        var diagnostic = bindingFunction({ checker: checker, source: source, node: node, name: name });
        counterItem.totalCount++;
        if (diagnostic) {
            counterItem.anyCount++;
            diagnostics.push(diagnostic);
        }
    }
    // ------------------------------
    function visit(node) {
        switch (node.kind) {
            case ts.SyntaxKind.VariableDeclaration:
                if (ts.isVariableDeclaration(node)) {
                    checkNode(node, checkers_1.checkByTypeAtLocation, counter.VariableDeclaration, 'VariableDeclaration');
                }
                break;
            case ts.SyntaxKind.Parameter:
                if (ts.isParameter(node)) {
                    checkNode(node, checkers_1.checkByTypeAtLocation, counter.ParameterDeclaration, 'ParameterDeclaration');
                }
                break;
            case ts.SyntaxKind.BindingElement:
                if (ts.isBindingElement(node)) {
                    checkNode(node, checkers_1.checkByTypeAtLocation, counter.BindingElement, 'BindingElement');
                }
                break;
            case ts.SyntaxKind.FunctionDeclaration:
                if (ts.isFunctionDeclaration(node)) {
                    checkNode(node, checkers_1.checkByReturnTypeOfSignature, counter.FunctionDeclReturn, 'FunctionDeclaration');
                }
                break;
            case ts.SyntaxKind.ArrowFunction:
                if (ts.isArrowFunction(node)) {
                    checkNode(node, checkers_1.checkByReturnTypeOfSignature, counter.ArrowFunctionReturn, 'ArrowFunction');
                }
                break;
            case ts.SyntaxKind.AsExpression:
                if (ts.isAsExpression(node)) {
                    checkNode(node, checkers_1.checkByTypeAtLocation, counter.AsExpression, 'AsExpression');
                }
                break;
        }
        ts.forEachChild(node, visit);
    }
    visit(source);
    return {
        diagnostics: diagnostics,
        counter: counter
    };
}
exports.visitSource = visitSource;
