import {
  getJsonFromLocalStorage,
  logTrace,
  removeLocalStorage,
  saveJsonToLocalStorage,
} from 'easy-soft-utility';

import { buildPromptModuleInfoText } from './definition';

/**
 * Module Name.
 * @private
 */
const moduleName = 'routeAssist';

const storageKeyCollection = {
  selectedAddressData: 'selectedAddressData',
};

/**
 * 获取已选择的地址
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getSelectedAddressData() {
  logTrace({}, buildPromptModuleInfoText(moduleName, 'getSelectedAddressData'));

  const key = storageKeyCollection.selectedAddressData;

  return getJsonFromLocalStorage(key) || null;
}

/**
 * 设置已选择的地址
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setSelectedAddressData(data) {
  logTrace(
    arguments[0],
    buildPromptModuleInfoText(moduleName, 'setSelectedAddressData'),
  );

  const key = storageKeyCollection.selectedAddressData;

  return saveJsonToLocalStorage(key, data || '');
}

/**
 * 移除已选择的地址
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeSelectedAddressData() {
  logTrace(
    {},
    buildPromptModuleInfoText(moduleName, 'removeSelectedAddressData'),
  );

  const key = storageKeyCollection.selectedAddressData;

  removeLocalStorage(key);
}
