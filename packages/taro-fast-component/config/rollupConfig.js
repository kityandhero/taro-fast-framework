import { buildConfig as buildConfigCore } from '../../../develop/config/rollup/configBuilder';

const inputFile = {
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
    externalCollection: ['taro-fast-common'],
  });
}
