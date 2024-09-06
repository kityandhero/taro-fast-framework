import {
  getStringFromLocalStorage,
  logDebug,
  logTrace,
  removeLocalStorage,
  saveStringToLocalStorage,
} from 'easy-soft-utility';

import { buildPromptModuleInfoText } from './definition';

/**
 * Module Name.
 */
const moduleName = 'sessionRefreshingAssist';

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
  logTrace({}, buildPromptModuleInfoText(moduleName, 'getSessionRefreshing'));

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
  logTrace(
    { sessionRefreshing },
    buildPromptModuleInfoText(moduleName, 'setSessionRefreshing'),
  );

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
  logTrace(
    {},
    buildPromptModuleInfoText(moduleName, 'removeSessionRefreshing'),
  );

  const key = storageKeyCollection.sessionRefreshing;

  removeLocalStorage(key);
}
