// eslint-disable-next-line import/no-commonjs
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
    // "@babel/plugin-proposal-class-properties",
    // "@babel/plugin-proposal-object-rest-spread",
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
