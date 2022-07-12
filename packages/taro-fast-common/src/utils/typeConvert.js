import toLowerLodash from 'lodash/toLower';
import toNumberLodash from 'lodash/toNumber';
import toStringLodash from 'lodash/toString';
import toUpperLodash from 'lodash/toUpper';

import { isDate, isMoney, isString } from './typeCheck';

/**
 * 转换为数字
 *
 * @export
 * @param {*} str
 * @returns
 */
export function toNumber(v) {
  const value = toNumberLodash(v);

  return Number.isNaN(value) ? 0 : value;
}

/**
 * 转换为数字
 *
 * @export
 * @param {*} str
 * @returns
 */
export function toMoney(v) {
  if (isMoney(v)) {
    return parseFloat(v, 10);
  }

  return 0;
}

export function toPercentage(val) {
  return `${toMoney((toNumber(val) * 1000) / 10)}%`;
}

export function toString(value) {
  return toStringLodash(value);
}

export function toUpper(value) {
  return toUpperLodash(value);
}

export function toLower(value) {
  return toLowerLodash(value);
}

export function toDatetime(v) {
  if ((v || null) == null) {
    return null;
  }

  if (isDate(v)) {
    return v;
  }

  if (isString(v)) {
    const i = v.indexOf('T');

    if (i < 0) {
      // eslint-disable-next-line no-useless-escape
      const value = v.replace(/\-/g, '/');
      const result = new Date(value);

      return result;
    }
  }

  return new Date(v);
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function emptyExport() {
  return {};
}
