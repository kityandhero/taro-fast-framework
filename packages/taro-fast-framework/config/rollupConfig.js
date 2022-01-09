import { buildConfig as buildConfigCore } from '../../taro-fast-rollup/rollupAssist/configBuilder';

const inputFile = {
  // ...{
  //   index: 'src/index.ts',
  // },
  ...{
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
    'framework/index': 'src/framework/index.jsx',
  },
};

export function buildConfig({ terser: whetherTerser = false }) {
  return buildConfigCore({
    inputFile,
    terser: whetherTerser,
    externalCollection: [
      ...[
        'taro-fast-common/es/utils/cacheAssist',
        'taro-fast-common/es/utils/constants',
        'taro-fast-common/es/utils/mediaDefault',
        'taro-fast-common/es/utils/tips',
        'taro-fast-common/es/utils/tools',
        'taro-fast-common/es/utils/typeCheck',
        'taro-fast-common/es/utils/typeConvert',
        'taro-fast-common/es/customComponents',
      ],
      ...[],
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
