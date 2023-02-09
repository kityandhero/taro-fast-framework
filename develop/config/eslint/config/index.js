/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const { rules } = require('./items/rules');
const { parserOptions } = require('./items/parser');
const { pluginCollection } = require('./items/plugins');
const { extendCollection } = require('./items/extends');

module.exports = {
  generalConfig: {
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:unicorn/recommended',
      'plugin:promise/recommended',
      'prettier',
      ...extendCollection,
    ],
    env: { es6: true },
    plugins: [
      'unicorn',
      'simple-import-sort',
      'import',
      'prettier',
      ...pluginCollection,
    ],
    parser: '@babel/eslint-parser',
    parserOptions: parserOptions,
    rules: rules,
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          moduleDirectory: ['src', 'node_modules'],
        },
        typescript: {
          // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unIst`
          alwaysTryTypes: true,

          // use an array of glob patterns
          directory: ['./tsconfig.json', './packages/*/tsconfig.json'],
        },
      },
    },
  },
};
