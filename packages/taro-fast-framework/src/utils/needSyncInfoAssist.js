import {
  getStringFromLocalStorage,
  logTrace,
  saveStringToLocalStorage,
} from 'easy-soft-utility';

import { buildPromptModuleInfoText } from './definition';

/**
 * Module Name.
 */
const moduleName = 'needSyncInfoAssist';

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
  logTrace({}, buildPromptModuleInfoText(moduleName, 'getNeedSyncInfo'));

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
  logTrace({ need }, buildPromptModuleInfoText(moduleName, 'setNeedSyncInfo'));

  const key = storageKeyCollection.needSyncInfo;

  saveStringToLocalStorage(key, `${(need || false) == false ? 0 : 1}`);
}
