const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.stylelint,
  customSyntax: 'postcss-less',
  rules: {
    'unicode-bom': 'never',
    'no-descending-specificity': null,
    'selector-class-pattern': null,
    'value-no-vendor-prefix': null,
  },
};
