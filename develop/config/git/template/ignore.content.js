/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const content = `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# ignore dependencies dir
**/node_modules

# ignore distribute dir
**/dist
**/es

# ignore temporary dir
**/.umi
**/.umi-production

# ignore config dir
**/.idea
**/.history
**/.swc
**/.vs

# ignore jest dir
**/coverage

# ignore general file
*.log
*.d.ts
*.bak

# ignore special file
rollup.config-*.cjs
yarn.lock
package-lock.json
pnpm-lock.yaml
.firebase
.eslintcache

`;

module.exports = {
  content,
};
