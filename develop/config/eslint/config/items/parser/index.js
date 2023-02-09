/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const { parserOptions: embedParserOptions } = require('./embed');
const { parserOptions: customParserOptions } = require('./custom');

module.exports = {
  parserOptions: { ...embedParserOptions, ...customParserOptions },
};
