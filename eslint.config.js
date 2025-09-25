// This is the linting of our plugin itself, not what is exported

import jsEslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import eslintPlugin from 'eslint-plugin-eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

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

  {
    name: 'eslint-plugin-eslint-plugin',
    extends: [eslintPlugin.configs.recommended],
    rules: {
      'eslint-plugin/require-meta-docs-description': 'error',
    },
  },

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
    name: 'ts',
    // It exports a named config object, but that causes errors
    // eslint-disable-next-line import/no-named-as-default-member
    extends: [tsEslint.configs.recommended],
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

  // Turns off all rules that are unnecessary or might conflict with Prettier,
  // which we use for formatting.
  eslintConfigPrettier,
]);
