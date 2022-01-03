import { buildConfig as buildConfigCore } from '../../taro-fast-rollup/rollupAssist/configBuilder';

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
