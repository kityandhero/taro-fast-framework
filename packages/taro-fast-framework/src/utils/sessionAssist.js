import {
  getStringFromLocalStorage,
  logTrace,
  removeLocalStorage,
  saveStringToLocalStorage,
} from 'easy-soft-utility';

import { buildPromptModuleInfoText } from './definition';

/**
 * Module Name.
 */
const moduleName = 'sessionAssist';

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
  logTrace({}, buildPromptModuleInfoText(moduleName, 'getSession'));

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
  logTrace({ session }, buildPromptModuleInfoText(moduleName, 'setSession'));

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
  logTrace({}, buildPromptModuleInfoText(moduleName, 'removeSession'));

  const key = storageKeyCollection.session;

  removeLocalStorage(key);
}
