import { buildConfig as buildConfigCore } from '../../taro-fast-rollup/rollupAssist/configBuilder';

const inputFile = {
  ...{
    'utils/constants': 'src/utils/constants.js',
    'utils/mediaDefault': 'src/utils/mediaDefault.js',
    'utils/typeCheck': 'src/utils/typeCheck.js',
    'utils/typeConvert': 'src/utils/typeConvert.js',
    'utils/core': 'src/utils/core.js',
    'utils/base': 'src/utils/base.js',
    'utils/log': 'src/utils/log.js',
    'utils/tips': 'src/utils/tips.js',
    'utils/tools': 'src/utils/tools.js',
    'utils/cacheAssist': 'src/utils/cacheAssist.js',
    'utils/hooks': 'src/utils/hooks.js',
    'utils/provider': 'src/utils/provider.js',
    'utils/storageAssist': 'src/utils/storageAssist.js',
  },
  ...{
    'customComponents/index': 'src/customComponents/index.jsx',
  },
};

export function buildConfig({ terser: whetherTerser = false }) {
  return buildConfigCore({ inputFile, terser: whetherTerser });
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
