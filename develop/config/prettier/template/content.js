/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const mainContent = `/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const { generalConfig } = require('./develop/config/prettier/config');

module.exports = generalConfig;
`;

const packageContent = `/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

var { generalConfig } = require("../../develop/config/prettier/config");

module.exports = generalConfig;
`;

module.exports = {
  mainContent,
  packageContent,
};
