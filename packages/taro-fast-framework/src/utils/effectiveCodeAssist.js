import {
  getStringFromLocalStorage,
  removeLocalStorage,
  saveStringToLocalStorage,
} from 'easy-soft-utility';

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
  const key = storageKeyCollection.effectiveCode;

  removeLocalStorage(key);
}
