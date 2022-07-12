import {
  getStringFromLocalStorage,
  removeLocalStorage,
  saveStringToLocalStorage,
} from './tools';

export const storageKeyCollection = {
  modelNameList: 'modelNameList',
};

/**
 * 获取 modelNameList
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getModelNameList() {
  const key = storageKeyCollection.modelNameList;

  return getStringFromLocalStorage(key);
}

/**
 * 设置 modelNameList
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setModelNameList(modelNameList) {
  const key = storageKeyCollection.modelNameList;

  return saveStringToLocalStorage(key, modelNameList || '');
}

/**
 * 移除 modelNameList
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeModelNameList() {
  const key = storageKeyCollection.modelNameList;

  removeLocalStorage(key);
}
