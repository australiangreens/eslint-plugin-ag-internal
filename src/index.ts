import jsEslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import tsdoc from 'eslint-plugin-tsdoc';
import { defineConfig } from 'eslint/config';
import fs from 'fs';
import tsEslint from 'typescript-eslint';

// '../package.json' be correct both in src/ and dist/
const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

const plugin = {
  meta: {
    name: pkg.name,
    version: pkg.version,
  },
  configs: {
    typescript: defineConfig([
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
        name: 'jsx-a11y',
        extends: [jsxA11yPlugin.flatConfigs.strict],
        rules: {
          // As of eslint-plugin-jsx-a11y v6 these rules are not enabled (since
          // they would be a breaking change). So lets enable them ourselves while
          // we wait for v7.
          'jsx-a11y/lang': 'error',
          'jsx-a11y/no-aria-hidden-on-focusable': 'error',

          // TODO [LIST-981] Except for this one, have 6 errors
          // 'jsx-a11y/prefer-tag-over-role': 'error',
        },
      },

      {
        name: 'react-related',
        extends: [
          reactPlugin.configs.flat.recommended,
          reactPlugin.configs.flat['jsx-runtime'],
          reactHooksPlugin.configs['recommended-latest'],
          reactRefreshPlugin.configs.recommended,
        ],

        rules: {
          // Enforce destructuring for props instead of the props.foo pattern
          'react/destructuring-assignment': ['error', 'always'],

          // [LIST-974] Disabled for now until we fix the issues it raises
          'react-refresh/only-export-components': 'off',
        },
        settings: {
          // https://github.com/jsx-eslint/eslint-plugin-react#configuration
          react: {
            version: 'detect',
          },
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

      {
        // Provides single rule for validating that TypeScript doc comments conform
        // to the TSDoc specification
        name: 'tsdoc',
        // At time of writing tsdoc didn't have an exported flat config, but we can
        // import it as per https://github.com/microsoft/tsdoc/issues/374
        plugins: {
          tsdoc: tsdoc,
        },
        rules: {
          'tsdoc/syntax': 'warn',
        },
      },

      // Turns off all rules that are unnecessary or might conflict with Prettier,
      // which we use for formatting.
      eslintConfigPrettier,
    ]),
  },
};

export default plugin;
