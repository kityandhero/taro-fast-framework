import {
  getJsonFromLocalStorage,
  logTrace,
  saveJsonToLocalStorage,
} from 'easy-soft-utility';

import { buildPromptModuleInfoText } from './definition';

/**
 * Module Name.
 */
const moduleName = 'remoteCheckAssist';

const storageKeyCollection = {
  remoteCheck: 'remoteCheck',
};

/**
 * 获取remoteCheck缓存
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getRemoteCheckCache() {
  logTrace({}, buildPromptModuleInfoText(moduleName, 'getRemoteCheckCache'));

  const key = storageKeyCollection.remoteCheck;

  const o = getJsonFromLocalStorage(key);

  if ((o || null) == null) {
    return null;
  }

  if ((o.dataVersion || null) === null) {
    return null;
  }

  const now = Number.parseInt(Date.now() / 1000 / 10, 10);

  if (o.dataVersion !== now) {
    return null;
  }

  const { data } = {
    data: null,
    ...o,
  };

  return data || null;
}

/**
 * 设置remoteCheck缓存,10秒钟过期
 *
 * @export
 * @param {o} metaData数据
 * @returns
 */
export function setRemoteCheckCache(o) {
  logTrace(
    arguments[0],
    buildPromptModuleInfoText(moduleName, 'setRemoteCheckCache'),
  );

  const key = storageKeyCollection.remoteCheck;

  const now = Number.parseInt(Date.now() / 1000 / 10, 10);

  const d = {
    data: o || null,
    dataVersion: now,
  };

  return saveJsonToLocalStorage(key, d);
}
