/* eslint-disable no-undef */
/* eslint-disable import/no-commonjs */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const {
  childrenDevelopPackageList,
} = require('./childrenDevelopPackage.config');
const {
  childrenSpecialDevelopPackageList,
} = require('./childrenSpecialDevelopPackage.config');
const { cleanCollection, cleanCommand } = require('./clean.config');
const { globalDevelopPackageList } = require('./globalDevelopPackage.config');
const { mainDevelopPackageList } = require('./mainDevelopPackage.config');
const {
  updatePackageFromPackageOptions,
} = require('./updatePackageFromPackage.config');
const {
  updateSpecialPackageCollection,
} = require('./updateSpecialPackage.config');

module.exports = {
  childrenDevelopPackageList,
  childrenSpecialDevelopPackageList,
  cleanCollection,
  cleanCommand,
  globalDevelopPackageList,
  mainDevelopPackageList,
  updatePackageFromPackageOptions,
  updateSpecialPackageCollection,
};
