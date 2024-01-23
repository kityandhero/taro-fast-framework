/* eslint-disable no-undef */
/* eslint-disable import/no-commonjs */
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
  '@rollup/plugin-terser',
  '@rollup/plugin-url',
  '@svgr/rollup',
  'autoprefixer',
  'cssnano',
  'rollup',
  'rollup-plugin-copy',
  'rollup-plugin-livereload',
  'rollup-plugin-postcss',
  'rollup-plugin-serve',
  'rollup-plugin-typescript2',
];

const childrenSpecialDevelopPackageList = [
  {
    name: 'taro-fast-common',
    packages: developPackageList,
  },
  {
    name: 'taro-fast-component',
    packages: developPackageList,
  },
  {
    name: 'taro-fast-component-extra',
    packages: developPackageList,
  },
  {
    name: 'taro-fast-component-prism',
    packages: developPackageList,
  },
  {
    name: 'taro-fast-framework',
    packages: developPackageList,
  },
];

module.exports = {
  childrenSpecialDevelopPackageList,
};
