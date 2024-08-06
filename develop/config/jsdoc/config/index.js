/* eslint-disable no-undef */
/* eslint-disable import/no-commonjs */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

module.exports = {
  generalConfig: {
    tags: {
      allowUnknownTags: false,
      dictionaries: ['jsdoc', 'closure'],
    },
    source: {
      include: './src',
    },
    plugins: ['plugins/markdown'],
    opts: {
      template: 'node_modules/docdash',
      encoding: 'utf8',
      destination: 'docs/',
      recurse: true,
      verbose: true,
    },
    templates: {
      cleverLinks: false,
      monospaceLinks: false,
    },
  },
};
