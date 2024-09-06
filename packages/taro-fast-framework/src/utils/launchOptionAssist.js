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
const moduleName = 'launchOptionAssist';

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
  logTrace({}, buildPromptModuleInfoText(moduleName, 'getLaunchOption'));

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
  logTrace(
    arguments[0],
    buildPromptModuleInfoText(moduleName, 'setLaunchOption'),
  );

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
  logTrace({}, buildPromptModuleInfoText(moduleName, 'removeLaunchOption'));

  const key = storageKeyCollection.launchOption;

  removeLocalStorage(key);
}
