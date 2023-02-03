import {
  getJsonFromLocalStorage,
  isArray,
  logExecute,
  removeLocalStorage,
  saveJsonToLocalStorage,
  toMd5,
} from 'easy-soft-utility';

const storageKeyCollection = {
  administrativeDivisionFullData: 'administrativeDivisionFullData',
};

/**
 * 获取地区数据资源缓存
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getAdministrativeDivisionFullDataCache() {
  logExecute('getAdministrativeDivisionFullData from local cache');

  const key = storageKeyCollection.administrativeDivisionFullData;

  const { list, flag } = {
    ...{
      list: [],
      flag: 'md5',
    },
    ...getJsonFromLocalStorage(key),
  };

  return { list: list || [], flag: flag || 'md5' };
}

/**
 * 设置地区数据资源缓存
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setAdministrativeDivisionFullDataCache(data) {
  logExecute('setAdministrativeDivisionFullData to local cache');

  const key = storageKeyCollection.administrativeDivisionFullData;

  const l = isArray(data) ? data : [];

  const v = {
    list: l,
    flag: toMd5(l || []),
  };

  return saveJsonToLocalStorage(key, v);
}

/**
 * 移除地区数据资源缓存
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeAdministrativeDivisionFullDataCache() {
  logExecute('removeAdministrativeDivisionFullData');

  const key = storageKeyCollection.administrativeDivisionFullData;

  removeLocalStorage(key);
}
