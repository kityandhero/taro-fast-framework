import { buildConfig as buildConfigCore } from '../../../develop/config/rollup/configBuilder';

const inputFile = {
  ...{
    'customComponents/index': 'src/customComponents/index.jsx',
  },
  ...{
    'functionComponent/index': 'src/functionComponent/index.jsx',
  },
};

export function buildConfig({ terser: whetherTerser = false }) {
  return buildConfigCore({
    inputFile,
    terser: whetherTerser,
    externalCollection: [
      'taro-fast-common/es/utils/cacheAssist',
      'taro-fast-common/es/utils/constants',
      'taro-fast-common/es/utils/env',
      'taro-fast-common/es/utils/mediaDefault',
      'taro-fast-common/es/utils/tips',
      'taro-fast-common/es/utils/tools',
      'easy-soft-utility',
      'easy-soft-utility',
      'taro-fast-common/es/utils/provider',
      'taro-fast-common/es/utils/hooks',
      'taro-fast-common/es/customComponents',
    ],
  });
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
