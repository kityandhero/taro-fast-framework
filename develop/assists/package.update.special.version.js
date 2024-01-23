/* eslint-disable no-undef */
/* eslint-disable import/no-commonjs */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const { updateSpecialPackageVersion } = require('easy-soft-develop');

const { updateSpecialPackageCollection } = require('./config');

updateSpecialPackageVersion(updateSpecialPackageCollection);
