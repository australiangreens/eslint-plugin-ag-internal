// This is the linting of our plugin itself, not what is exported

import eslintPlugin from 'eslint-plugin-eslint-plugin';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';

import selfPlugin from './src';

export default defineConfig([
  globalIgnores(['**/node_modules', '**/dist', '**/coverage']),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  selfPlugin.configs.typescript,

  {
    name: 'eslint-plugin-eslint-plugin',
    // @ts-expect-error Caused by an issue with @types/eslint-plugin-jsx-a11y
    // See https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/73747
    extends: [eslintPlugin.configs.recommended],
    rules: {
      'eslint-plugin/require-meta-docs-description': 'error',
    },
  },
]);
