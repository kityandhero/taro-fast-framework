import { buildConfig as buildConfigCore } from '../../taro-fast-common/rollupAssist/configBuilder';

const inputFile = {
  ...{
    index: 'src/index.ts',
  },
  ...{
    'customComponents/VerticalBox/index':
      'src/customComponents/VerticalBox/index.jsx',
    'customComponents/Loading/index': 'src/customComponents/Loading/index.jsx',
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
