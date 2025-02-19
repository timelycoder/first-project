import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  {
    ignores: ['node_modules', 'dist'],
    rules: {
      'no-unused-vars': 'error',
      ///extra 3 ta error add korlam dekher jonno ki hoy niche a
      'no-undef': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
    },
  },
];
