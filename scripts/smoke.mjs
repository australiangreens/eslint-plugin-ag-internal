import { ESLint } from 'eslint';

import plugin from '../dist/index.js';

const expected = [
  'recommended',
  'recommendedJsOnly',
  'recommendedReact',
  'recommendedReactJsOnly',
];

for (const name of expected) {
  if (!Array.isArray(plugin.configs[name])) {
    throw new Error(`missing or invalid config: ${name}`);
  }
}

async function lint(name, code, filePath) {
  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: plugin.configs[name],
  });
  const results = await eslint.lintText(code, { filePath });
  const fatals = results.flatMap((result) => result.messages).filter((message) => message.fatal);
  if (fatals.length > 0) {
    throw new Error(`${name} (${filePath}): ${fatals.map((message) => message.message).join('; ')}`);
  }
}

await lint(
  'recommended',
  `/**
 * Adds one.
 * @param n - A number
 */
export function add(n: number): number {
  return n + 1;
}
`,
  'sample.ts',
);

await lint(
  'recommendedReact',
  `export function Hello() {
  return <div>hi</div>;
}
`,
  'Hello.tsx',
);

console.log('ok', expected.join(', '));
