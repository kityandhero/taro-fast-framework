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
    'utils/constants': 'src/utils/constants.js',
    'utils/mediaDefault': 'src/utils/mediaDefault.js',
    'utils/typeCheck': 'src/utils/typeCheck.js',
    'utils/typeConvert': 'src/utils/typeConvert.js',
    'utils/tips': 'src/utils/tips.js',
    'utils/tools': 'src/utils/tools.js',
    'utils/cacheAssist': 'src/utils/cacheAssist.js',
    'utils/globalStorageAssist': 'src/utils/globalStorageAssist.js',
    'utils/authority': 'src/utils/authority.js',
    'utils/request': 'src/utils/request.js',
    'utils/virtualRequest': 'src/utils/virtualRequest.js',
    'utils/requestAssistor': 'src/utils/requestAssistor.js',
    'utils/globalModel': 'src/utils/globalModel.js',
    'utils/defaultSettingsSpecial': 'src/utils/defaultSettingsSpecial.js',
    'utils/dva': 'src/utils/dva.js',
    'utils/dvaAssist': 'src/utils/dvaAssist.js',
    'utils/actionAssist': 'src/utils/actionAssist.js',
  },
  ...{
    'customComponents/AppComponent/index':
      'src/customComponents/AppComponent/index.jsx',
  },
  ...{
    'framework/Infrastructure/index': 'src/framework/Infrastructure/index.js',
    'framework/Base/index': 'src/framework/Base/index.js',
    'framework/ComponentWrapper/index':
      'src/framework/ComponentWrapper/index.js',
    'framework/Common/index': 'src/framework/Core/index.js',
    'framework/Common/index': 'src/framework/Common/index.js',
    'framework/SupplementCore/index': 'src/framework/SupplementCore/index.js',
    'framework/Supplement/index': 'src/framework/Supplement/index.js',
    'framework/SupplementWrapper/index':
      'src/framework/SupplementWrapper/index.js',
    'framework/AuthorizationWrapper/index':
      'src/framework/AuthorizationWrapper/index.js',
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
