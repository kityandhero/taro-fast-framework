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
    externalCollection: ['taro-fast-common', 'taro-fast-component'],
  });
}
