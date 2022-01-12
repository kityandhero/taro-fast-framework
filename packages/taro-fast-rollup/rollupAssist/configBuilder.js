import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import svgr from '@svgr/rollup';
import url from 'rollup-plugin-url';
import { terser } from 'rollup-plugin-terser';
import babelConfig from '@rollup/plugin-babel';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

const externalCollection = [
  '@babel/runtime',
  '@rollup/plugin-node-resolve',
  '@rollup/plugin-json',
  '@rollup/plugin-commonjs',
  'rollup-plugin-typescript2',
  'rollup-plugin-postcss',
  '@svgr/rollup',
  'rollup-plugin-url',
  'rollup-plugin-terser',
  '@rollup/plugin-babel',
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
  'qs',
  'node-cache',
  'react-redux',
  'redux',
  'redux-logger',
  'redux-thunk',
  'dva-loading',
  'dva-core',
  'classnames',
];

export function buildConfig({
  inputFile,
  terser: whetherTerser = false,
  externalCollection: otherExternalCollection = [],
}) {
  const externals = [...externalCollection, ...(otherExternalCollection || [])];

  console.log({
    inputFile,
    terser: whetherTerser,
    externals,
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
        plugins: [autoprefixer(), cssnano()],
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
