import { buildConfig as buildConfigCore } from '../../taro-fast-rollup/rollupAssist/configBuilder';

const inputFile = {
  ...{
    index: 'src/index.ts',
  },
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
      'taro-fast-common/es/utils/mediaDefault',
      'taro-fast-common/es/utils/tips',
      'taro-fast-common/es/utils/tools',
      'taro-fast-common/es/utils/typeCheck',
      'taro-fast-common/es/utils/typeConvert',
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
