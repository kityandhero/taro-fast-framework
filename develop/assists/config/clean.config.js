/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const cleanCommand = 'lerna clean -y';

const cleanCollection = [
  'yarn-error.log',
  'yarn.lock',
  'package-lock.json',
  'src/.umi',
];

module.exports = {
  cleanCommand,
  cleanCollection,
};
