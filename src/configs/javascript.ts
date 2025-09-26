import jsEslint from '@eslint/js';
import { Linter } from 'eslint';
import importPlugin from 'eslint-plugin-import';

import { pluginName } from '../util.js';

const config: Linter.Config[] = [
  jsEslint.configs.recommended,
  {
    name: `${pluginName()}/eslint`,
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

  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  {
    name: `${pluginName()}/import`,
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
];

export default config;
