import { Linter } from 'eslint';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import { defineConfig } from 'eslint/config';

import javascriptConfig from './configs/javascript.js';
import reactConfig from './configs/react.js';
import typescriptConfig from './configs/typescript.js';
import { pluginScopedName, pluginVersion } from './util.js';

type ConfigName =
  | 'recommended'
  | 'recommendedJsOnly'
  | 'recommendedReact'
  | 'recommendedReactJsOnly';

type Plugin = {
  meta: {
    name: string;
    version: string;
  };
  // Being specific here instead of relying on inference avoids an issue with
  // the generated declaration files
  configs: Record<ConfigName, Linter.Config[]>;
};

const buildConfig = (...configs: Linter.Config[][]): Linter.Config[] =>
  defineConfig([...configs, eslintConfigPrettier]);

const plugin: Plugin = {
  meta: {
    name: pluginScopedName() as string,
    version: pluginVersion() as string,
  },
  configs: {
    recommended: buildConfig(javascriptConfig, typescriptConfig),
    recommendedJsOnly: buildConfig(javascriptConfig),
    recommendedReact: buildConfig(javascriptConfig, typescriptConfig, reactConfig),
    recommendedReactJsOnly: buildConfig(javascriptConfig, reactConfig),
  },
};

export default plugin;
