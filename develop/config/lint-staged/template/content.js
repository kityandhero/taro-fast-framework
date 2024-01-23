/* eslint-disable no-undef */
/* eslint-disable import/no-commonjs */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const content = `{
  "*.{md,json}": ["npx prettier --cache --write"],
  "*.{js,jsx}": ["npx eslint --ext .js,.jsx", "npx prettier --cache --write"],
  "*.{ts,tsx}": [
    "npx eslint --ext .ts,.tsx",
    "npx prettier --cache --parser=typescript --write"
  ],
  "*.{css,less,scss}": [
    "stylelint --allow-empty-input",
    "npx prettier --cache --write"
  ]
}
`;

module.exports = {
  content,
};
