import {
  clearStorageSync,
  getStorageSync,
  removeStorageSync,
  setStorageSync,
} from '@tarojs/taro';

import {
  setLocalStorageFlusher,
  setLocalStorageGetter,
  setLocalStorageRemover,
  setLocalStorageSetter,
} from 'easy-soft-utility';

/**
 * 设置 Local Storage 处理器
 */
export function setLocalStorageHandler() {
  setLocalStorageGetter(getStorageSync);
  setLocalStorageSetter(setStorageSync);
  setLocalStorageRemover(removeStorageSync);
  setLocalStorageFlusher(clearStorageSync);
}
