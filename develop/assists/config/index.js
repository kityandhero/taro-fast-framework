/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const cleanCommand = 'lerna clean -y';

const cleanCollection = [
  'yarn-error.log',
  'yarn.lock',
  'package-lock.json',
  'src/.umi',
];

const developDependencePackageCollection = [
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
];

const updateSpecialPackageCollection = [
  'easy-soft-develop',
  'easy-soft-dva',
  'easy-soft-utility',
];

const updatePackageFromPackageOptions = {
  agent: '',
  localFile: '',
  packageUrl: '',
  repo: '',
};

module.exports = {
  cleanCommand,
  cleanCollection,
  developDependencePackageCollection,
  updateSpecialPackageCollection,
  updatePackageFromPackageOptions,
};
