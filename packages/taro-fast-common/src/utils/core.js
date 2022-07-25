import { ENV_TYPE, getApp, getEnv } from '@tarojs/taro';

import { appInitDefault } from './constants';
import { isObject, isUndefined } from './typeCheck';

export function getDefaultTaroGlobalData() {
  return {
    test: 'success',
  };
}

export function getTaroGlobalData() {
  const ENV = getEnv();

  // 标签栏滚动
  switch (ENV) {
    case ENV_TYPE.WEAPP:
      const app = getApp();

      if (isUndefined(app)) {
        return null;
      }

      return app.$app.taroGlobalData;

    case ENV_TYPE.ALIPAY:
      console.warn(`框架在该环境[${ENV}]还未适配`);
      break;

    case ENV_TYPE.SWAN:
      console.warn(`框架在该环境[${ENV}]还未适配`);
      break;

    case ENV_TYPE.WEB:
      if (!window.taroGlobalData) {
        window.taroGlobalData = getDefaultTaroGlobalData();
      }

      return window.taroGlobalData;

    default:
      console.warn(`框架在该环境[${ENV}]还未适配`);
      break;
  }

  return null;
}

export function setTaroGlobalData(config) {
  const ENV = getEnv();

  // 标签栏滚动
  switch (ENV) {
    case ENV_TYPE.WEAPP:
      break;

    case ENV_TYPE.ALIPAY:
      console.warn(`框架在该环境[${ENV}]还未适配`);

    case ENV_TYPE.SWAN:
      console.warn(`框架在该环境[${ENV}]还未适配`);
      break;

    case ENV_TYPE.WEB:
      if (!isObject(window.taroGlobalData)) {
        window.taroGlobalData = {};
      }

      window.taroGlobalData.appInitCustomLocal = config;
      break;

    default:
      console.warn(`框架在该环境[${ENV}]还未适配`);
      break;
  }
}

export function getAppInitConfigData() {
  let appInitConfig = appInitDefault;

  const taroGlobalData = getTaroGlobalData();

  if (taroGlobalData) {
    if ((taroGlobalData.appInitCustomLocal || null) != null) {
      appInitConfig = {
        ...appInitConfig,
        ...taroGlobalData.appInitCustomLocal,
      };
    }

    if ((taroGlobalData.appInitCustomRemote || null) != null) {
      appInitConfig = {
        ...appInitConfig,
        ...taroGlobalData.appInitCustomRemote,
      };
    }
  }

  return appInitConfig;
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function emptyExport() {
  return {};
}
