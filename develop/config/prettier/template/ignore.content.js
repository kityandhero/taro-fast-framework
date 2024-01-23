/* eslint-disable no-undef */
/* eslint-disable import/no-commonjs */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const content = `# ignore dir
**/node_modules/**
**/templates/**
**/lib/**
**/dist/**
**/es/**
**/.umi/**
**/.umi-production/**
**/.idea/**
**/.ga/**
**/.history/**
**/.husky/**
**/.vs/**

# ignore file
*.png
*.jpg
*.jpeg
*.rar
*.zip
*.7z
*.ico
*.gif
*.toml
*.lock
*.tar.gz
*.log
*.txt
*.text
*.ejs
*.svg
*.min.js

# ignore special
.eslintignore
.stylelintignore
.gitattributes
.browserslistrc
.dockerignore
.gitignore
.prettierignore
.eslintcache
.npmrc
.editorconfig
.czrc
.ga
rollup.config-*.cjs
pnpm-lock.yaml
CNAME
LICENSE
`;

module.exports = {
  content,
};
