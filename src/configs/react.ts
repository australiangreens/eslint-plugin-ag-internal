import { Linter } from 'eslint';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import { pluginName } from '../util.js';

const config: Linter.Config[] = [
  jsxA11yPlugin.flatConfigs.strict,
  {
    name: `${pluginName()}/jsx-a11y`,
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

  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  {
    name: `${pluginName()}/react`,
    rules: {
      // Enforce destructuring for props instead of the props.foo pattern
      'react/destructuring-assignment': ['error', 'always'],
    },
    settings: {
      // https://github.com/jsx-eslint/eslint-plugin-react#configuration
      react: {
        version: 'detect',
      },
    },
  },

  reactHooksPlugin.configs['recommended-latest'],

  reactRefreshPlugin.configs.recommended,
  {
    name: `${pluginName()}/react-refresh`,
    rules: {
      // [LIST-974] Disabled for now until we fix the issues it raises
      'react-refresh/only-export-components': 'off',
    },
  },
];

export default config;
