import jsEslint from '@eslint/js';
import { Linter } from 'eslint';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';

import { pluginName } from '../util.js';

const javascriptRulesMinusImportPluginChange: Linter.Config[] = [
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

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
];

// We use this pattern so we don't need to define the rules both here and in
// typescript.ts
export const importPluginChange: Linter.Config = {
  name: `${pluginName()}/import`,
  rules: {
    // These are not incuded in the recommended config, we treat as errors
    'import/newline-after-import': 'error',
    'import/no-unresolved': 'error',

    // These are warnings in recommended, we treat as errors
    'import/no-named-as-default': 'error',
    'import/no-named-as-default-member': 'error',
    'import/no-duplicates': 'error',
  },
};

export default [...javascriptRulesMinusImportPluginChange, importPluginChange];
