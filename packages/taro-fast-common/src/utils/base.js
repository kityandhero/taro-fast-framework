import replaceLodash from 'lodash/replace';
import trimLodash from 'lodash/trim';

import { isArray } from './typeCheck';

/**
 * 检测目标是否在数组之中
 */
export function inCollection(collection, value) {
  let result = false;

  if (!isArray(collection)) {
    return result;
  }

  collection.some((o) => {
    if (o === value) {
      result = true;

      return true;
    }

    return false;
  });

  return result;
}

export function stringIsNullOrWhiteSpace(value) {
  return trim(replace(value || '', ' ', '')) === '';
}

export function trim(source) {
  return trimLodash(source);
}

export function replace(source, pattern, replacement) {
  return replaceLodash(source, pattern, replacement);
}
