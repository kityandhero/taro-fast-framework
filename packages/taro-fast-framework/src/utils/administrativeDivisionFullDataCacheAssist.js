import {
  getJsonFromLocalStorage,
  isArray,
  logTrace,
  removeLocalStorage,
  saveJsonToLocalStorage,
  toMd5,
} from 'easy-soft-utility';

import { buildPromptModuleInfoText } from './definition';

/**
 * Module Name.
 * @private
 */
const moduleName = 'administrativeDivisionFullDataCacheAssist';

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
  logTrace(
    {},
    buildPromptModuleInfoText(
      moduleName,
      'getAdministrativeDivisionFullDataCache',
    ),
  );

  const key = storageKeyCollection.administrativeDivisionFullData;

  const { list, flag } = {
    list: [],
    flag: 'md5',
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
  logTrace(
    arguments[0],
    buildPromptModuleInfoText(
      moduleName,
      'setAdministrativeDivisionFullDataCache',
    ),
  );

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
  logTrace(
    {},
    buildPromptModuleInfoText(
      moduleName,
      'removeAdministrativeDivisionFullDataCache',
    ),
  );

  const key = storageKeyCollection.administrativeDivisionFullData;

  removeLocalStorage(key);
}
