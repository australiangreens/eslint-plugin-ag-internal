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

console.log('ok', expected.join(', '));
