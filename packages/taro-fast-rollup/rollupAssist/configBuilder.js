// import pxtorem from 'postcss-pxtorem';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import babelConfig from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';

// import { pxToRemRoot } from '../../taro-fast-common/src/utils/constants';

const externalCollection = [
  '@babel/runtime',
  '@babel/helpers',
  '@rollup/plugin-node-resolve',
  '@rollup/plugin-json',
  '@rollup/plugin-commonjs',
  '@rollup/plugin-url',
  'rollup-plugin-typescript2',
  'rollup-plugin-postcss',
  '@svgr/rollup',
  'rollup-plugin-terser',
  '@rollup/plugin-babel',
  'postcss-pxtorem',
  'autoprefixer',
  'cssnano',
  'react',
  'react-dom',
  'react/jsx-runtime',
  '@tarojs/components',
  '@tarojs/runtime',
  '@tarojs/taro',
  '@tarojs/react',
  '@tarojs/plugin-framework-react',
  '@tarojs/plugin-framework-vue2',
  '@tarojs/plugin-framework-vue3',
  'lodash',
  'lodash/filter',
  'lodash/sortBy',
  'lodash/findIndex',
  'lodash/find',
  'lodash/reverse',
  'lodash/replace',
  'lodash/trim',
  'lodash/remove',
  'lodash/difference',
  'lodash/split',
  'lodash/get',
  'lodash/sortedUniq',
  'lodash/endsWith',
  'lodash/assign',
  'lodash/assignWith',
  'lodash/forEach',
  'lodash/memoize',
  'lodash/round',
  'lodash/floor',
  'lodash/gte',
  'lodash/first',
  'lodash/set',
  'lodash/size',
  'lodash/map',
  'lodash/startsWith',
  'lodash/isEqual',
  'lodash/isFunction',
  'lodash/isBoolean',
  'lodash/isUndefined',
  'lodash/isNull',
  'lodash/isDate',
  'lodash/isString',
  'lodash/isObject',
  'lodash/isNumber',
  'lodash/toNumber',
  'lodash/toString',
  'lodash/toUpper',
  'lodash/toLower',
  'lodash/uniqBy',
  'qs',
  'dayjs',
  'node-cache',
  'react-redux',
  'redux',
  'redux-logger',
  'redux-thunk',
  'classnames',
  'prismjs',
  'babel-plugin-prismjs',
  'object-hash',
  'invariant',
  'flatten',
  'mm',
  'warning',
  'global',
  'is-plain-object',
  'redux-saga',
  '@reduxjs/toolkit',
];

export function buildConfig({
  inputFile,
  terser: whetherTerser = false,
  externalCollection: otherExternalCollection = [],
}) {
  const externals = [...externalCollection, ...(otherExternalCollection || [])];

  // const pxtoremConfig = {
  //   rootValue: pxToRemRoot,
  //   propList: ['*'],
  // };

  console.log({
    inputFile,
    terser: whetherTerser,
    externals,
    // pxtorem: pxtoremConfig,
  });

  const config = {
    external: (d) => {
      return (
        /^react$/.test(d) ||
        /^@tarojs\/taro$/.test(d) ||
        /^@tarojs\/taro-h5$/.test(d) ||
        d.includes('@babel/runtime')
      );
    },
    input: inputFile,
    plugins: [
      json(),
      url(),
      svgr(),
      resolve({
        preferBuiltins: false,
      }),
      commonjs({
        include: ['node_modules/**', '../../node_modules/**'],
      }),
      typescript({
        tsconfig: 'tsconfig.json',
      }),
      postcss({
        plugins: [
          autoprefixer(),
          // pxtorem(pxtoremConfig),
          cssnano(),
        ],
        inject: { insertAt: 'top' },
        extract: true,
      }),
      babelConfig({
        extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', 'ts', 'tsx'],
        babelHelpers: 'runtime',
      }),
    ],
    external: externals,
    output: {
      entryFileNames: '[name].js',
      dir: 'es',
      chunkFileNames: '[name].js',
      format: 'es',
      sourcemap: false,
    },
  };

  if (whetherTerser) {
    config.plugins.push(terser());
  }

  return config;
}
/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function emptyExport() {
  return {};
}
