# eslint-plugin-ag-internal

A collection of eslint rules we use across our JS and TS applications.

This is intended to strictly be an ESM-only package for eslint 9+ with the flat
config. No attempt has been made for backwards compatibility.

## Usage

There is a single peer dependency `eslint` version 9.26.0 or above.

In a simple React application with a standard structure the minimal
`eslint.config.js` file will look like:

```ts
import agLintPlugin from '@australiangreens/eslint-plugin-ag-internal';

export default agLintPlugin.configs.recommendedReact;
```

For more control over the ignored files etc, you may need something more like:

```ts
import agLintPlugin from '@australiangreens/eslint-plugin-ag-internal';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  globalIgnores(['**/node_modules', '**/dist', '**/coverage']),
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: true,
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.vitest,
        ...globals.node,
      },
    },
  },
  agLintPlugin.configs.recommendedReact,
]);
```

## Configs

There are 4 configs: `recommended`, `recommendedReact`, `recommendJsOnly` and
`recommendedReactJsOnly`. Since we primarily use typescript, typically we'll
only be using the first 2.

In all configs the rules are enabled as _errors_ with the exception of ones in
the `react-you-might-not-need-an-effect/` namespace, which are currently only
_warnings_. This may be changed in the future.

### recommendedJsOnly

-   [eslint js plugin](https://www.npmjs.com/package/@eslint/js)'s recommended
    rules with some changes to `radix` and `no-plusplus`.

-   [import plugin](https://www.npmjs.com/package/eslint-plugin-import-esm)'s
    recommended rules with the addition of 2 strict rules.

### recommended

All the rules from recommendedJsOnly with the addition of the following:

-   [typescript-eslint plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)'s
    recommended rules with some small tweaks.

-   [tsdoc plugin](https://www.npmjs.com/package/eslint-plugin-tsdoc)'s single
    `tsdoc/syntax` rule enabled as _error_.

-   [import](https://www.npmjs.com/package/eslint-plugin-import-esm)
    typescript rules.

## recommendedReactJsOnly

recommendedJsOnly with the addition of the following:

-   [jsx-a11y plugin](https://www.npmjs.com/package/@types/eslint-plugin-jsx-a11y)'s
    strict rules with some extras that won't be enabled by default until a
    later version of the plugin.

-   [react plugin](https://www.npmjs.com/package/eslint-plugin-react)'s
    recommended rules with an increase in strictness of the
    `react/destructuring-assignment` rule.

-   [react plugin](https://www.npmjs.com/package/eslint-plugin-react)'s
    jsx-runtime rules.

-   [react-hooks plugin](https://www.npmjs.com/package/eslint-plugin-react-hooks)'s
    recommended rules as errors.

-   [react-refresh plugin](https://www.npmjs.com/package/eslint-plugin-react-refresh)'s
    single rule.

-   [react-you-might-not-need-an-effect](https://www.npmjs.com/package/eslint-plugin-react-you-might-not-need-an-effect)'s
    recommended rules (as warnings, not errors).

## recommendedReact

All the rules in recommendedReactJsOnly with the new ones that recommended
brings.
