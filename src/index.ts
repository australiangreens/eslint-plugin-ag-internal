import { Linter } from 'eslint';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import { defineConfig } from 'eslint/config';
import fs from 'fs';

import javascriptConfig from './configs/javascript.js';
import reactConfig from './configs/react.js';
import typescriptConfig from './configs/typescript.js';

// The relative path works from both src/ and dist/
const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

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
    name: pkg.name as string,
    version: pkg.version as string,
  },
  configs: {
    recommended: buildConfig(javascriptConfig, typescriptConfig),
    recommendedJsOnly: buildConfig(javascriptConfig),
    recommendedReact: buildConfig(javascriptConfig, typescriptConfig, reactConfig),
    recommendedReactJsOnly: buildConfig(javascriptConfig, reactConfig),
  },
};

export default plugin;
