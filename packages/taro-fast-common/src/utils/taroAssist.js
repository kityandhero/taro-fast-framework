import {
  createAnimation as createAnimationCore,
  createSelectorQuery as createSelectorQueryCore,
  downloadFile,
  getSetting as getSettingCore,
  getSystemInfoSync,
  hideNavigationBarLoading as hideNavigationBarLoadingCore,
  offLocationChange as offGeographicalLocationChangeCore,
  onLocationChange as onGeographicalLocationChangeCore,
  openDocument as openDocumentCore,
  reLaunch as reLaunchCore,
  setClipboardData,
  startLocationUpdate as startGeographicalLocationUpdateCore,
  stopLocationUpdate as stopGeographicalLocationUpdateCore,
} from '@tarojs/taro';

import {
  isFunction,
  logDebug,
  logException,
  logExecute,
} from 'easy-soft-utility';

import {
  checkWeAppEnvironment,
  checkWebEnvironment,
} from './environmentAssist';
import { transformSize } from './styleAssist';

let globalSystemInfo = null;

export function getSystemInfo() {
  if (globalSystemInfo == undefined) {
    globalSystemInfo = getSystemInfoSync();
  }

  return globalSystemInfo;
}

export function getSetting(parameters) {
  return getSettingCore(parameters);
}

export function reLaunch(parameters) {
  return reLaunchCore(parameters);
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

    if ((simulationData || null) == undefined) {
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

      onGeographicalLocationChange((response) => {
        try {
          if (isFunction(successCallback)) {
            successCallback(response);
          }
        } catch {
          if (isFunction(failCallback)) {
            failCallback(response);
          }
        } finally {
          offGeographicalLocationChange();

          stopGeographicalLocationUpdate({});
        }
      });
    },
    fail: (response) => {
      logDebug('startGeographicalLocationUpdate callback fail');

      try {
        if (isFunction(failCallback)) {
          failCallback(response);
        }
      } catch (error) {
        logException(error.message);
      } finally {
        stopGeographicalLocationUpdate({});
      }
    },
    complete: (response) => {
      if (isFunction(completeCallback)) {
        completeCallback(response);
      }
    },
  });
}

export function createAnimation(parameters) {
  return createAnimationCore(parameters);
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
    success: (response) => {
      if (response.statusCode === 200) {
        if (isFunction(successCallback)) {
          successCallback();
        }

        openDocument({
          filePath: response.tempFilePath,
          fileType: 'pdf',
          showMenu: true,
        });
      }
    },
  });
}

export function openDocument(parameters) {
  return openDocumentCore(parameters);
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
    }, 33.333_333_333_333_336);
  }

  return createSelectorQuery()
    .selectViewport()
    .boundingClientRect()
    .exec(() => {
      callback();
    });
}

export function hideNavigationBarLoading() {
  if (checkWeAppEnvironment()) {
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
    success: (response) => {
      if (isFunction(successCallback)) {
        successCallback(text, response);
      }
    },
  });
}

export function handleTouchScroll(flag) {
  if (checkWebEnvironment()) {
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
} from '@tarojs/taro';
