import { buildConfig as buildConfigCore } from '../../taro-fast-rollup/rollupAssist/configBuilder';

const inputFile = {
  ...{
    index: 'src/index.ts',
  },
  ...{
    'customComponents/index': 'src/customComponents/index.jsx',
  },
};

export function buildConfig({ terser: whetherTerser = false }) {
  return buildConfigCore({
    inputFile,
    terser: whetherTerser,
    externalCollection: ['taro-fast-common'],
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
