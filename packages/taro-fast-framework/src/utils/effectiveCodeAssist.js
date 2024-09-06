import {
  getStringFromLocalStorage,
  logTrace,
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
  logTrace({}, buildPromptModuleInfoText(moduleName, 'getEffectiveCode'));

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
  logTrace(
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
  logTrace({}, buildPromptModuleInfoText(moduleName, 'removeEffectiveCode'));

  const key = storageKeyCollection.effectiveCode;

  removeLocalStorage(key);
}
