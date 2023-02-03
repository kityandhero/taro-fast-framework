import {
  getStringFromLocalStorage,
  logDebug,
  logExecute,
  logInfo,
  removeLocalStorage,
  saveStringToLocalStorage,
} from 'easy-soft-utility';

const storageKeyCollection = {
  session: 'session',
};

/**
 * 获取Session
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getSession() {
  logExecute('getSession');

  const key = storageKeyCollection.session;

  return getStringFromLocalStorage(key);
}

/**
 * 设置Session
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setSession(session) {
  logDebug(`setSession ${session}`);

  const key = storageKeyCollection.session;

  saveStringToLocalStorage(key, session || '');
}

/**
 * 移除Session
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeSession() {
  logInfo('removeSession');

  const key = storageKeyCollection.session;

  removeLocalStorage(key);
}
