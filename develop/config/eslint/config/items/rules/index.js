/* eslint-disable no-undef */
/* eslint-disable import/no-commonjs */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const { rules: embedRules } = require('./embed');
const { rules: customRules } = require('./custom');

module.exports = {
  rules: {
    ...embedRules,
    ...customRules,
  },
};
