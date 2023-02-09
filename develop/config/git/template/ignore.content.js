/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const content = `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
**/node_modules

# ignore dir
**/dist
**/es
**/.umi
**/.umi-production
**/.idea
**/.history
**/.vs

# ignore file
*.log
*.d.ts
*.bak

# ignore special
rollup.config-*.cjs
yarn.lock
package-lock.json
.firebase
.eslintcache
`;

module.exports = {
  content,
};
