import { buildConfig } from './config/rollupConfig';

const config = buildConfig({ terser: false });

console.log({ message: 'rollup.config.noCompression.js' });

export default config;
