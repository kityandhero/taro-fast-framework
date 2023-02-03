/* eslint-disable import/no-commonjs */

const shell = require('shelljs');
const fs = require('fs');

const { resolve } = require('path');

const packageList = [
  ...[
    '@babel/core',
    '@babel/eslint-parser',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-decorators',
    '@babel/plugin-transform-runtime',
    '@babel/preset-react',
    '@babel/runtime',
  ],
  ...[
    '@commitlint/cli',
    '@commitlint/config-conventional',
    '@commitlint/config-lerna-scopes',
    '@commitlint/cz-commitlint',
    '@pmmmwh/react-refresh-webpack-plugin',
    'commitizen',
    'conventional-changelog-conventionalcommits',
  ],
  ...[
    '@rollup/plugin-alias',
    '@rollup/plugin-babel',
    '@rollup/plugin-buble',
    '@rollup/plugin-commonjs',
    '@rollup/plugin-json',
    '@rollup/plugin-node-resolve',
    '@rollup/plugin-replace',
    '@rollup/plugin-url',
    '@svgr/rollup',
    'rollup',
    'rollup-plugin-copy',
    'rollup-plugin-livereload',
    'rollup-plugin-postcss',
    'rollup-plugin-serve',
    'rollup-plugin-terser',
    'rollup-plugin-typescript2',
  ],
  ...[
    'prettier',
    'prettier-plugin-organize-imports',
    'prettier-plugin-packagejson',
  ],
  ...['stylelint', 'stylelint-config-prettier', 'stylelint-config-standard'],
  ...['rimraf', 'lint-staged'],
];

const ncuCommand = `pnpm install -save-dev ${packageList.join(' ')}`;

function adjustMainPackageJson() {
  shell.exec(ncuCommand);
}

function adjustChildrenPackageJson() {
  const packagesDir = './packages/';

  const packagesPath = resolve(packagesDir);

  fs.readdir(packagesDir, (err, files) => {
    if (err) {
      throw err;
    }

    files.forEach((file) => {
      const itemPath = `${packagesPath}/${file}`;

      if (file && fs.lstatSync(itemPath).isDirectory()) {
        shell.exec(`cd ./packages/${file} && ${ncuCommand}`);
      }
    });
  });
}

console.log(`${packageList.join()} will install`);
console.log('');

adjustChildrenPackageJson();

adjustMainPackageJson();

console.log('install success');
