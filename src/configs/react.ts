import { Linter } from 'eslint';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import reactYouMightNotNeedAnEffectPlugin from 'eslint-plugin-react-you-might-not-need-an-effect';
import globals from 'globals';

import { pluginName } from '../util.js';

const config: Linter.Config[] = [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

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

  // The plugin provides 2 rules
  // @ts-expect-error The configs property is missing from the type declaration
  reactHooksPlugin.configs['flat/recommended'],
  {
    name: `${pluginName()}/react-hooks`,
    rules: {
      // This is a warning in recommended-latest, we treat as an error
      'react-hooks/exhaustive-deps': 'error',
      // The remaining rule, 'react-hooks/rules-of-hooks' is already an error
    },
  },

  reactRefreshPlugin.configs.recommended,

  // All recommended rules in eslint-plugin-react-you-might-not-need-an-effect
  // are enabled as warnings, unlike other plugins, we do not override this
  // for now
  reactYouMightNotNeedAnEffectPlugin.configs.recommended,
];

export default config;
