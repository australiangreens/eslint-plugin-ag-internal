// This is the linting of our plugin itself, not what is exported

import eslintPlugin from 'eslint-plugin-eslint-plugin';
import { defineConfig, globalIgnores } from 'eslint/config';

import selfPlugin from './src';

export default defineConfig([
  globalIgnores(['**/node_modules', '**/dist', '**/coverage', '**/scripts']),

  selfPlugin.configs.recommended,

  {
    name: 'eslint-plugin-eslint-plugin',
    extends: [eslintPlugin.configs.recommended],
    rules: {
      'eslint-plugin/require-meta-docs-description': 'error',
    },
  },
]);
