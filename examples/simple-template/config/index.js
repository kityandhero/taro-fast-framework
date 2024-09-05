/* eslint-disable unicorn/prefer-module */
// eslint-disable-next-line import/no-commonjs
// const path = require('path');

import { taroFastConfig } from 'taro-fast-config';

const config = {
  ...taroFastConfig.general,
  projectName: 'taro-fast-application',
  date: '2021-12-30',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: `dist/${process.env.TARO_ENV}`,
  mini: {
    ...taroFastConfig.mini,
    // baseLevel: 33,
    debugReact: true,
  },
  h5: {
    ...taroFastConfig.h5,
    debugReact: true,
    devServer: {
      host: 'localhost',
      port: 8903,
    },
  },
};

export default function mergeConfig(merge) {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line unicorn/prefer-module
    return merge({}, config, require('./dev'));
  }

  // eslint-disable-next-line unicorn/prefer-module
  return merge({}, config, require('./prod'));
}
