/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const items = {
  react: {
    /**
     * "detect" automatically picks the version you have installed.
     * You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
     * default to latest and warns if missing
     */
    version: 'detect',
  },
};

module.exports = {
  settings: {
    ...items,
  },
};
