/* eslint-disable import/no-commonjs */

let { generalRules, sortRules } = require('../rules');

const rules = {
  ...generalRules,
  ...sortRules,
};

console.log(rules);

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
