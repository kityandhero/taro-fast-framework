import {
  getJsonFromLocalStorage,
  logTrace,
  logWarn,
  removeLocalStorage,
  saveJsonToLocalStorage,
} from 'easy-soft-utility';

import { buildPromptModuleInfoText } from './definition';

/**
 * Module Name.
 */
const moduleName = 'currentCustomerAssist';

export const storageKeyCollection = {
  currentCustomer: 'currentCustomer',
};

/**
 * 获取当前登陆人信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getCurrentCustomer() {
  logTrace({}, buildPromptModuleInfoText(moduleName, 'getCurrentCustomer'));

  const key = storageKeyCollection.currentCustomer;

  const o = getJsonFromLocalStorage(key);

  if ((o || null) == null) {
    return null;
  }

  const { dataVersion } = o;

  if ((dataVersion || null) == null) {
    return null;
  }

  // 信息有效期30分钟
  const now = Number.parseInt(Date.now() / 1000 / 60 / 30, 10);

  if (dataVersion !== now) {
    logWarn('info current customer cache expired, will return null');

    return null;
  }

  const { data } = {
    data: null,
    ...o,
  };

  return data || null;
}

/**
 * 设置当前登陆人信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setCurrentCustomer(data) {
  logTrace(
    arguments[0],
    buildPromptModuleInfoText(moduleName, 'setCurrentCustomer'),
  );

  const key = storageKeyCollection.currentCustomer;

  // 信息有效期30分钟
  const nowVersion = Number.parseInt(Date.now() / 1000 / 60 / 30, 10);

  const o = {
    data,
    dataVersion: nowVersion,
  };

  return saveJsonToLocalStorage(key, o);
}

/**
 * 移除当前登陆人信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeCurrentCustomer() {
  logTrace({}, buildPromptModuleInfoText(moduleName, 'removeCurrentCustomer'));

  const key = storageKeyCollection.currentCustomer;

  removeLocalStorage(key);
}
