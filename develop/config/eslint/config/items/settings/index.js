/* eslint-disable no-undef */
/* eslint-disable import/no-commonjs */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const { settings: embedSettings } = require('./embed');
const { settings: customSettings } = require('./custom');

module.exports = {
  settings: {
    ...embedSettings,
    ...customSettings,
  },
};
