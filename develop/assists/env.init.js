/* eslint-disable promise/no-nesting */
/* eslint-disable promise/no-promise-in-callback */
/* eslint-disable import/no-commonjs */

const fs = require('fs');
const fsExtra = require('fs-extra');
const { resolve } = require('path');

const eslintFile = require('../config/eslint/template/content');
const eslintIgnoreFile = require('../config/eslint/template/ignore.content');
const prettierFile = require('../config/prettier/template/content');
const prettierIgnoreFile = require('../config/prettier/template/ignore.content');
const stylelintFile = require('../config/stylelint/template/content');
const editorFile = require('../config/editor/template/content');
const editorAttributesFile = require('../config/git/template/attributes.content');
const editorIgnoreFile = require('../config/git/template/ignore.content');
const lintStagedFile = require('../config/lintStaged/template/content');
const mainPackageFile = require('../config/package/template/main.content');
const childrenPackageFile = require('../config/package/template/children.content');

const mainEslintFileContent = eslintFile.mainContent;
const packageEslintFileContent = eslintFile.packageContent;

const eslintIgnoreContent = eslintIgnoreFile.content;

const mainPrettierContent = prettierFile.mainContent;
const packagePrettierContent = prettierFile.packageContent;

const prettierIgnoreContent = prettierIgnoreFile.content;

const mainStylelintContent = stylelintFile.mainContent;
const packageStylelintContent = stylelintFile.packageContent;

const editorConfigContent = editorFile.content;

const gitAttributesContent = editorAttributesFile.content;

const gitIgnoreContent = editorIgnoreFile.content;
const lintStagedRcContent = lintStagedFile.content;

const promptPath = false;

function prompt(err, message) {
  if (err) {
    return console.error(err);
  }

  if (promptPath) {
    console.log(message);
  }
}

function createMain() {
  fs.writeFile('.eslintrc.js', mainEslintFileContent, (error) => {
    prompt(error, `${resolve('./')}/.eslintrc.js config file update success`);
  });

  fs.writeFile('.prettierrc.js', mainPrettierContent, (error) => {
    prompt(error, `${resolve('./')}/.prettierrc.js config file update success`);
  });

  fs.writeFile('.stylelintrc.js', mainStylelintContent, (error) => {
    prompt(
      error,
      `${resolve('./')}/.stylelintrc.js config file update success`,
    );
  });

  fs.writeFile('.editorconfig', editorConfigContent, (error) => {
    prompt(error, `${resolve('./')}/.editorconfig config file update success`);
  });

  fs.writeFile('.eslintignore', eslintIgnoreContent, (error) => {
    prompt(error, `${resolve('./')}/.eslintignore config file update success`);
  });

  fs.writeFile('.prettierignore', prettierIgnoreContent, (error) => {
    prompt(
      error,
      `${resolve('./')}/.prettierignore config file update success`,
    );
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
}

function createPackage() {
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
          packageEslintFileContent,
          (error) => {
            prompt(
              error,
              `${itemPath}/.eslintrc.js config file update success`,
            );
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
            prompt(
              error,
              `${itemPath}/.editorconfig config file update success`,
            );
          },
        );

        fs.writeFile(
          `${itemPath}/.eslintignore`,
          eslintIgnoreContent,
          (error) => {
            prompt(
              error,
              `${itemPath}/.eslintignore config file update success`,
            );
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
            prompt(
              error,
              `${itemPath}/.lintstagedrc config file update success`,
            );
          },
        );
      }
    });
  });
}

function adjustMainPackageJson() {
  const mainProjectPath = resolve(`./package.json`);

  fsExtra
    .readJson(mainProjectPath)
    .then((packageJson) => {
      packageJson.scripts = {
        ...(packageJson.scripts || {}),
        ...mainPackageFile.lintScript,
        ...mainPackageFile.prettierScript,
      };

      fsExtra
        .writeJson(mainProjectPath, packageJson)
        .then(() => {
          console.log('adjust main package.json success');

          return null;
        })
        .catch((err) => {
          console.error(err);
          return null;
        });

      return null;
    })
    .catch((err) => {
      console.error(err);
    });
}

function adjustChildrenPackageJson() {
  const packagesDir = './packages/';

  const packagesPath = resolve(packagesDir);

  fs.readdir(packagesDir, (err, files) => {
    if (err) {
      throw err;
    }

    files.forEach((file) => {
      const itemPath = `${packagesPath}/${file}`;

      if (file && fs.lstatSync(itemPath).isDirectory()) {
        const childPackageJsonPath = `${itemPath}/package.json`;

        fsExtra
          .readJson(childPackageJsonPath)
          .then((packageJson) => {
            packageJson.scripts = {
              ...(packageJson.scripts || {}),
              ...childrenPackageFile.lintScript,
              ...childrenPackageFile.prettierScript,
            };

            fsExtra
              .writeJson(childPackageJsonPath, packageJson)
              .then(() => {
                console.log('adjust child package.json success');

                return null;
              })
              .catch((e) => {
                console.error(e);

                return null;
              });

            return null;
          })
          .catch((res) => {
            console.error(res);

            return null;
          });
      }
    });
  });
}

createMain();

createPackage();

console.log(
  'config files [eslint,prettier,editor,git and other] write success',
);

adjustMainPackageJson();

adjustChildrenPackageJson();
