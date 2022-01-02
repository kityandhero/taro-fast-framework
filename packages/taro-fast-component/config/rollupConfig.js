import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import babelConfig from '@rollup/plugin-babel';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

const inputFile = {
  ...{
    index: 'src/index.ts',
  },
  ...{
    'customComponents/VerticalBox/index':
      'src/customComponents/VerticalBox/index.jsx',
    'customComponents/Loading/index': 'src/customComponents/Loading/index.jsx',
  },
};

const externalCollection = [
  'react',
  'react-dom',
  '@tarojs/components',
  '@tarojs/runtime',
  '@tarojs/taro',
  '@tarojs/react',
  'lodash',
  'qs',
  'node-cache',
  'react-redux',
  'redux',
  'redux-logger',
  'redux-thunk',
  'dva-loading',
  'dva-core',
  'taro-fast-framework',
];

export function buildConfig({ terser: whetherTerser = false }) {
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
      resolve({
        preferBuiltins: false,
      }),
      commonjs({
        include: ['node_modules/**', '../../node_modules/**'],
        namedExports: {
          // This is needed because react/jsx-runtime exports jsx on the module export.
          // Without this mapping the transformed import import {jsx as _jsx} from 'react/jsx-runtime' will fail.
          'react/jsx-runtime': ['jsx', 'jsxs'],
        },
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
    external: externalCollection,
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
