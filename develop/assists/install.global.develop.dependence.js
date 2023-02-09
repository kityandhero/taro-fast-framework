/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const { installGlobalDevelopDependencePackages } = require('easy-soft-develop');

const { developDependencePackageCollection } = require('./config');

installGlobalDevelopDependencePackages(developDependencePackageCollection);
