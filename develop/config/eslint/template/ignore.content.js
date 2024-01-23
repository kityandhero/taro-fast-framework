/* eslint-disable no-undef */
/* eslint-disable import/no-commonjs */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const content = `**/public
**/lib
**/es
**/.history
**/.vs
**/.swc

*.d.ts
*.log
*.zip
*.txt
*.7z
*.min.js
rollup.config-*.cjs
`;

module.exports = {
  content,
};
