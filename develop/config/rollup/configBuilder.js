import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
// import pxtorem from 'postcss-pxtorem';
// import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import babelConfig from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
// import serve from 'rollup-plugin-serve';
import terser from '@rollup/plugin-terser';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';

// import { pxToRemRoot } from '../../taro-fast-common/src/utils/constants';

const externalCollection = [
  '@babel/helpers',
  '@babel/runtime',
  '@reduxjs/toolkit',
  '@rollup/plugin-babel',
  '@rollup/plugin-commonjs',
  '@rollup/plugin-json',
  '@rollup/plugin-node-resolve',
  '@rollup/plugin-terser',
  '@rollup/plugin-url',
  '@svgr/rollup',
  '@tarojs/components',
  '@tarojs/plugin-framework-react',
  '@tarojs/plugin-framework-vue2',
  '@tarojs/plugin-framework-vue3',
  '@tarojs/react',
  '@tarojs/runtime',
  '@tarojs/taro',
  'autoprefixer',
  'babel-plugin-prismjs',
  'classnames',
  'cssnano',
  'dayjs',
  'easy-soft-dva',
  'easy-soft-dva/es/dva-core',
  'easy-soft-dva/es/dva-loading',
  'easy-soft-utility',
  'flatten',
  'global',
  'invariant',
  'is-plain-object',
  'lodash',
  'lodash/assign',
  'lodash/assignWith',
  'lodash/difference',
  'lodash/dropRight',
  'lodash/endsWith',
  'lodash/filter',
  'lodash/find',
  'lodash/findIndex',
  'lodash/first',
  'lodash/floor',
  'lodash/forEach',
  'lodash/get',
  'lodash/gte',
  'lodash/isBoolean',
  'lodash/isDate',
  'lodash/isEqual',
  'lodash/isFunction',
  'lodash/isNull',
  'lodash/isNumber',
  'lodash/isObject',
  'lodash/isString',
  'lodash/isUndefined',
  'lodash/map',
  'lodash/memoize',
  'lodash/remove',
  'lodash/replace',
  'lodash/reverse',
  'lodash/round',
  'lodash/set',
  'lodash/size',
  'lodash/sortBy',
  'lodash/sortedUniq',
  'lodash/split',
  'lodash/startsWith',
  'lodash/toLower',
  'lodash/toNumber',
  'lodash/toString',
  'lodash/toUpper',
  'lodash/trim',
  'lodash/uniqBy',
  'mm',
  'node-cache',
  'postcss-pxtorem',
  'prismjs',
  'react',
  'react-dom',
  'react-redux',
  'react/jsx-runtime',
  'redux',
  'redux-logger',
  'redux-saga',
  'redux-thunk',
  'rollup-plugin-postcss',
  'rollup-plugin-typescript2',
  'warning',
];

export function buildConfig({
  inputFile,
  terser: whetherTerser = false,
  externalCollection: otherExternalCollection = [],
  // serve: whetherServe = false,
}) {
  const externals = [...externalCollection, ...(otherExternalCollection || [])];

  // const pxtoremConfig = {
  //   rootValue: pxToRemRoot,
  //   propList: ['*'],
  // };

  // console.log({
  //   inputFile,
  //   terser: whetherTerser,
  //   externals,
  //   // pxtorem: pxtoremConfig,
  // });

  const config = {
    external: externals,
    input: inputFile,
    plugins: [
      json(),
      url(),
      svgr(),
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.svelte'],
        preferBuiltins: false,
      }),
      commonjs({
        include: ['node_modules/**', '../../node_modules/**'],
      }),
      typescript({
        // check: true,
        // verbosity: 3,
        tsconfig: 'tsconfig.json',
      }),
      postcss({
        plugins: [
          autoprefixer(),
          //  pxtorem(pxtoremConfig),
          cssnano(),
        ],
        inject: { insertAt: 'top' },
        extract: true,
        // modules: true,
      }),
      babelConfig({
        extensions: [...DEFAULT_EXTENSIONS, 'ts', 'tsx'],
        babelHelpers: 'runtime',
      }),
    ],
    output: {
      entryFileNames: '[name].js',
      dir: 'es',
      chunkFileNames: '[name].js',
      format: 'es',
      // eslint-disable-next-line no-undef
      sourcemap: process.env.NODE_ENV === 'development',
    },
  };

  if (whetherTerser) {
    config.plugins.push(terser());
  }

  // if (whetherServe) {
  //   config.plugins.push(livereload());

  //   config.plugins.push(serve(whetherServe));
  // }

  return config;
}
