/* eslint-disable no-undef */
/* eslint-disable import/no-commonjs */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const content = `describe('group test description', () => {
  test('simple test will be true', () => {
    expect(true).toBe(true);
  });
});
`;

module.exports = {
  content,
};
