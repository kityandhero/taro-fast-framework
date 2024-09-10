import {
  clearStorageSync,
  getStorageSync,
  removeStorageSync,
  setStorageSync,
} from '@tarojs/taro';

import {
  logDevelop,
  setLocalStorageFlusher,
  setLocalStorageGetter,
  setLocalStorageRemover,
  setLocalStorageSetter,
} from 'easy-soft-utility';

import { buildPromptModuleInfoText } from './definition';

/**
 * Module Name.
 */
const moduleName = 'localStorageAssist';

/**
 * 设置 Local Storage 处理器
 */
export function setLocalStorageHandler() {
  logDevelop(
    {},
    buildPromptModuleInfoText(
      moduleName,
      'setLocalStorageHandler',
      'fill implementation with easy-soft-utility',
    ),
  );

  setLocalStorageGetter(getStorageSync);
  setLocalStorageSetter(setStorageSync);
  setLocalStorageRemover(removeStorageSync);
  setLocalStorageFlusher(clearStorageSync);
}
