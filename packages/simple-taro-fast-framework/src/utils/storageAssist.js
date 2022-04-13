import {
  removeLocalStorage,
  getJsonFromLocalStorage,
  saveJsonToLocalStorage,
  getStringFromLocalStorage,
  saveStringToLocalStorage,
} from 'taro-fast-common/es/utils/tools';
import { whetherString } from 'taro-fast-common/es/utils/constants';

const storageKeyCollection = {
  metaData: 'metaData',
  simulationMode: true,
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

  const now = parseInt(new Date().getTime() / 1000 / 60 / 5, 10);

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

  const now = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);

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

export function getSimulationMode() {
  const key = storageKeyCollection.simulationMode;

  const d = getStringFromLocalStorage(key);

  if ((d || null) == null) {
    return false;
  }

  return d === whetherString.yes;
}

export function setSimulationMode(o) {
  const key = storageKeyCollection.simulationMode;

  return saveStringToLocalStorage(
    key,
    !!o ? whetherString.yes : whetherString.no,
  );
}

export function removeSimulationMode() {
  const key = storageKeyCollection.simulationMode;

  removeLocalStorage(key);
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
