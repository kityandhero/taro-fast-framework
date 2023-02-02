/* eslint-disable import/no-commonjs */

const mainContent = `/* eslint-disable import/no-commonjs */
let { generalConfig } = require('./develop/config/prettier/config');

module.exports = generalConfig;
`;

const packageContent = `/* eslint-disable import/no-commonjs */
var { generalConfig } = require("../../develop/config/prettier/config");

module.exports = generalConfig;
`;

module.exports = {
  mainContent,
  packageContent,
};
