import {
  getJsonFromLocalStorage,
  logTrace,
  removeLocalStorage,
  saveJsonToLocalStorage,
} from 'easy-soft-utility';

import { buildPromptModuleInfoText } from './definition';

/**
 * Module Name.
 */
const moduleName = 'currentCustomerAssist';

const storageKeyCollection = {
  currentUrl: 'currentUrl',
};

/**
 * 获取CurrentUrl
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getCurrentUrl() {
  logTrace({}, buildPromptModuleInfoText(moduleName, 'getCurrentUrl'));

  const key = storageKeyCollection.currentUrl;

  return getJsonFromLocalStorage(key);
}

/**
 * 设置CurrentUrl
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setCurrentUrl(url) {
  logTrace({ url }, buildPromptModuleInfoText(moduleName, 'setCurrentUrl'));

  const key = storageKeyCollection.currentUrl;

  const isTab = (url || '').startsWith('/pages/');

  const data = {
    url: url || '',
    isTab,
  };

  return saveJsonToLocalStorage(key, data);
}

/**
 * 移除CurrentUrl
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeCurrentUrl() {
  logTrace({}, buildPromptModuleInfoText(moduleName, 'removeCurrentUrl'));

  const key = storageKeyCollection.currentUrl;

  removeLocalStorage(key);
}
