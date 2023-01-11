module.exports = {
  pluginSearchDirs: false,
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'all',
  proseWrap: 'never',
  semi: true,
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json',
      },
    },
  ],
  plugins: [
    // 'prettier-plugin-organize-imports',
    'prettier-plugin-packagejson',
  ],
};
