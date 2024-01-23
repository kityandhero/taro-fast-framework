/* eslint-disable no-undef */
/* eslint-disable import/no-commonjs */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const parserJsOptions = {
  requireConfigFile: false,
  babelOptions: {
    presets: [
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
        },
      ],
      '@babel/preset-env',
    ],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-transform-class-properties', { loose: true }],
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
