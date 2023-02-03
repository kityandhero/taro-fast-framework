import {
  getStringFromLocalStorage,
  saveStringToLocalStorage,
} from 'easy-soft-utility';

const storageKeyCollection = {
  needSyncInfo: 'needSyncInfo',
};

/**
 * 获取是否需要同步用户信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getNeedSyncInfo() {
  const key = storageKeyCollection.needSyncInfo;

  const need = (getStringFromLocalStorage(key) || '') === '0';

  return need;
}

/**
 * 设置是否需要同步用户信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setNeedSyncInfo(need) {
  const key = storageKeyCollection.needSyncInfo;

  saveStringToLocalStorage(key, `${(need || false) == false ? 0 : 1}`);
}
