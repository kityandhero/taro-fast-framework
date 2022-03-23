// eslint-disable-next-line import/no-commonjs
module.exports = {
  presets: [
    [
      'taro',
      {
        framework: 'react',
        ts: false,
      },
    ],
  ],
  plugins: [
    '@babel/plugin-external-helpers',
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true,
        helpers: true,
        version: '^7.7.7',
      },
    ],
    [
      'prismjs',
      {
        languages: ['javascript', 'css', 'html', 'jsx'],
        plugins: ['line-numbers', 'show-language'],
        theme: 'okaidia',
        css: true,
      },
    ],
  ],
};
