import { buildConfig } from './config/rollupConfig';

const config = buildConfig({ terser: false });

console.log({ message: 'rollup.config.skipCompression.js' });

export default config;
