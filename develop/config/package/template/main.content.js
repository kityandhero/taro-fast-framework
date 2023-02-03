/* eslint-disable import/no-commonjs */

const lintScript = {
  'change-nrm-local': 'nrm use local && npm run sleep:change-nrm',
  'change-nrm-npm': 'nrm use npm && npm run sleep:change-nrm',
  changelog:
    'lerna version --conventional-commits --no-push --no-git-tag-version',
  'preclean:all':
    'rimraf ./yarn-error.log && rimraf ./yarn.lock && rimraf ./package-lock.json',
  'clean:all': 'lerna clean -y',
  commitlint: 'npx commitlint --edit',
  'config:env': 'node ./develop/assists/env.init.js',
  precz: 'npm run update:cz:flag && git stage -A',
  cz: 'cz',
  postcz: 'git push',
  postinstall: 'npm run config:env',
  'lerna:publish': 'lerna publish --yes',
  'prelerna:bootstrap': 'npm run change-nrm-local',
  'lerna:bootstrap':
    'npm run clean:all && husky install && git pull && pnpm install',
  prepare: 'husky install',
  'prepublish-npm-all': 'npm run change-nrm-npm',
  'publish-npm-all': 'nrm ls && npm run publish:npm-all',
  'postpublish-npm-all': 'npm run change-nrm-local && nrm ls',
  'prepublish:lerna': 'npm run change-nrm-npm',
  'publish:lerna': 'lerna updated && npm run lerna:publish',
  'postpublish:lerna': 'npm run change-nrm-local && npm run publish-npm-all',
  'show:info':
    'echo node version && node --version && echo npm version && npm --version && echo ------------ && npx lerna ls -a -l',
  'update:cz:flag': 'node ./develop/assists/cz.flag.refresh.js',
  'update:special': 'node ./develop/assists/update.special.js',
  'postupdate:special': 'pnpm install',
  reinstall: 'npm run lerna:bootstrap',
  'sleep:change-nrm': 'node ./develop/assists/sleep.js',
  'lint:staged': 'npx lint-staged',
  'postconfig:env': 'npm run prettier:package.json:all',
  'prepublish:build': 'pnpm install && npm run cz && npm run build:all',
  'publish:build': 'npm run publish:lerna',
  'postncu:u:all': 'pnpm install',
};

const prettierScript = {
  'prettier:format:all': 'npx prettier --write .',
  'prettier:format:change': 'npx prettier --cache --write .',
  'prettier:package.json:current': 'npx prettier --write ./package.json',
  'prettier:package.json:all': 'npx prettier --write ./**/package.json',
};

module.exports = {
  lintScript,
  prettierScript,
};
