import {
  getJsonFromLocalStorage,
  logExecute,
  removeLocalStorage,
  saveJsonToLocalStorage,
} from 'easy-soft-utility';

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
  logExecute('getSelectedAddressData from local cache');

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
  logExecute('setSelectedAddressData to local cache');

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
  logExecute('removeSelectedAddressData');

  const key = storageKeyCollection.selectedAddressData;

  removeLocalStorage(key);
}
