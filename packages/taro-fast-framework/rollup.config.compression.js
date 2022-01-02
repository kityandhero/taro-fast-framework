import { buildConfig } from './config/rollupConfig';

const config = buildConfig({ terser: true });

console.log({ message: 'rollup.config.compression.js' });

export default config;
