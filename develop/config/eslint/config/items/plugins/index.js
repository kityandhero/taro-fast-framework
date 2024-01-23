/* eslint-disable no-undef */
/* eslint-disable import/no-commonjs */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const { pluginCollection: embedPlugins } = require('./embed');
const { pluginCollection: customPlugins } = require('./custom');

module.exports = {
  pluginCollection: [...embedPlugins, ...customPlugins],
};
