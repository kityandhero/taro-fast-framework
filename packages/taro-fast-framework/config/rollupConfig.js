import { buildConfig as buildConfigCore } from '../../taro-fast-rollup/rollupAssist/configBuilder';

const inputFile = {
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
    'utils/tools': 'src/utils/tools.js',
  },
  ...{
    'framework/index': 'src/framework/index.jsx',
  },
  ...{
    'models/index': 'src/models/index.js',
  },
  ...{
    'services/schedulingControl': 'src/services/schedulingControl.js',
  },
};

export function buildConfig({ terser: whetherTerser = false }) {
  return buildConfigCore({
    inputFile,
    terser: whetherTerser,
    externalCollection: [
      ...['taro-fast-dva/es/dva-core', 'taro-fast-dva/es/dva-loading'],
      ...[
        'taro-fast-common/es/utils/cacheAssist',
        'taro-fast-common/es/utils/constants',
        'taro-fast-common/es/utils/env',
        'taro-fast-common/es/utils/mediaDefault',
        'taro-fast-common/es/utils/tips',
        'taro-fast-common/es/utils/tools',
        'taro-fast-common/es/utils/typeCheck',
        'taro-fast-common/es/utils/typeConvert',
        'taro-fast-common/es/utils/provider',
        'taro-fast-common/es/utils/hooks',
        'taro-fast-common/es/customComponents',
      ],
      ...[
        'taro-fast-component/es/customComponents',
        'taro-fast-component/es/functionComponent',
      ],
      ...[
        'taro-fast-component-extra/es/customComponents',
        'taro-fast-component-extra/es/functionComponent',
      ],
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
