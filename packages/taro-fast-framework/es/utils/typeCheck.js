import { isEqual as isEqual$1, isFunction as isFunction$1, isBoolean as isBoolean$1, isUndefined as isUndefined$1, isNull as isNull$1, isDate as isDate$1, isString as isString$1, isArray as isArray$1, isObject as isObject$1 } from 'lodash';

/**
 * 格式化时间
 *
 * @export
 * @param {*} v
 * @returns
 */

function isInvalid(v) {
  return typeof v === "undefined";
}
/**
 * 判断是否是时间字符串
 *
 * @export
 * @param {*} v
 * @returns
 */

function isDatetime(v) {
  var date = "".concat(typeof v === "undefined" ? null : v);
  var result = date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);

  if (result == null) {
    return false;
  }

  var d = new Date(result[1], result[3] - 1, result[4]);
  return d.getFullYear() === parseInt(result[1], 10) && d.getMonth() + 1 === parseInt(result[3], 10) && d.getDate() === parseInt(result[4], 10);
}
/**
 * 判断是否是数字字符串
 *
 * @export
 * @param {*} str
 * @returns
 */

function isNumber(v) {
  var str = "".concat(typeof v === "undefined" ? null : v);

  if (str === "") {
    return false;
  }

  var regular = /^[0-9]*$/;
  var re = new RegExp(regular);
  return re.test(str);
}
/**
 * 判断是否是数字字符串
 *
 * @export
 * @param {*} str
 * @returns
 */

function isMoney(v) {
  var str = "".concat(typeof v === "undefined" ? null : v);

  if (str === "") {
    return false;
  }

  var regular = /^([1-9][\d]{0,15}|0)(\.[\d]{1,2})?$/;
  var re = new RegExp(regular);
  return re.test(str);
}
/**
 * 获取本地数据
 * @export
 * @param {value} 对比源
 * @param {other} 对比对象
 * 执行深比较来确定两者的值是否相等。
 * 这个方法支持比较 arrays, array buffers, booleans, date objects, error objects, maps, numbers, Object objects, regexes, sets, strings, symbols, 以及 typed arrays. Object 对象值比较自身的属性，不包括继承的和可枚举的属性。 不支持函数和DOM节点比较。
 */

function isEqual(value, other) {
  return isEqual$1(value, other);
}
function isEqualBySerialize(value, other) {
  var d1 = JSON.stringify(value || {});
  var d2 = JSON.stringify(other || {});
  return d1 === d2;
}
function isFunction(value) {
  return isFunction$1(value);
}
function isBoolean(value) {
  return isBoolean$1(value);
}
/**
 * check value is undefined
 */

function isUndefined(value) {
  return isUndefined$1(value);
}
/**
 * check value is null
 */

function isNull(value) {
  return isNull$1(value);
}
/**
 * check value is date
 */

function isDate(value) {
  return isDate$1(value);
}
/**
 * check value is string
 */

function isString(value) {
  return isString$1(value);
}
function isArray(value) {
  return isArray$1(value);
}
function isObject(o) {
  return isObject$1(o);
}
/**
 * 占位函数
 *
 * @export
 * @returns
 */

function emptyExport() {
  return {};
}

export { emptyExport, isArray, isBoolean, isDate, isDatetime, isEqual, isEqualBySerialize, isFunction, isInvalid, isMoney, isNull, isNumber, isObject, isString, isUndefined };
