import { ENV_TYPE, getApp, getEnv as getEnvironment } from '@tarojs/taro';

import {
  canToNumber,
  checkStringIsNullOrWhiteSpace,
  getApplicationMergeConfig,
  isNumber,
  isObject,
  isString,
  isUndefined,
  logException,
  toNumber,
} from 'easy-soft-utility';

export function getDefaultTaroGlobalData() {
  return {
    test: 'success',
  };
}

export function getTaroGlobalData() {
  const environment = getEnvironment();

  // 标签栏滚动
  switch (environment) {
    case ENV_TYPE.WEAPP: {
      const app = getApp();

      if (isUndefined(app)) {
        return null;
      }

      if (app.$app == undefined) {
        return {};
      }

      return app.$app.taroGlobalData;
    }

    case ENV_TYPE.ALIPAY: {
      console.warn(`framework with env [${environment}] has no adaptation`);
      break;
    }

    case ENV_TYPE.SWAN: {
      console.warn(`framework with env [${environment}] has no adaptation`);
      break;
    }

    case ENV_TYPE.WEB: {
      if (!window.taroGlobalData) {
        window.taroGlobalData = getDefaultTaroGlobalData();
      }

      return window.taroGlobalData;
    }

    default: {
      console.warn(`framework with env [${environment}] has no adaptation`);
      break;
    }
  }

  return null;
}

export function setTaroGlobalData(config) {
  const environment = getEnvironment();

  switch (environment) {
    case ENV_TYPE.WEAPP: {
      break;
    }

    case ENV_TYPE.ALIPAY: {
      console.warn(`framework with env [${environment}] has no adaptation`);

      break;
    }

    case ENV_TYPE.SWAN: {
      console.warn(`framework with env [${environment}] has no adaptation`);

      break;
    }

    case ENV_TYPE.WEB: {
      if (!isObject(window.taroGlobalData)) {
        window.taroGlobalData = {};
      }

      window.taroGlobalData.appInitCustomLocal = config;

      break;
    }

    default: {
      console.warn(`framework with env [${environment}] has no adaptation`);

      break;
    }
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

  if (
    appInit.apiPrefix != undefined &&
    appInit.apiPrefix.corsTargetDomain != undefined
  ) {
    const {
      apiPrefix: { corsTargetDomain: corsTargetDomainRemote },
    } = appInit;

    corsTargetDomain = corsTargetDomainRemote;
  }

  return corsTargetDomain;
}

export function buildBase64Image(v) {
  if (checkStringIsNullOrWhiteSpace(v)) {
    return '';
  }

  return `data:image/png;base64,${v}`;
}

/**
 * judge year whether leap year
 * @param {number|string} year
 * @returns
 */
export function judgeLeapYear(year) {
  if (!isString(year) && !isNumber(year)) {
    logException(
      {
        year,
      },
      'param year must be string or number',
    );

    return false;
  }

  if (isString(year) && !canToNumber(year)) {
    logException(
      {
        year,
      },
      'param year must can convert to number',
    );
  }

  const yearAdjust = isNumber(year) ? year : toNumber(year);

  return (
    (yearAdjust % 4 == 0 && yearAdjust % 100 != 0) || yearAdjust % 400 == 0
  );
}
