import classNames from 'classnames';
import React from 'react';
import {
  canIUse,
  clearStorageSync,
  createAnimation as createAnimationCore,
  createSelectorQuery as createSelectorQueryCore,
  downloadFile,
  getClipboardData,
  getCurrentInstance,
  getMenuButtonBoundingClientRect,
  getSetting as getSettingCore,
  getStorageSync,
  getSystemInfoSync,
  getUpdateManager,
  hideNavigationBarLoading as hideNavigationBarLoadingCore,
  makePhoneCall,
  navigateBack,
  navigateTo as navigateToCore,
  offLocationChange as offGeographicalLocationChangeCore,
  onLocationChange as onGeographicalLocationChangeCore,
  openDocument as openDocumentCore,
  pageScrollTo,
  previewImage,
  redirectTo as redirectToCore,
  reLaunch as reLaunchCore,
  removeStorageSync,
  requestPayment,
  setClipboardData,
  setStorageSync,
  showNavigationBarLoading,
  startLocationUpdate as startGeographicalLocationUpdateCore,
  stopLocationUpdate as stopGeographicalLocationUpdateCore,
  stopPullDownRefresh,
  switchTab,
  uploadFile,
} from '@tarojs/taro';

import {
  checkInCollection,
  envCollection,
  isEqualBySerialize,
  isFunction,
  isNumber,
  isObject,
  isString,
  logDebug,
  logException,
  logExecute,
  notificationTypeCollection,
  setLocalStorageFlusher,
  setLocalStorageGetter,
  setLocalStorageRemover,
  setLocalStorageSetter,
  showErrorMessage,
  toNumber,
} from 'easy-soft-utility';

import {
  getAppInitConfigData,
  getDefaultTaroGlobalData,
  getTaroGlobalData,
  setTaroGlobalData,
} from './core';
import { checkEnv, getEnv } from './env';
import Tips from './tips';

export const isBrowser = typeof document !== 'undefined' && !!document.scripts;
export const isWechat = process.env.TARO_ENV === 'weapp';
export const isSwan = process.env.TARO_ENV === 'swan';
export const isAlipay = process.env.TARO_ENV === 'alipay';
export const isQQ = process.env.TARO_ENV === 'qq';
export const isToutiao = process.env.TARO_ENV === 'tt';

let globalSystemInfo = null;

export {
  canIUse,
  checkEnv,
  downloadFile,
  getAppInitConfigData,
  getClipboardData,
  getCurrentInstance,
  getDefaultTaroGlobalData,
  getEnv,
  getMenuButtonBoundingClientRect,
  getTaroGlobalData,
  getUpdateManager,
  makePhoneCall,
  navigateBack,
  pageScrollTo,
  previewImage,
  requestPayment,
  setClipboardData,
  setTaroGlobalData,
  showNavigationBarLoading,
  stopPullDownRefresh,
  switchTab,
  uploadFile,
};

export function hideNavigationBarLoading() {
  if (isWechat) {
    hideNavigationBarLoadingCore();
  }
}

export function redirectTo(params) {
  if (isString(params)) {
    redirectToCore({
      url: params,
    });

    return;
  }

  if (isObject(params)) {
    redirectToCore(params);

    return;
  }

  const text = '无效的跳转参数';

  showErrorMessage({
    text: text,
  });
}

export function navigateTo(params) {
  if (isString(params)) {
    navigateToCore({
      url: params,
    });

    return;
  }

  if (isObject(params)) {
    navigateToCore(params);

    return;
  }

  const text = '无效的跳转参数';

  showErrorMessage({
    text: text,
  });
}

/**
 * 复制到剪贴板
 * @param {*} text
 * @param {*} showText
 */
export function copyToClipboard({ text, successCallback = null }) {
  setClipboardData({
    data: text,
    success: (res) => {
      if (isFunction(successCallback)) {
        successCallback(text, res);
      }
    },
  });
}

/**
 * corsTarget
 * 跨域域名配置
 * @export
 * @param {*} v
 * @returns
 */
