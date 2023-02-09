/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const { extendCollection: extendEmbedPlugins } = require('./embed');
const { extendCollection: extendCustomPlugins } = require('./custom');

module.exports = {
  extendCollection: [...extendEmbedPlugins, ...extendCustomPlugins],
};
