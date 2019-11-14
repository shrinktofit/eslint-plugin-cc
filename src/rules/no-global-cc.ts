
import { ESLintUtils } from '@typescript-eslint/experimental-utils'
import { Scope } from '@typescript-eslint/experimental-utils/dist/ts-eslint';

type Options = [];

type MessageIds =
  | 'errorUseGlobal';

export default ESLintUtils.RuleCreator((name) => `no-global-cc`)<Options, MessageIds>({
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
                let scope: Scope.Scope | null = context.getScope();
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
