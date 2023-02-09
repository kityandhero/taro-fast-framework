import { buildConfig as buildConfigCore } from '../../../develop/config/rollup/configBuilder';

const inputFile = {
  index: 'src/index.jsx',
};

export function buildConfig({ terser: whetherTerser = false }) {
  return buildConfigCore({ inputFile, terser: whetherTerser });
}
