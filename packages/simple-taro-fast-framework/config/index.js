// eslint-disable-next-line import/no-commonjs
// const path = require('path');

const config = {
  projectName: 'simple-taro-fast-framework',
  date: '2021-12-30',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: `dist/${process.env.TARO_ENV}`,
  plugins: [['@tarojs/plugin-framework-react', { reactMode: 'concurrent' }]],
  defineConstants: {
    SHOW_LOG_IN_CONSOLE: process.env.NODE_ENV === 'develop',
  },
  copy: {
    patterns: [
      {
        from: 'src/sitemap.json',
        to: 'dist/sitemap.json',
      },
    ],
    options: {},
  },
  framework: 'react',
  // alias: {
  //   '@': path.resolve(__dirname, '..', 'src'),
  // },
  compiler: {
    type: 'webpack5',
    prebundle: {
      enable: false,
    },
  },
  cache: {
    enable: false,
  },
  mini: {
    baseLevel: 20,
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
    // prerender: {
    //   match: ['pages/**', 'example/**', 'framework/**'],
    // },
  },
  h5: {
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
    devServer: {
      host: 'localhost',
      port: 8903,
    },
    // webpackChain(chain, webpack) {
    //   console.log(webpack);

    //   chain.merge({
    //     module: {
    //       rule: {
    //         myloader: {
    //           test: /\.md$/,
    //           use: [
    //             {
    //               loader: 'raw-loader',
    //               options: {},
    //             },
    //           ],
    //         },
    //       },
    //     },
    //   });
    // },
  },
};

export default function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'));
  }

  return merge({}, config, require('./prod'));
}
