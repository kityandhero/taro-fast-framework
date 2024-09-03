import {
  getJsonFromLocalStorage,
  getToken,
  removeLocalStorage,
  saveJsonToLocalStorage,
} from 'easy-soft-utility';

const storageKeyCollection = {
  metaData: 'metaData',
  currentOperator: 'currentOperator',
};

/**
 * 获取metaData缓存
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getMetaDataCache() {
  const key = storageKeyCollection.metaData;

  const d = getJsonFromLocalStorage(key);

  if ((d || null) == null) {
    return null;
  }

  if ((d.dataVersion || '') === '') {
    return null;
  }

  const now = Number.parseInt(Date.now() / 1000 / 60 / 5, 10);

  if (d.dataVersion < now) {
    return null;
  }

  return d.metaData || null;
}

/**
 * 设置metaData缓存
 *
 * @export
 * @param {o} metaData数据
 * @returns
 */
export function setMetaDataCache(o) {
  const key = storageKeyCollection.metaData;

  const now = Number.parseInt(Date.now() / 1000 / 60 / 30, 10);

  const d = {
    metaData: o || null,
    dataVersion: now,
  };

  return saveJsonToLocalStorage(key, d);
}

/**
 * 移除信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeMetaDataCache() {
  const key = storageKeyCollection.metaData;

  removeLocalStorage(key);
}

/**
 * 获取缓存
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getCurrentOperatorCache() {
  const key = storageKeyCollection.currentOperator;

  const d = getJsonFromLocalStorage(key);

  if ((d || null) == null) {
    return null;
  }

  if (d.flag === '' || d.flag !== getToken()) {
    return null;
  }

  return d.data || null;
}

/**
 * 设置metaData缓存
 *
 * @export
 * @param {o} metaData数据
 * @returns
 */
export function setCurrentOperatorCache(o) {
  const key = storageKeyCollection.currentOperator;

  const d = {
    data: o || null,
    flag: getToken() || '',
  };

  return saveJsonToLocalStorage(key, d);
}

/**
 * 移除经纬度信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeCurrentOperatorCache() {
  const key = storageKeyCollection.currentOperator;
  removeLocalStorage(key);
}
