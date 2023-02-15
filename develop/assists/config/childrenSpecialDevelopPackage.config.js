/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const developPackageList = [
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

const childrenSpecialDevelopPackageList = {
  'taro-fast-common': developPackageList,
  'taro-fast-component': developPackageList,
  'taro-fast-component-extra': developPackageList,
  'taro-fast-component-prism': developPackageList,
  'taro-fast-framework': developPackageList,
};

module.exports = {
  childrenSpecialDevelopPackageList,
};
