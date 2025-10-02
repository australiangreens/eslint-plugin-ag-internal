// This is the linting of our plugin itself, not what is exported

import eslintPlugin from 'eslint-plugin-eslint-plugin';
import { defineConfig, globalIgnores } from 'eslint/config';

import selfPlugin from './src';

export default defineConfig([
  globalIgnores(['**/node_modules', '**/dist', '**/coverage']),

  // @ts-expect-error Caused by an issue with @types/eslint-plugin-jsx-a11y
  // See https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/73747
  selfPlugin.configs.recommended,

  {
    name: 'eslint-plugin-eslint-plugin',
    // @ts-expect-error Same issue as above
    extends: [eslintPlugin.configs.recommended],
    rules: {
      'eslint-plugin/require-meta-docs-description': 'error',
    },
  },
]);
