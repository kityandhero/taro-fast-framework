/* eslint-disable import/no-commonjs */

let recommendRules = require('../rules');

let generalRules = recommendRules.generalRules;

let sortRules = recommendRules.sortRules;

let rules = Object.assign(generalRules, sortRules, {});

module.exports = {
  generalConfig: {
    extends: ['taro/react', 'prettier', 'plugin:promise/recommended'],
    env: { es6: true },
    plugins: ['simple-import-sort', 'import', 'prettier'],
    parser: '@babel/eslint-parser',
    parserOptions: {
      requireConfigFile: false,
      babelOptions: {
        presets: ['@babel/preset-react'],
      },
    },
    rules: rules,
  },
};
