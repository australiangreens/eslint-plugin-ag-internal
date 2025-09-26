import fs from 'fs';

/**
 * Use to get name and version from package.json
 * The relative path works from both src/ and dist/
 */
const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

export function pluginScopedName() {
  return pkg.name;
}

export function pluginName() {
  return pkg.name.replace(/^@.*\//, '');
}

export function pluginVersion() {
  return pkg.version;
}
