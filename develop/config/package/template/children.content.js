/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const lintScript = {
  precommit: 'npm run z:lint:staged',
  'z:lint:file:all': 'npm run lint:script:all && npm run lint:style:all',
  'z:lint:file:all:fix': 'npm run lint:script:all:fix && npm run lint:style:all:fix',
  'z:lint:file:change': 'npm run lint:script:change && npm run lint:style:all',
  'z:lint:file:change:fix': 'npm run lint:script:change:fix && npm run lint:style:all:fix',
  'z:lint:script:all': 'npx eslint --ext .js,.jsx,.ts,.tsx ./src',
  'z:lint:script:all:fix': 'npx eslint --fix --ext .js,.jsx,.ts,.tsx ./src',
  'postz:lint:script:all:fix': 'npm run prettier:format:all',
  'z:lint:script:change': 'npx eslint --cache --ext .js,.jsx,.ts,.tsx ./src',
  'z:lint:script:change:fix': 'npx eslint --fix --cache --ext .js,.jsx,.ts,.tsx ./src && npm run lint:style:fix',
  'postz:lint:script:change:fix': 'npm run prettier:format:change',
  'z:lint:staged': 'npx lint-staged --quiet',
  'z:lint:style:all': 'npx stylelint "./src/**/*.less"',
  'z:lint:style:all:fix': 'npx stylelint --fix "./src/**/*.less"',
  'postz:lint:style:all:fix': 'npm run prettier:format:all',
  'z:lint:style:change': 'npx stylelint --cache "./src/**/*.less"',
  'z:lint:style:change:fix': 'npx stylelint --cache --fix "./src/**/*.less"',
  'postz:lint:style:change:fix': 'npm run prettier:format:change',
  'z:tsc:build': 'echo show tsc version and create declaration file && tsc -v && tsc -p ./tsconfig.types.json && echo declaration file generate complete',
};

const prettierScript = {
  'z:prettier:format:all': 'npx prettier --write .',
  'z:prettier:format:change': 'npx prettier --cache --write .',
  'z:prettier:package.json': 'npx prettier --write ./package.json',
};

module.exports = {
  ...lintScript,
  ...prettierScript,
};
