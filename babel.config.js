/* eslint-disable no-undef */
/* eslint-disable import/no-commonjs */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

module.exports = function (api) {
  api.cache(true);
  return {
    babelrcRoots: ['.', 'packages/*'],
  };
};
