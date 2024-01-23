/* eslint-disable no-undef */
/* eslint-disable import/no-commonjs */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const { installDevelopDependencePackages } = require('easy-soft-develop');

const {
  globalDevelopPackageList,
  mainDevelopPackageList,
  childrenDevelopPackageList,
  childrenSpecialDevelopPackageList,
} = require('./config');

installDevelopDependencePackages({
  globalDevelopPackageList,
  mainDevelopPackageList,
  childrenDevelopPackageList,
  childrenSpecialDevelopPackageList,
});
