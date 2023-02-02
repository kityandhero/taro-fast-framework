import { buildConfig as buildConfigCore } from '../../../develop/config/rollup/configBuilder';

const inputFile = {
  ...{
    'utils/globalStorageAssist': 'src/utils/globalStorageAssist.js',
    'utils/request': 'src/utils/request.js',
    'utils/globalModel': 'src/utils/globalModel.js',
    'utils/defaultSettingsSpecial': 'src/utils/defaultSettingsSpecial.js',
    'utils/actionAssist': 'src/utils/actionAssist.js',
    'utils/tools': 'src/utils/tools.js',
    'utils/configAssist': 'src/utils/configAssist.js',
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
      ...[
        'taro-fast-common/es/utils/constants',
        'taro-fast-common/es/utils/env',
        'taro-fast-common/es/utils/mediaDefault',
        'taro-fast-common/es/utils/tips',
        'taro-fast-common/es/utils/tools',
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
