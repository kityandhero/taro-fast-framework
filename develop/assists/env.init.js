/* eslint-disable import/no-commonjs */
let fs = require('fs');
const { resolve } = require('path');

function prompt(err, message) {
  if (err) {
    return console.error(err);
  }

  console.log(message);
}

let rootEslintContent = `/* eslint-disable import/no-commonjs */
let { generalConfig } = require('./develop/config/eslint/config');

module.exports = generalConfig;
`;

let packageEslintContent = `/* eslint-disable import/no-commonjs */
let { generalConfig } = require('../../develop/config/eslint/config');

module.exports = generalConfig;
`;

let rootPrettierContent = `/* eslint-disable import/no-commonjs */
let { generalConfig } = require('./develop/config/prettier/config');

module.exports = generalConfig;
`;

let packagePrettierContent = `/* eslint-disable import/no-commonjs */
var { generalConfig } = require("../../develop/config/prettier/config");

module.exports = generalConfig;
`;

let rootStylelintContent = `/* eslint-disable import/no-commonjs */
let { generalConfig } = require('./develop/config/stylelint/config');

module.exports = generalConfig;
`;

let packageStylelintContent = `/* eslint-disable import/no-commonjs */
let { generalConfig } = require('../../develop/config/stylelint/config');

module.exports = generalConfig;
`;

let editorConfigContent = `# http://editorconfig.org
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab
`;

let eslintIgnoreContent = `**/public
**/lib
**/es
**/.history
**/.husky
**/.vs
**/.swc

*.d.ts
*.log
*.zip
*.txt
*.7z
rollup.config-*.cjs
`;

let prettierIgnoreContent = `# ignore dir
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
**/.swc/**

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
.prettierrc.js
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

let gitAttributesContent = `*.js eol=lf
*.jsx eol=lf
*.json eol=lf
*.css eol=lf
*.less eol=lf
*.scss eol=lf
`;

let gitIgnoreContent = `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
**/node_modules

# ignore dir
**/dist
**/es
**/.umi
**/.umi-production
**/.idea
**/.history
**/.swc

# ignore file
*.log
*.d.ts
*.bak
*.min.js

# ignore special
rollup.config-*.cjs
yarn.lock
package-lock.json
.firebase
.eslintcache
`;

let lintStagedRcContent = `{
  "*.{md,json}": ["prettier --cache --write"],
  "*.{js,jsx}": ["npx eslint --ext .js,.jsx,.ts,.tsx", "prettier --cache --write"],
  "*.{css,less}": [
    "stylelint",
    "prettier --cache --write"
  ],
  "*.ts?(x)": [
    "npx eslint --ext .js,.jsx,.ts,.tsx",
    "prettier --cache --parser=typescript --write"
  ]
}
`;

fs.writeFile('.eslintrc.js', rootEslintContent, (error) => {
  prompt(error, `${resolve('./')}/.eslintrc.js config file update success`);
});

fs.writeFile('.prettierrc.js', rootPrettierContent, (error) => {
  prompt(error, `${resolve('./')}/.prettierrc.js config file update success`);
});

fs.writeFile('.stylelintrc.js', rootStylelintContent, (error) => {
  prompt(error, `${resolve('./')}/.stylelintrc.js config file update success`);
});

fs.writeFile('.editorconfig', editorConfigContent, (error) => {
  prompt(error, `${resolve('./')}/.editorconfig config file update success`);
});

fs.writeFile('.eslintignore', eslintIgnoreContent, (error) => {
  prompt(error, `${resolve('./')}/.eslintignore config file update success`);
});

fs.writeFile('.prettierignore', prettierIgnoreContent, (error) => {
  prompt(error, `${resolve('./')}/.prettierignore config file update success`);
});

fs.writeFile('.gitattributes', gitAttributesContent, (error) => {
  prompt(error, `${resolve('./')}/.gitattributes config file update success`);
});

fs.writeFile('.gitignore', gitIgnoreContent, (error) => {
  prompt(error, `${resolve('./')}/.gitignore config file update success`);
});

fs.writeFile('.lintstagedrc', lintStagedRcContent, (error) => {
  prompt(error, `${resolve('./')}/.lintstagedrc config file update success`);
});

const packagesDir = './packages/';

const packagesPath = resolve(packagesDir);

fs.readdir(packagesDir, (err, files) => {
  if (err) {
    throw err;
  }

  files.forEach((file) => {
    const itemPath = `${packagesPath}/${file}`;

    if (file && fs.lstatSync(itemPath).isDirectory()) {
      fs.writeFile(
        `${itemPath}/.eslintrc.js`,
        packageEslintContent,
        (error) => {
          prompt(error, `${itemPath}/.eslintrc.js config file update success`);
        },
      );

      fs.writeFile(
        `${itemPath}/.prettierrc.js`,
        packagePrettierContent,
        (error) => {
          prompt(
            error,
            `${itemPath}/.prettierrc.js config file update success`,
          );
        },
      );

      fs.writeFile(
        `${itemPath}/.stylelintrc.js`,
        packageStylelintContent,
        (error) => {
          prompt(
            error,
            `${itemPath}/.stylelintrc.js config file update success`,
          );
        },
      );

      fs.writeFile(
        `${itemPath}/.editorconfig`,
        editorConfigContent,
        (error) => {
          prompt(error, `${itemPath}/.editorconfig config file update success`);
        },
      );

      fs.writeFile(
        `${itemPath}/.eslintignore`,
        eslintIgnoreContent,
        (error) => {
          prompt(error, `${itemPath}/.eslintignore config file update success`);
        },
      );

      fs.writeFile(
        `${itemPath}/.prettierignore`,
        prettierIgnoreContent,
        (error) => {
          prompt(
            error,
            `${itemPath}/.prettierignore config file update success`,
          );
        },
      );

      fs.writeFile(
        `${itemPath}/.gitattributes`,
        gitAttributesContent,
        (error) => {
          prompt(
            error,
            `${itemPath}/.gitattributes config file update success`,
          );
        },
      );

      fs.writeFile(`${itemPath}/.gitignore`, gitIgnoreContent, (error) => {
        prompt(error, `${itemPath}/.gitignore config file update success`);
      });

      fs.writeFile(
        `${itemPath}/.lintstagedrc`,
        lintStagedRcContent,
        (error) => {
          prompt(error, `${itemPath}/.lintstagedrc config file update success`);
        },
      );
    }
  });
});
