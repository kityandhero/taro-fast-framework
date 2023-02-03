import {
  getJsonFromLocalStorage,
  removeLocalStorage,
  saveJsonToLocalStorage,
} from 'easy-soft-utility';

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
  const key = storageKeyCollection.currentUrl;

  removeLocalStorage(key);
}
