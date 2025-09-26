import jsEslint from '@eslint/js';
import { Linter } from 'eslint';
import importPlugin from 'eslint-plugin-import';
import { defineConfig } from 'eslint/config';

const config: Linter.Config[] = defineConfig([
  {
    name: 'js',
    extends: [jsEslint.configs.recommended],
    rules: {
      // Not enabled in recommended, we prefer to be more specific
      radix: ['error', 'as-needed'],

      // Not enabled in recommended, we treat it as an error
      'no-plusplus': [
        'error',
        {
          allowForLoopAfterthoughts: true,
        },
      ],
    },
  },

  {
    // Linting of ES6+ import/export syntax
    name: 'import',
    extends: [importPlugin.flatConfigs.recommended, importPlugin.flatConfigs.typescript],
    rules: {
      'import/newline-after-import': 'error',
      'import/no-unresolved': 'error',
    },
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
  },
]);

export default config;
