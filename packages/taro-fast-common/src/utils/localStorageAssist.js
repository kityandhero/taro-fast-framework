import {
  clearStorageSync,
  getStorageSync,
  removeStorageSync,
  setStorageSync,
} from '@tarojs/taro';

import {
  buildPromptModuleInfo,
  logDevelop,
  mergeTextMessage,
  setLocalStorageFlusher,
  setLocalStorageGetter,
  setLocalStorageRemover,
  setLocalStorageSetter,
} from 'easy-soft-utility';

import { modulePackageName } from './definition';

/**
 * Module Name.
 */
const moduleName = 'localStorageAssist';

function buildPromptModuleInfoText(text, ancillaryInformation = '') {
  return buildPromptModuleInfo(
    modulePackageName,
    mergeTextMessage(text, ancillaryInformation),
    moduleName,
  );
}

/**
 * 设置 Local Storage 处理器
 */
export function setLocalStorageHandler() {
  logDevelop(
    {},
    buildPromptModuleInfoText(
      'setLocalStorageHandler',
      'fill implementation with easy-soft-utility',
    ),
  );

  setLocalStorageGetter(getStorageSync);
  setLocalStorageSetter(setStorageSync);
  setLocalStorageRemover(removeStorageSync);
  setLocalStorageFlusher(clearStorageSync);
}
