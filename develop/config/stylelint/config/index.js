/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

module.exports = {
  generalConfig: {
    extends: [
      'stylelint-config-standard',
      'stylelint-config-css-modules',
      'stylelint-config-prettier',
    ],
    plugins: ['stylelint-declaration-block-no-ignored-properties'],
    ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
    customSyntax: 'postcss-less',
    rules: {
      'function-url-quotes': 'always',
      'selector-attribute-quotes': 'always',
      'font-family-no-missing-generic-family-keyword': null,
      'plugin/declaration-block-no-ignored-properties': true,
      'selector-type-no-unknown': null,
      'value-keyword-case': ['lower', { ignoreProperties: ['composes'] }],
      'unicode-bom': 'never',
      'no-descending-specificity': null,
      'selector-class-pattern': null,
      'value-no-vendor-prefix': null,
      'color-function-notation': null,
    },
  },
};
