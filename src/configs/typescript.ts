import { Linter } from 'eslint';
import tsdoc from 'eslint-plugin-tsdoc';
import { defineConfig } from 'eslint/config';
import tsEslint from 'typescript-eslint';

const config: Linter.Config[] = defineConfig([
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
]);

export default config;
