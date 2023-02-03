import {
  getJsonFromLocalStorage,
  logExecute,
  removeLocalStorage,
  saveJsonToLocalStorage,
} from 'easy-soft-utility';

const storageKeyCollection = {
  launchOption: 'launchOption',
};

/**
 * 获取 launch option
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getLaunchOption() {
  logExecute('getLaunchOption from local cache');

  const key = storageKeyCollection.launchOption;

  return getJsonFromLocalStorage(key) || null;
}

/**
 * 设置 launch option
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setLaunchOption(data) {
  logExecute('setLaunchOption to local cache');

  const key = storageKeyCollection.launchOption;

  return saveJsonToLocalStorage(key, data || '');
}

/**
 * 移除 launch option
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeLaunchOption() {
  logExecute('removeLaunchOption');

  const key = storageKeyCollection.launchOption;

  removeLocalStorage(key);
}
