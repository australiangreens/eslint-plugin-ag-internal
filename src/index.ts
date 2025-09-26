import { Linter } from 'eslint';
import fs from 'fs';

import typescriptConfig from './configs/typescript.js';

// The relative path works from both src/ and dist/
const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

type Plugin = {
  meta: {
    name: string;
    version: string;
  };
  // Being specific here instead of relying on inference avoids an issue with
  // the generated declaration files
  configs: Record<string, Linter.Config[]>;
};

const plugin: Plugin = {
  meta: {
    name: pkg.name as string,
    version: pkg.version as string,
  },
  configs: {
    typescript: typescriptConfig,
  },
};

export default plugin;
