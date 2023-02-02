import { ENV_TYPE, getApp, getEnv } from '@tarojs/taro';

import {
  getApplicationMergeConfig,
  isObject,
  isUndefined,
} from 'easy-soft-utility';

export function getDefaultTaroGlobalData() {
  return {
    test: 'success',
  };
}

export function getTaroGlobalData() {
  const env = getEnv();

  // 标签栏滚动
  switch (env) {
    case ENV_TYPE.WEAPP:
      const app = getApp();

      if (isUndefined(app)) {
        return null;
      }

      if (app.$app == null) {
        return {};
      }

      return app.$app.taroGlobalData;

    case ENV_TYPE.ALIPAY:
      console.warn(`framework with env [${env}] has no adaptation`);
      break;

    case ENV_TYPE.SWAN:
      console.warn(`framework with env [${env}] has no adaptation`);
      break;

    case ENV_TYPE.WEB:
      if (!window.taroGlobalData) {
        window.taroGlobalData = getDefaultTaroGlobalData();
      }

      return window.taroGlobalData;

    default:
      console.warn(`framework with env [${env}] has no adaptation`);
      break;
  }

  return null;
}

export function setTaroGlobalData(config) {
  const env = getEnv();

  switch (env) {
    case ENV_TYPE.WEAPP:
      break;

    case ENV_TYPE.ALIPAY:
      console.warn(`framework with env [${env}] has no adaptation`);

    case ENV_TYPE.SWAN:
      console.warn(`framework with env [${env}] has no adaptation`);
      break;

    case ENV_TYPE.WEB:
      if (!isObject(window.taroGlobalData)) {
        window.taroGlobalData = {};
      }

      window.taroGlobalData.appInitCustomLocal = config;
      break;

    default:
      console.warn(`framework with env [${env}] has no adaptation`);
      break;
  }
}

/**
 * corsTarget
 * 跨域域名配置
 * @export
 * @param {*} v
 * @returns
 */
export function corsTarget() {
  const appInit = getApplicationMergeConfig();
  let corsTargetDomain = '';

  if (appInit.apiPrefix != null) {
    if (appInit.apiPrefix.corsTargetDomain != null) {
      const {
        apiPrefix: { corsTargetDomain: corsTargetDomainRemote },
      } = appInit;

      corsTargetDomain = corsTargetDomainRemote;
    }
  }

  return corsTargetDomain;
}
