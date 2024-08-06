/* eslint-disable no-undef */
/* eslint-disable import/no-commonjs */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const commitScript = {
  precommit: 'npm run z:lint:staged:quiet',
};

const jsdocScript = {
  'prez:jsdoc:generate': 'npm run z:jsdoc:clear',
  'z:jsdoc:generate': 'npx jsdoc -c .jsdoc.js',
  'z:jsdoc:clear': 'npx easy-soft-develop rimraf --path ./docs',
};

const lintScript = {
  'z:lint:file:all': 'npm run z:lint:script:all && npm run z:lint:style:all',
  'z:lint:file:all:fix':
    'npm run z:lint:script:all:fix && npm run z:lint:style:all:fix',
  'z:lint:file:change':
    'npm run z:lint:script:change && npm run z:lint:style:all',
  'z:lint:file:change:fix':
    'npm run z:lint:script:change:fix && npm run z:lint:style:all:fix',
  'z:lint:script:all': 'npx eslint --ext .js,.jsx,.ts,.tsx ./src',
  'z:lint:script:all:fix': 'npx eslint --fix --ext .js,.jsx,.ts,.tsx ./src',
  'postz:lint:script:all:fix': 'npm run z:prettier:format:all',
  'z:lint:script:change': 'npx eslint --cache --ext .js,.jsx,.ts,.tsx ./src',
  'z:lint:script:change:fix':
    'npx eslint --fix --cache --ext .js,.jsx,.ts,.tsx ./src',
  'postz:lint:script:change:fix': 'npm run z:prettier:format:change',
  'z:lint:staged': 'npx lint-staged',
  'z:lint:staged:quiet': 'npx lint-staged --quiet',
  'z:lint:style:all':
    'npx stylelint --allow-empty-input "./src/**/*.{css,scss,less}"',
  'z:lint:style:all:fix':
    'npx stylelint --allow-empty-input --fix "./src/**/*.{css,scss,less}"',
  'postz:lint:style:all:fix': 'npm run z:prettier:format:all',
  'z:lint:style:change':
    'npx stylelint --allow-empty-input --cache "./src/**/*.{css,scss,less}"',
  'z:lint:style:change:fix':
    'npx stylelint --allow-empty-input --cache --fix "./src/**/*.{css,scss,less}"',
  'postz:lint:style:change:fix': 'npm run z:prettier:format:change',
};

const prettierScript = {
  'z:prettier:format:all': 'npx prettier --write .',
  'z:prettier:format:change': 'npx prettier --cache --write .',
  'z:prettier:package.json': 'npx prettier --write ./package.json',
};

const tscScript = {
  'z:tsc:build':
    'echo show tsc version and create declaration file && tsc -v && tsc -p ./tsconfig.types.json && echo declaration file generate complete',
};

const jestScript = {
  'z:test': 'cross-env NODE_ENV=test jest',
};

module.exports = {
  ...commitScript,
  ...jsdocScript,
  ...lintScript,
  ...prettierScript,
  ...tscScript,
  ...jestScript,
};
