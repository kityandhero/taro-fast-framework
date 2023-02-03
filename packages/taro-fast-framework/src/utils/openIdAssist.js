import {
  getStringFromLocalStorage,
  removeLocalStorage,
  saveStringToLocalStorage,
} from 'easy-soft-utility';

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
  const key = storageKeyCollection.openId;

  removeLocalStorage(key);
}
