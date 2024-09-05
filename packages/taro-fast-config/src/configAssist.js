/* eslint-disable no-undef */
/* eslint-disable import/no-commonjs */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

function checkDevelopment() {
  return process.env.NODE_ENV === 'development';
}

const copy = {
  patterns: [
    {
      from: 'src/sitemap.json',
      to: 'dist/sitemap.json',
    },
  ],
  options: {},
};

const alias = {
  '@tarojs/runtime': require.resolve('@tarojs/runtime'),
};

const compiler = {
  type: 'webpack5',
  prebundle: {
    enable: false,
    force: true,
    exclude: [
      'taro-fast-common',
      'taro-fast-component',
      'taro-fast-component-extra',
      'taro-fast-component-prism',
      'taro-fast-framework',
    ],
  },
};

const general = {
  copy,
  alias,
  compiler,
  framework: 'react',
  plugins: [['@tarojs/plugin-framework-react', { reactMode: 'concurrent' }]],
  cache: {
    enable: false,
    // enable: true,
  },
};

const mini = {
  debugReact: false,
  miniCssExtractPluginOption: {
    ignoreOrder: true,
  },
  postcss: {
    pxtransform: {
      enable: true,
      config: {},
    },
    url: {
      enable: true,
      config: {
        limit: 1024, // 设定转换尺寸上限
      },
    },
    cssModules: {
      enable: false, // 默认为 false, 如需使用 css modules 功能, 则设为 true
      config: {
        namingPattern: 'module', // 转换模式, 取值为 global/module
        generateScopedName: '[name]__[local]___[hash:base64:5]',
      },
    },
  },
};

const h5 = {
  debugReact: false,
  miniCssExtractPluginOption: {
    ignoreOrder: true,
  },
  publicPath: '/',
  staticDirectory: 'static',
  postcss: {
    autoprefixer: {
      enable: true,
      config: {},
    },
    cssModules: {
      enable: false, // 默认为 false, 如需使用 css modules 功能, 则设为 true
      config: {
        namingPattern: 'module', // 转换模式, 取值为 global/module
        generateScopedName: '[name]__[local]___[hash:base64:5]',
      },
    },
  },
};

const taroFastConfig = {
  general,
  mini,
  h5,
};

module.exports = { checkDevelopment, taroFastConfig };
