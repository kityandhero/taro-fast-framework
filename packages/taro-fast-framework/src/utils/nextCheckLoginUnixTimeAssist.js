import {
  getStringFromLocalStorage,
  logTrace,
  removeLocalStorage,
  saveStringToLocalStorage,
  toNumber,
} from 'easy-soft-utility';

import { buildPromptModuleInfoText } from './definition';

/**
 * Module Name.
 */
const moduleName = 'nextCheckLoginUnixTimeAssist';

const storageKeyCollection = {
  nextCheckLoginUnixTime: 'nextCheckLoginUnixTime',
};

/**
 * 获取nextCheckLoginUnixTime
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getNextCheckLoginUnixTime() {
  logTrace(
    {},
    buildPromptModuleInfoText(moduleName, 'getNextCheckLoginUnixTime'),
  );

  const key = storageKeyCollection.nextCheckLoginUnixTime;

  return toNumber(getStringFromLocalStorage(key));
}

/**
 * 设置NextCheckLoginUnixTime
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setNextCheckLoginUnixTime(nextCheckLoginUnixTime) {
  logTrace(
    { nextCheckLoginUnixTime },
    buildPromptModuleInfoText(moduleName, 'setNextCheckLoginUnixTime'),
  );

  const key = storageKeyCollection.nextCheckLoginUnixTime;

  saveStringToLocalStorage(key, nextCheckLoginUnixTime || '');
}

/**
 * 移除NextCheckLoginUnixTime
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeNextCheckLoginUnixTime() {
  logTrace(
    {},
    buildPromptModuleInfoText(moduleName, 'removeNextCheckLoginUnixTime'),
  );

  const key = storageKeyCollection.nextCheckLoginUnixTime;

  removeLocalStorage(key);
}
