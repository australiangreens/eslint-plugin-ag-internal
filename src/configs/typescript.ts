import { Linter } from 'eslint';
import tsdocPlugin from 'eslint-plugin-tsdoc';
import { configs as tsEslintConfigs } from 'typescript-eslint';

import { pluginName } from '../util.js';

const config: Linter.Config[] = [
  ...tsEslintConfigs.recommended,
  {
    name: `${pluginName()}/typescript-eslint`,
    rules: {
      // Not enabled in recommended
      '@typescript-eslint/no-use-before-define': [
        'error',
        {
          variables: true,
          functions: false,
          classes: false,
          enums: true,
          typedefs: true,
        },
      ],

      // It can be useful to effectively re-export the props of another
      // component for some wrappers. E.g. SaladBarProviderProps is same as
      // SnackbarProps
      '@typescript-eslint/no-empty-interface': 'off',
    },
  },

  {
    // Provides single rule for validating that TypeScript doc comments conform
    // to the TSDoc specification
    name: `${pluginName()}/tsdoc`,
    // At time of writing tsdoc didn't have an exported flat config, but we can
    // import it as per https://github.com/microsoft/tsdoc/issues/374
    plugins: {
      tsdoc: tsdocPlugin,
    },
    rules: {
      'tsdoc/syntax': 'warn',
    },
  },
];

export default config;
