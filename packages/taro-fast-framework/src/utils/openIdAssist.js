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
const moduleName = 'openIdAssist';

const storageKeyCollection = {
  openId: 'openId',
};

/**
 * 获取OpenId
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getOpenId() {
  logTrace({}, buildPromptModuleInfoText(moduleName, 'getOpenId'));

  const key = storageKeyCollection.openId;

  return getStringFromLocalStorage(key);
}

/**
 * 设置OpenId
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setOpenId(openId) {
  logTrace({ openId }, buildPromptModuleInfoText(moduleName, 'setOpenId'));

  const key = storageKeyCollection.openId;

  return saveStringToLocalStorage(key, openId || '');
}

/**
 * 移除OpenId
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeOpenId() {
  logTrace({}, buildPromptModuleInfoText(moduleName, 'removeOpenId'));

  const key = storageKeyCollection.openId;

  removeLocalStorage(key);
}
