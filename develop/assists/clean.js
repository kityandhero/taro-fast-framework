/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const { clean } = require('easy-soft-develop');

const { cleanCommand, cleanCollection } = require('./config');

clean(cleanCommand, ...cleanCollection);
