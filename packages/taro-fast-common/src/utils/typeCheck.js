import isEqualLodash from 'lodash/isEqual';
import isFunctionLodash from 'lodash/isFunction';
import isBooleanLodash from 'lodash/isBoolean';
import isUndefinedLodash from 'lodash/isUndefined';
import isNullLodash from 'lodash/isNull';
import isDateLodash from 'lodash/isDate';
import isStringLodash from 'lodash/isString';
import isObjectLodash from 'lodash/isObject';
import isNumberLodash from 'lodash/isNumber';

/**
 * 格式化时间
 *
 * @export
 * @param {*} v
 * @returns
 */
export function isInvalid(v) {
  return typeof v === 'undefined';
}

/**
 * 判断是否是时间字符串
 *
 * @export
 * @param {*} v
 * @returns
 */
export function isDatetime(v) {
  const date = `${typeof v === 'undefined' ? null : v}`;
  const result = date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);

  if (result == null) {
    return false;
  }

  const d = new Date(result[1], result[3] - 1, result[4]);
  return (
    d.getFullYear() === parseInt(result[1], 10) &&
    d.getMonth() + 1 === parseInt(result[3], 10) &&
    d.getDate() === parseInt(result[4], 10)
  );
}

/**
 * 判断是否是数字
 *
 * @export
 * @param {*} str
 * @returns
 */
export function isNumber(v) {
  return isNumberLodash(v);
}

/**
 * 判断是否是数字字符串
 *
 * @export
 * @param {*} str
 * @returns
 */
export function isMoney(v) {
  const str = `${typeof v === 'undefined' ? null : v}`;

  if (str === '') {
    return false;
  }

  const regular = /^([1-9][\d]{0,15}|0)(\.[\d]{1,2})?$/;
  const re = new RegExp(regular);
  return re.test(str);
}

/**
 * 获取本地数据
 * @export
 * @param {value} 对比源
 * @param {other} 对比对象
 * 执行深比较来确定两者的值是否相等.
 * 这个方法支持比较 arrays, array buffers, booleans, date objects, error objects, maps, numbers, Object objects, regexes, sets, strings, symbols, 以及 typed arrays. Object 对象值比较自身的属性, 不包括继承的和可枚举的属性.  不支持函数和DOM节点比较.
 */
export function isEqual(value, other) {
  return isEqualLodash(value, other);
}

export function isEqualBySerialize(value, other) {
  const d1 = JSON.stringify(value || {});
  const d2 = JSON.stringify(other || {});

  return d1 === d2;
}

export function isFunction(value) {
  return isFunctionLodash(value);
}

export function isBoolean(value) {
  return isBooleanLodash(value);
}

/**
 * check value is undefined
 */
export function isUndefined(value) {
  return isUndefinedLodash(value);
}

/**
 * check value is null
 */
export function isNull(value) {
  return isNullLodash(value);
}

/**
 * check value is date
 */
export function isDate(value) {
  return isDateLodash(value);
}

/**
 * check value is string
 */
export function isString(value) {
  return isStringLodash(value);
}

export function isArray(value) {
  return Array.isArray(value);
}

export function isObject(o) {
  return isObjectLodash(o);
}

export function isPlainObject(val) {
  return val !== null && typeof val === 'object' && !isArray(val);
}

export function isPromise(val) {
  return isPlainObject(val) && isFunction(val.then) && isFunction(val.catch);
}

export function isUrl(val) {
  const regular = /(http|https):\/\/([\w.]+\/?)\S*/;
  const re = new RegExp(regular);
  return re.test(val);
}

export function isImageBase4(val) {
  const regular = /(data):image\/([\w.]+\/?)\S*/;
  const re = new RegExp(regular);
  return re.test(val);
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
