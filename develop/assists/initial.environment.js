/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const { initialEnvironment } = require('easy-soft-develop');

const eslintFile = require('../config/eslint/template/content');
const eslintIgnoreFile = require('../config/eslint/template/ignore.content');
const prettierFile = require('../config/prettier/template/content');
const prettierIgnoreFile = require('../config/prettier/template/ignore.content');
const stylelintFile = require('../config/stylelint/template/content');
const editorFile = require('../config/editor/template/content');
const editorAttributesFile = require('../config/git/template/attributes.content');
const editorIgnoreFile = require('../config/git/template/ignore.content');
const lintStagedFile = require('../config/lint-staged/template/content');
const mainNecessaryPackageFile = require('../config/package/template/main.content');
const childrenNecessaryPackageFile = require('../config/package/template/children.content');
const mainCustomPackageFile = require('../config/package/custom/main.content');
const childrenCustomPackageFile = require('../config/package/custom/children.content');

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

const mainFileContentList = [
  {
    name: '.eslintrc.js',
    content: mainEslintFileContent,
    coverFile: true,
  },
  {
    name: '.prettierrc.js',
    content: mainPrettierContent,
    coverFile: true,
  },
  {
    name: '.stylelintrc.js',
    content: mainStylelintContent,
    coverFile: true,
  },
  {
    name: '.editorconfig',
    content: editorConfigContent,
    coverFile: true,
  },
  {
    name: '.eslintignore',
    content: eslintIgnoreContent,
    coverFile: false,
  },
  {
    name: '.prettierignore',
    content: prettierIgnoreContent,
    coverFile: false,
  },
  {
    name: '.gitattributes',
    content: gitAttributesContent,
    coverFile: true,
  },
  {
    name: '.gitignore',
    content: gitIgnoreContent,
    coverFile: false,
  },
  {
    name: '.lintstagedrc',
    content: lintStagedRcContent,
    coverFile: false,
  },
];

const packageFileContentList = [
  {
    name: '.eslintrc.js',
    content: packageEslintFileContent,
    coverFile: true,
  },
  {
    name: '.prettierrc.js',
    content: packagePrettierContent,
    coverFile: true,
  },
  {
    name: '.stylelintrc.js',
    content: packageStylelintContent,
    coverFile: true,
  },
  {
    name: '.editorconfig',
    content: editorConfigContent,
    coverFile: true,
  },
  {
    name: '.eslintignore',
    content: eslintIgnoreContent,
    coverFile: false,
  },
  {
    name: '.prettierignore',
    content: prettierIgnoreContent,
    coverFile: false,
  },
  {
    name: '.gitattributes',
    content: gitAttributesContent,
    coverFile: true,
  },
  {
    name: '.gitignore',
    content: gitIgnoreContent,
    coverFile: false,
  },
  {
    name: '.lintstagedrc',
    content: lintStagedRcContent,
    coverFile: false,
  },
];

initialEnvironment({
  mainFileContentList: mainFileContentList,
  packageFileContentList: packageFileContentList,
  mainScripts: {
    ...mainCustomPackageFile,
    ...mainNecessaryPackageFile,
  },
  childScripts: {
    ...childrenCustomPackageFile,
    ...childrenNecessaryPackageFile,
  },
});
