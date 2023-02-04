/* eslint-disable import/no-commonjs */

const lintScript = {
  'lint:staged': 'npx lint-staged',
};

const prepareScript = {
  prepare: 'husky install',
};

const toolsScript = {
  'show:info':
    'echo node version && node --version && echo npm version && npm --version && echo ------------ && npx lerna ls -a -l',
  'update:cz:flag': 'node ./develop/assists/cz.flag.refresh.js',

  'sleep:change-nrm': 'node ./develop/assists/sleep.js',
};

const publishScript = {
  changelog:
    'lerna version --conventional-commits --no-push --no-git-tag-version',
  'prepublish-npm-all': 'npm run change-nrm-npm',
  'publish-npm-all': 'nrm ls && npm run publish:npm-all',
  'postpublish-npm-all': 'npm run change-nrm-local && nrm ls',
  'prepublish:lerna': 'npm run change-nrm-npm',
  'publish:lerna': 'lerna updated && npm run lerna:publish',
  'postpublish:lerna': 'npm run change-nrm-local && npm run publish-npm-all',
  'prepublish:build': 'pnpm install && npm run cz && npm run build:all',
  'publish:build': 'npm run publish:lerna',
};

const cleanScript = {
  'clean:all': 'node ./develop/assists/clean.js',
};

const envScript = {
  'config:env': 'node ./develop/assists/env.init.js',

  'postconfig:env': 'npm run prettier:package.json:all',
};

const lernaScript = {
  'lerna:publish': 'lerna publish --yes',
  'prelerna:bootstrap': 'npm run change-nrm-local',
  'lerna:bootstrap':
    'npm run clean:all && husky install && git pull && pnpm install',
};

const installScript = {
  reinstall: 'npm run lerna:bootstrap',
  postinstall: 'npm run config:env',
  'install:dependence:dev': 'node ./develop/assists/globalDependence.js',
  'postinstall:dependence:dev': 'pnpm install',
};

const nrmScript = {
  'change-nrm-local': 'nrm use local && npm run sleep:change-nrm',
  'change-nrm-npm': 'nrm use npm && npm run sleep:change-nrm',
};

const commitScript = {
  commitlint: 'npx commitlint --edit',
  precz: 'npm run update:cz:flag && git stage -A',
  cz: 'cz',
  postcz: 'git push',
  precommit: 'npm run lint:staged',
};

const prettierScript = {
  'prettier:format:all': 'npx prettier --write .',
  'prettier:format:change': 'npx prettier --cache --write .',
  'prettier:package.json:current': 'npx prettier --write ./package.json',
  'prettier:package.json:all': 'npx prettier --write ./**/package.json',
};

const ncuScript = {
  'ncu:all': 'node ./develop/assists/ncu.all.js',
  'ncu:u:all': 'node ./develop/assists/ncu.u.all.js',
  'postncu:u:all': 'pnpm install',
  'ncu:u:special': 'node ./develop/assists/ncu.u.special.js',
  'postncu:u:special': 'pnpm install',
};

module.exports = {
  lintScript,
  prettierScript,
  prepareScript,
  toolsScript,
  publishScript,
  cleanScript,
  envScript,
  lernaScript,
  installScript,
  nrmScript,
  commitScript,
  ncuScript,
};
