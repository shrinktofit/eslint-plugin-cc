"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const experimental_utils_1 = require("@typescript-eslint/experimental-utils");
exports.default = experimental_utils_1.ESLintUtils.RuleCreator((name) => `no-global-cc`)({
    name: 'no-global-cc',
    meta: {
        type: 'problem',
        docs: {
            description: 'Use module \'cc\' instead of global namespace `cc`',
            category: 'Best Practices',
            recommended: 'error',
        },
        schema: [],
        messages: {
            errorUseGlobal: 'Use module \'cc\' instead of legacy global namespace `cc`',
        },
    },
    defaultOptions: [],
    create(context, []) {
        return {
            Identifier(node) {
                if (node.name !== 'cc') {
                    return;
                }
                let isDeclared = false;
                let scope = context.getScope();
                while (scope) {
                    if (scope.variables.some((variable) => variable.name === node.name)) {
                        isDeclared = true;
                        break;
                    }
                    scope = scope.upper;
                }
                if (!isDeclared) {
                    context.report({
                        messageId: 'errorUseGlobal',
                        node,
                    });
                }
            }
        };
    }
});
//# sourceMappingURL=no-global-cc.js.map