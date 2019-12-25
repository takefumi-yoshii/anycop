"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
// ______________________________________________________
//
exports.createCounter = function () { return ({
    VariableDeclaration: { totalCount: 0, anyCount: 0 },
    ParameterDeclaration: { totalCount: 0, anyCount: 0 },
    BindingElement: { totalCount: 0, anyCount: 0 },
    FunctionDeclReturn: { totalCount: 0, anyCount: 0 },
    ArrowFunctionReturn: { totalCount: 0, anyCount: 0 },
    AsExpression: { totalCount: 0, anyCount: 0 }
}); };
// ______________________________________________________
//
var withCoverage = function (counterItem) {
    var coverage = counterItem.totalCount === 0
        ? 1
        : 1 - counterItem.anyCount / counterItem.totalCount;
    return __assign(__assign({}, counterItem), { coverage: coverage });
};
var convertCounterToWithCoverage = function (counter) { return ({
    VariableDeclaration: withCoverage(counter.VariableDeclaration),
    ParameterDeclaration: withCoverage(counter.ParameterDeclaration),
    BindingElement: withCoverage(counter.BindingElement),
    FunctionDeclReturn: withCoverage(counter.FunctionDeclReturn),
    ArrowFunctionReturn: withCoverage(counter.ArrowFunctionReturn),
    AsExpression: withCoverage(counter.AsExpression)
}); };
var sum = function (a, b) { return ({
    totalCount: a.totalCount + b.totalCount,
    anyCount: a.anyCount + b.anyCount
}); };
exports.mergeCounters = function (counters) {
    return convertCounterToWithCoverage(counters.reduce(function (a, b) { return ({
        VariableDeclaration: sum(a.VariableDeclaration, b.VariableDeclaration),
        ParameterDeclaration: sum(a.ParameterDeclaration, b.ParameterDeclaration),
        BindingElement: sum(a.BindingElement, b.BindingElement),
        FunctionDeclReturn: sum(a.FunctionDeclReturn, b.FunctionDeclReturn),
        ArrowFunctionReturn: sum(a.ArrowFunctionReturn, b.ArrowFunctionReturn),
        AsExpression: sum(a.AsExpression, b.AsExpression)
    }); }));
};
// ______________________________________________________
//
exports.aggregateCounter = function (counter) {
    var totalCount = 0;
    var anyCount = 0;
    for (var key in counter) {
        var item = counter[key];
        totalCount += item.totalCount;
        anyCount += item.anyCount;
    }
    var coverage = totalCount === 0 ? 1 : 1 - anyCount / totalCount;
    return {
        totalCount: totalCount,
        anyCount: anyCount,
        coverage: coverage
    };
};