export function corsTarget() {
  const appInit = getAppInitConfigData();
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

/**
 * Reacts生命周期getDerivedStateFromProps 辅助函数用于将url参数解析到返回值中用于设定state,
 * @export
 */
export function getDerivedStateFromPropsForUrlParamsCore(nextProps) {
  const { match } = nextProps;

  if ((match || null) != null) {
    const { params } = match;

    if ((params || null) != null) {
      return { urlParams: params };
    }
  }

  return null;
}

/**
 * Reacts生命周期getDerivedStateFromProps 辅助函数用于将url参数解析到返回值中用于设定state,如果值重复, 则返回null,
 * @export
 */
export function getDerivedStateFromPropsForUrlParams(
  nextProps,
  prevState,
  defaultUrlParams = { id: '' },
  parseUrlParamsForSetState = null,
) {
  let stateUrlParams = getDerivedStateFromPropsForUrlParamsCore(
    nextProps,
    prevState,
  );

  stateUrlParams = stateUrlParams || { urlParams: defaultUrlParams };

  const { urlParams: urlParamsPrev } = prevState;

  const { urlParams } = stateUrlParams;

  if (
    isEqualBySerialize(
      { ...(urlParamsPrev || {}), ...{} },
      { ...(urlParams || {}), ...{} },
    )
  ) {
    return prevState;
  }

  if (isFunction(parseUrlParamsForSetState)) {
    const data = parseUrlParamsForSetState(stateUrlParams);

    return { ...prevState, ...stateUrlParams, ...data };
  }

  return { ...prevState, ...stateUrlParams };
}

export function notifySuccess(text) {
  notify({
    type: notificationTypeCollection.success,
    message: text,
  });
}

/**
 * 发送页面通知
 */
export function notify({
  type = notificationTypeCollection.info,
  message: messageContent,
  closeCallback = null,
}) {
  const { message: text } = {
    ...{
      message: '操作结果',
    },
    ...{
      message: messageContent,
    },
  };

  setTimeout(() => {
    switch (type) {
      case notificationTypeCollection.success:
        Tips.success(text, 1500, closeCallback);
        break;

      case notificationTypeCollection.warning:
        Tips.info(text, 1500, closeCallback);
        break;

      case notificationTypeCollection.error:
        Tips.info(text, 1500, closeCallback);
        break;

      case notificationTypeCollection.info:
        Tips.info(text, 1500, closeCallback);
        break;

      case notificationTypeCollection.warn:
        Tips.info(text, 1500, closeCallback);
        break;

      default:
        Tips.info(text, 1500, closeCallback);
        break;
    }
  }, 600);
}

export function getSystemInfo() {
  if (globalSystemInfo == null) {
    globalSystemInfo = getSystemInfoSync();
  }

  return globalSystemInfo;
}

export function createSelectorQuery() {
  return createSelectorQueryCore();
}

export function requestAnimationFrame(callback) {
  const systemInfo = getSystemInfoSync();

  if (systemInfo.platform === 'devtools') {
    return setTimeout(() => {
      callback();
    }, 33.333333333333336);
  }

  return createSelectorQuery()
    .selectViewport()
    .boundingClientRect()
    .exec(() => {
      callback();
    });
}

export function getSetting(params) {
  return getSettingCore(params);
}

export function reLaunch(params) {
  return reLaunchCore(params);
}

/**
 * startGeographicalLocationUpdate
 */
export function startGeographicalLocationUpdate({
  success = null,
  fail = null,
  complete = null,
}) {
  logExecute('startGeographicalLocationUpdate');

  startGeographicalLocationUpdateCore({
    success,
    fail,
    complete,
  });
}

/**
 * stopGeographicalLocationUpdate
 */
export function stopGeographicalLocationUpdate({
  success = null,
  fail = null,
  complete = null,
}) {
  logExecute('stopGeographicalLocationUpdate');

  stopGeographicalLocationUpdateCore({
    success,
    fail,
    complete,
  });
}

export function onGeographicalLocationChange(callback) {
  logExecute('onGeographicalLocationChange');

  onGeographicalLocationChangeCore(callback);
}

export function offGeographicalLocationChange(callback) {
  logExecute('offGeographicalLocationChange');

  offGeographicalLocationChangeCore(callback);
}

/**
 *
 * @param {*} success  success callback
 * @param {*} fail     fail callback
 * @param {*} complete complete callback
 * @param {*} simulationMode true or false,do not set to true in production,unless you know what it does
 * @param {*} simulationData simulation data for simulation mode set to true
 * @returns
 */
export function getGeographicalLocation({
  success: successCallback,
  fail: failCallback,
  complete: completeCallback,
  simulationMode = false,
  simulationData = null,
}) {
  if (simulationMode) {
    logDebug('getGeographicalLocation simulationMode:true');

    if ((simulationData || null) == null) {
      throw new Error(
        'simulationData is required and must be an object when simulationMode is true!',
      );
    }

    successCallback(simulationData);

    return;
  }

  logExecute('getGeographicalLocation');

  startGeographicalLocationUpdate({
    success: () => {
      logDebug('startGeographicalLocationUpdate callback success');

      onGeographicalLocationChange((res) => {
        try {
          if (isFunction(successCallback)) {
            successCallback(res);
          }
        } catch {
          if (isFunction(failCallback)) {
            failCallback(res);
          }
        } finally {
          offGeographicalLocationChange();

          stopGeographicalLocationUpdate({});
        }
      });
    },
    fail: (res) => {
      logDebug('startGeographicalLocationUpdate callback fail');

      try {
        if (isFunction(failCallback)) {
          failCallback(res);
        }
      } catch (e) {
        logException(e.message);
      } finally {
        stopGeographicalLocationUpdate({});
      }
    },
    complete: (res) => {
      if (isFunction(completeCallback)) {
        completeCallback(res);
      }
    },
  });
}

export function createAnimation(params) {
  return createAnimationCore(params);
}

export function getSelectorQuery() {
  return createSelectorQuery();
}

/**
 * downloadFileAndOpen
 */
export function downloadFileAndOpen({ url, successCallback = null }) {
  downloadFile({
    url,
    success: (res) => {
      if (res.statusCode === 200) {
        if (isFunction(successCallback)) {
          successCallback();
        }

        openDocument({
          filePath: res.tempFilePath,
          fileType: 'pdf',
          showMenu: true,
        });
      }
    },
  });
}

export function openDocument(params) {
  return openDocumentCore(params);
}

export function getFields(selector, context = null) {
  return new Promise((resolve) => {
    let query = createSelectorQuery();

    if (context) {
      query = query.in(context);
    }

    query
      .select(selector)
      .fields({
        node: true,
        size: true,
        properties: ['scrollX', 'scrollY'],
      })
      .exec((rect = []) => {
        return resolve(rect[0]);
      });
  });
}

export function getRect(selector, context = null) {
  return new Promise((resolve) => {
    let query = createSelectorQuery();

    if (context) {
      query = query.in(context);
    }

    query
      .select(selector)
      .boundingClientRect()
      .exec((rect = []) => {
        return resolve(rect[0]);
      });
  });
}

export function getAllRect(selector, context = null) {
  return new Promise((resolve) => {
    let query = createSelectorQuery();
    if (context) {
      query = query.in(context);
    }
    query
      .selectAll(selector)
      .boundingClientRect()
      .exec((rect = []) => resolve(rect[0]));
  });
}

export function getScrollOffset(selector, context = null) {
  return new Promise((resolve) => {
    let query = createSelectorQuery();

    if (context) {
      query = query.in(context);
    }

    query
      .select(selector)
      .scrollOffset()
      .exec((rect = []) => {
        return resolve(rect[0]);
      });
  });
}

export function withNativeProps(props, element) {
  const p = {
    ...element.props,
  };
  if (props.className) {
    p.className = classNames(element.props.className, props.className);
  }
  if (props.style) {
    p.style = {
      ...p.style,
      ...props.style,
    };
  }
  if (props.tabIndex !== undefined) {
    p.tabIndex = props.tabIndex;
  }
  for (const key in props) {
    if (!props.hasOwnProperty(key)) continue;
    if (key.startsWith('data-') || key.startsWith('aria-')) {
      p[key] = props[key];
    }
  }
  return React.cloneElement(element, p);
}

export function handleTouchScroll(flag) {
  if (getEnv() !== envCollection.WEB) {
    return;
  }

  let scrollTop = 0;

  if (flag) {
    scrollTop = document.documentElement.scrollTop;

    // 使body脱离文档流
    document.body.classList.add('tfc-frozen');

    // 把脱离文档流的body拉上去！否则页面会回到顶部！
    document.body.style.top = transformSize(scrollTop);
  } else {
    document.body.style.top = '';
    document.body.classList.remove('tfc-frozen');

    document.documentElement.scrollTop = scrollTop;
  }
}

/**
 * transformSize
 * @param {*} size
 * @returns
 */
export function transformSize(size) {
  if (isNumber(size)) {
    const s = toNumber(size);

    if (s >= -2000 && s <= 2000) {
      if (s === 0) {
        return '0';
      }

      if (s > 0) {
        let v = Math.round(s);

        v = v === 0 ? v + 1 : v;

        return `var(--tfc-${v})`;
      } else {
        let v = Math.round(Math.abs(s));

        v = v === 0 ? v + 1 : v;

        return `calc(var(--tfc-${v}) * -1)`;
      }
    }

    return `${s}px`;
  }

  return size;
}

export function handleInlayColor(color) {
  return checkInCollection(
    [
      'red',
      'orange',
      'yellow',
      'olive',
      'green',
      'cyan',
      'blue',
      'purple',
      'mauve',
      'pink',
      'brown',
      'grey',
      'gray',
      'black',
    ],
    color,
  )
    ? `var(--tfc-color-${color})`
    : color;
}

/**
 * 设置 Local Storage 处理器
 */
export function setLocalStorageHandler() {
  setLocalStorageGetter(getStorageSync);
  setLocalStorageSetter(setStorageSync);
  setLocalStorageRemover(removeStorageSync);
  setLocalStorageFlusher(clearStorageSync);
}
