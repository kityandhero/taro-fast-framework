/* eslint-disable import/no-commonjs */

const lintScript = {
  'build:rollup':
    'npx rimraf ./es && rollup --config rollup.config.compression.js --bundleConfigAsCjs',
  'postbuild:rollup': 'npm run tsc:build',
  'build:rollup:skipCompression':
    'npx rimraf ./es && rollup --config rollup.config.skipCompression.js --bundleConfigAsCjs',
  'postbuild:rollup:skipCompression': 'npm run tsc:build',
  'clean-file': 'rimraf ./src/.umi && rimraf ./node_modules',
  'dev:rollup':
    'rollup --config rollup.config.skipCompression.js --bundleConfigAsCjs --watch --watch.onBundleEnd="npm run tsc:build"',
  'lint:file:all': 'npm run lint:script:all && npm run lint:style:all',
  'lint:file:all:fix':
    'npm run lint:script:all:fix && npm run lint:style:all:fix',
  'lint:file:change': 'npm run lint:script:change && npm run lint:style:all',
  'lint:file:change:fix':
    'npm run lint:script:change:fix && npm run lint:style:all:fix',
  'lint:script:all': 'npx eslint --ext .js,.jsx,.ts,.tsx ./src',
  'lint:script:all:fix': 'npx eslint --fix --ext .js,.jsx,.ts,.tsx ./src',
  'postlint:script:all:fix': 'npm run prettier:format:all',
  'lint:script:change': 'npx eslint --cache --ext .js,.jsx,.ts,.tsx ./src',
  'lint:script:change:fix':
    'npx eslint --fix --cache --ext .js,.jsx,.ts,.tsx ./src && npm run lint:style:fix',
  'postlint:script:change:fix': 'npm run prettier:format:change',
  'lint:staged': 'npx lint-staged --quiet',
  'lint:style:all': 'npx stylelint "./src/**/*.less"',
  'lint:style:all:fix': 'npx stylelint --fix "./src/**/*.less"',
  'postlint:style:all:fix': 'npm run prettier:format:all',
  'lint:style:change': 'npx stylelint --cache "./src/**/*.less"',
  'lint:style:change:fix': 'npx stylelint --cache --fix "./src/**/*.less"',
  'postlint:style:change:fix': 'npm run prettier:format:change',
  precommit: 'npm run lint:staged',
  'tsc:build':
    'echo show tsc version and create declaration file && tsc -v && tsc -p ./tsconfig.types.json && echo declaration file generate complete',
};

const prettierScript = {
  'prettier:format:all': 'npx prettier --write .',
  'prettier:format:change': 'npx prettier --cache --write .',
  'prettier:package.json': 'npx prettier --write ./package.json',
};

module.exports = {
  lintScript,
  prettierScript,
};
