import {
  canIUse,
  createAnimation as createAnimationCore,
  createSelectorQuery as createSelectorQueryCore,
  downloadFile,
  getClipboardData,
  getCurrentInstance,
  getMenuButtonBoundingClientRect,
  getSetting as getSettingCore,
  getSystemInfoSync,
  getUpdateManager,
  hideNavigationBarLoading as hideNavigationBarLoadingCore,
  makePhoneCall,
  navigateBack,
  offLocationChange as offGeographicalLocationChangeCore,
  onLocationChange as onGeographicalLocationChangeCore,
  openDocument as openDocumentCore,
  pageScrollTo,
  previewImage,
  reLaunch as reLaunchCore,
  requestPayment,
  setClipboardData,
  showNavigationBarLoading,
  startLocationUpdate as startGeographicalLocationUpdateCore,
  stopLocationUpdate as stopGeographicalLocationUpdateCore,
  stopPullDownRefresh,
  switchTab,
  uploadFile,
} from '@tarojs/taro';

import {
  isFunction,
  logDebug,
  logException,
  logExecute,
} from 'easy-soft-utility';

import { checkWeAppEnv, checkWebEnv } from './envAssist';
import { transformSize } from './styleAssist';

let globalSystemInfo = null;

export {
  canIUse,
  downloadFile,
  getClipboardData,
  getCurrentInstance,
  getMenuButtonBoundingClientRect,
  getUpdateManager,
  makePhoneCall,
  navigateBack,
  pageScrollTo,
  previewImage,
  requestPayment,
  setClipboardData,
  showNavigationBarLoading,
  stopPullDownRefresh,
  switchTab,
  uploadFile,
};

export function getSystemInfo() {
  if (globalSystemInfo == null) {
    globalSystemInfo = getSystemInfoSync();
  }

  return globalSystemInfo;
}

export function getSetting(params) {
  return getSettingCore(params);
}

export function reLaunch(params) {
  return reLaunchCore(params);
}

export function createSelectorQuery() {
  return createSelectorQueryCore();
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

export function hideNavigationBarLoading() {
  if (checkWeAppEnv()) {
    hideNavigationBarLoadingCore();
  }
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

export function handleTouchScroll(flag) {
  if (checkWebEnv()) {
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
