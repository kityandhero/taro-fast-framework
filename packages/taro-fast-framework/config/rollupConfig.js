import { buildConfig as buildConfigCore } from '../../taro-fast-rollup/rollupAssist/configBuilder';

const inputFile = {
  ...{
    index: 'src/index.ts',
  },
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

export function buildConfig({ terser: whetherTerser = false }) {
  return buildConfigCore({
    inputFile,
    terser: whetherTerser,
    externalCollection: ['taro-fast-common', 'taro-fast-component'],
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
