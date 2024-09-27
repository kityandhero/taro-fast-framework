/* eslint-disable no-undef */
/* eslint-disable import/no-commonjs */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

module.exports = {
  presets: [
    [
      'taro',
      {
        framework: 'react',
        ts: false,
      },
    ],
  ],
  plugins: [
    '@babel/plugin-external-helpers',
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true,
        helpers: true,
        version: '^7.7.7',
      },
    ],
  ],
};
