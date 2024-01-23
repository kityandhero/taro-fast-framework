/* eslint-disable no-undef */
/* eslint-disable import/no-commonjs */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const {
  parserJsOptions: embedParserJsOptions,
  parserTsOptions: embedParserTsOptions,
} = require('./embed');
const {
  parserJsOptions: customParserJsOptions,
  parserTsOptions: customParserTsOptions,
} = require('./custom');

module.exports = {
  parserJsOptions: { ...embedParserJsOptions, ...customParserJsOptions },
  parserTsOptions: { ...embedParserTsOptions, ...customParserTsOptions },
};
