/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const parserJsOptions = {
  requireConfigFile: false,
  babelOptions: {
    presets: ['@babel/preset-react'],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
    ],
  },
};

const parserTsOptions = {
  ecmaFeatures: {
    jsx: true,
  },
};

module.exports = {
  parserJsOptions: { ...parserJsOptions },
  parserTsOptions: { ...parserTsOptions },
};
