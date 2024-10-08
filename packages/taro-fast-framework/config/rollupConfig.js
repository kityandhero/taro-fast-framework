import { buildConfig as buildConfigCore } from '../../../develop/config/rollup/configBuilder';

const inputFile = {
  index: 'src/index.jsx',
};

export function buildConfig({ terser: whetherTerser = false }) {
  return buildConfigCore({
    inputFile,
    terser: whetherTerser,
    externalCollection: [
      'taro-fast-common',
      'taro-fast-component',
      'taro-fast-component-extra',
      'taro-fast-component-prism',
      'taro-fast-design-playground',
    ],
  });
}
