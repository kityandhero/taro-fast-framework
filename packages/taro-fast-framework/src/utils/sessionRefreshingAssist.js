import {
  getStringFromLocalStorage,
  logDebug,
  logInfo,
  removeLocalStorage,
  saveStringToLocalStorage,
} from 'easy-soft-utility';

const storageKeyCollection = {
  sessionRefreshing: 'sessionRefreshing',
};

/**
 * 获取SessionRefreshing
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getSessionRefreshing() {
  const key = storageKeyCollection.sessionRefreshing;

  const v = getStringFromLocalStorage(key);

  logDebug(`getSessionRefreshing: ${v === 'true'}`);

  return v === 'true';
}

/**
 * 设置SessionRefreshing
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setSessionRefreshing(sessionRefreshing) {
  logDebug(`setSessionRefreshing ${sessionRefreshing}`);

  const key = storageKeyCollection.sessionRefreshing;

  saveStringToLocalStorage(key, sessionRefreshing || false ? 'true' : 'false');
}

/**
 * 移除SessionRefreshing
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeSessionRefreshing() {
  logInfo('removeSessionRefreshing');

  const key = storageKeyCollection.sessionRefreshing;

  removeLocalStorage(key);
}
