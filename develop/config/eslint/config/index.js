/* eslint-disable no-undef */
/* eslint-disable import/no-commonjs */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const { rules } = require('./items/rules');
const { parserJsOptions, parserTsOptions } = require('./items/parser');
const { pluginCollection } = require('./items/plugins');
const { extendCollection } = require('./items/extends');
const { settings } = require('./items/settings');

module.exports = {
  generalConfig: {
    extends: [...extendCollection],
    env: {
      es6: true,
      browser: true,
      commonjs: true,
      jest: true,
      worker: true,
      shelljs: true,
      node: true,
    },
    plugins: [...pluginCollection],
    parser: '@babel/eslint-parser',
    parserOptions: parserJsOptions,
    overrides: [
      {
        files: ['*.ts', '*.tsx'],
        parser: '@typescript-eslint/parser',
        parserOptions: parserTsOptions,
      },
    ],
    rules: rules,
    settings: settings,
  },
};
