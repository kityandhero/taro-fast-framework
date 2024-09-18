import {
  getStringFromLocalStorage,
  logExecute,
  removeLocalStorage,
  saveStringToLocalStorage,
} from 'easy-soft-utility';

import { buildPromptModuleInfoText } from './definition';

/**
 * Module Name.
 */
const moduleName = 'effectiveCodeAssist';

const storageKeyCollection = {
  effectiveCode: 'effectiveCode',
};

/**
 * 获取EffectiveCode
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getEffectiveCode() {
  logExecute({}, buildPromptModuleInfoText(moduleName, 'getEffectiveCode'));

  const key = storageKeyCollection.effectiveCode;

  return getStringFromLocalStorage(key);
}

/**
 * 设置EffectiveCode
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setEffectiveCode(effectiveCode) {
  logExecute(
    { effectiveCode },
    buildPromptModuleInfoText(moduleName, 'setEffectiveCode'),
  );

  const key = storageKeyCollection.effectiveCode;

  saveStringToLocalStorage(key, effectiveCode || '');
}

/**
 * 移除EffectiveCode
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeEffectiveCode() {
  logExecute({}, buildPromptModuleInfoText(moduleName, 'removeEffectiveCode'));

  const key = storageKeyCollection.effectiveCode;

  removeLocalStorage(key);
}
