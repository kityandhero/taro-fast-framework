import {
  getStringFromLocalStorage,
  removeLocalStorage,
  saveStringToLocalStorage,
  toNumber,
} from 'easy-soft-utility';

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
  const key = storageKeyCollection.nextCheckLoginUnixTime;

  removeLocalStorage(key);
}
