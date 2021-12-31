import { toNumber as toNumber$1, toString as toString$1 } from 'lodash';
import { isMoney, isDate, isString } from './typeCheck.js';

/**
 * 转换为数字
 *
 * @export
 * @param {*} str
 * @returns
 */

function toNumber(v) {
  var value = toNumber$1(v);
  return Number.isNaN(value) ? 0 : value;
}
/**
 * 转换为数字
 *
 * @export
 * @param {*} str
 * @returns
 */

function toMoney(v) {
  if (isMoney(v)) {
    return parseFloat(v, 10);
  }

  return 0;
}
function toPercentage(val) {
  return "".concat(toMoney(toNumber(val) * 1000 / 10), "%");
}
function toString(value) {
  return toString$1(value);
}
function toDatetime(v) {
  if ((v || null) == null) {
    return null;
  }

  if (isDate(v)) {
    return v;
  }

  if (isString(v)) {
    var i = v.indexOf("T");

    if (i < 0) {
      // eslint-disable-next-line no-useless-escape
      var value = v.replace(/\-/g, "/");
      var result = new Date(value);
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

function emptyExport() {
  return {};
}

export { emptyExport, toDatetime, toMoney, toNumber, toPercentage, toString };
