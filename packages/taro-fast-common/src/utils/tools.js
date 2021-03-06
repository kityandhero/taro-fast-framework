import classNames from 'classnames';
import dayjs from 'dayjs';
import assignLodash from 'lodash/assign';
import assignWithLodash from 'lodash/assignWith';
import differenceLodash from 'lodash/difference';
import dropRightLodash from 'lodash/dropRight';
import endsWithLodash from 'lodash/endsWith';
import filterLodash from 'lodash/filter';
import findLodash from 'lodash/find';
import findIndexLodash from 'lodash/findIndex';
import firstLodash from 'lodash/first';
import floorLodash from 'lodash/floor';
import forEachLodash from 'lodash/forEach';
import getLodash from 'lodash/get';
import gteLodash from 'lodash/gte';
import mapLodash from 'lodash/map';
import memoizeLodash from 'lodash/memoize';
import removeLodash from 'lodash/remove';
import reverseLodash from 'lodash/reverse';
import roundLodash from 'lodash/round';
import setLodash from 'lodash/set';
import sizeLodash from 'lodash/size';
import sortByLodash from 'lodash/sortBy';
import sortedUniqLodash from 'lodash/sortedUniq';
import splitLodash from 'lodash/split';
import startsWithLodash from 'lodash/startsWith';
import uniqByLodash from 'lodash/uniqBy';
import hash from 'object-hash';
import { parse, stringify } from 'qs';
import React from 'react';
import {
  canIUse as canIUseCore,
  clearStorage,
  createAnimation as createAnimationCore,
  createSelectorQuery as createSelectorQueryCore,
  downloadFile as downloadFileCore,
  ENV_TYPE,
  getClipboardData as getClipboardDataCore,
  getCurrentInstance as getCurrentInstanceCore,
  getEnv,
  getMenuButtonBoundingClientRect as getMenuButtonBoundingClientRectCore,
  getSetting as getSettingCore,
  getStorageSync,
  getSystemInfoSync,
  getUpdateManager as getUpdateManagerCore,
  hideNavigationBarLoading as hideNavigationBarLoadingCore,
  makePhoneCall as makePhoneCallCore,
  navigateBack as navigateBackCore,
  navigateTo as navigateToCore,
  offLocationChange as offGeographicalLocationChangeCore,
  onLocationChange as onGeographicalLocationChangeCore,
  openDocument as openDocumentCore,
  pageScrollTo as pageScrollToCore,
  previewImage as previewImageCore,
  redirectTo as redirectToCore,
  reLaunch as reLaunchCore,
  removeStorageSync,
  requestPayment as requestPaymentCore,
  setClipboardData as setClipboardDataCore,
  setStorageSync,
  showNavigationBarLoading as showNavigationBarLoadingCore,
  startLocationUpdate as startGeographicalLocationUpdateCore,
  stopLocationUpdate as stopGeographicalLocationUpdateCore,
  stopPullDownRefresh as stopPullDownRefreshCore,
  switchTab as switchTabCore,
  uploadFile as uploadFileCore,
} from '@tarojs/taro';

import {
  inCollection as inCollectionCore,
  replace as replaceCore,
  stringIsNullOrWhiteSpace as stringIsNullOrWhiteSpaceCore,
  trim as trimCore,
} from './base';
import {
  convertCollection,
  datetimeFormat,
  formatCollection,
  logLevel,
  messageTypeCollection,
  notificationTypeCollection,
  pxToRemRoot,
  sortOperate,
} from './constants';
import {
  getAppInitConfigData as getAppInitConfigDataCore,
  getDefaultTaroGlobalData as getDefaultTaroGlobalDataCore,
  getTaroGlobalData as getTaroGlobalDataCore,
  setTaroGlobalData as setTaroGlobalDataCore,
} from './core';
import {
  recordConfig as recordConfigCore,
  recordDebug as recordDebugCore,
  recordError as recordErrorCore,
  recordExecute as recordExecuteCore,
  recordInfo as recordInfoCore,
  recordLog as recordLogCore,
  recordObject as recordObjectCore,
  recordText as recordTextCore,
  recordWarn as recordWarnCore,
} from './log';
import Tips from './tips';
import {
  isArray,
  isEqualBySerialize,
  isFunction,
  isNull,
  isNumber,
  isObject,
  isPromise,
  isString,
  isUndefined,
} from './typeCheck';
import { toDatetime, toMoney, toNumber } from './typeConvert';

export const isBrowser = typeof document !== 'undefined' && !!document.scripts;
export const isWechat = process.env.TARO_ENV === 'weapp';
export const isSwan = process.env.TARO_ENV === 'swan';
export const isAlipay = process.env.TARO_ENV === 'alipay';
export const isQQ = process.env.TARO_ENV === 'qq';
export const isToutiao = process.env.TARO_ENV === 'tt';

const storageKeyCollection = {
  nearestLocalhostNotify: 'nearestLocalhostNotify',
};

let globalSystemInfo = null;

export function getDefaultTaroGlobalData() {
  return getDefaultTaroGlobalDataCore();
}

export function getTaroGlobalData() {
  return getTaroGlobalDataCore();
}

export function setTaroGlobalData(config) {
  return setTaroGlobalDataCore(config);
}

export function getAppInitConfigData() {
  return getAppInitConfigDataCore();
}

export function showNavigationBarLoading() {
  showNavigationBarLoadingCore();
}

export function hideNavigationBarLoading() {
  if (isWechat) {
    hideNavigationBarLoadingCore();
  }
}

/**
 * get current page instance
 */
export function getCurrentInstance() {
  return getCurrentInstanceCore();
}

export function canIUse(params) {
  return canIUseCore(params);
}

export function getUpdateManager(params) {
  return getUpdateManagerCore(params);
}

export function previewImage(params) {
  return previewImageCore(params);
}

export function stopPullDownRefresh() {
  stopPullDownRefreshCore();
}

export function pageScrollTo(params) {
  pageScrollToCore(params);
}

export function getMenuButtonBoundingClientRect() {
  return getMenuButtonBoundingClientRectCore();
}

export function redirectTo(params) {
  if (isString(params)) {
    redirectToCore({
      url: params,
    });

    return;
  }

  if (isObject(params)) {
    redirectToCore(params);

    return;
  }

  const text = '?????????????????????';

  showErrorMessage({
    message: text,
  });
}

export function navigateTo(params) {
  if (isString(params)) {
    navigateToCore({
      url: params,
    });

    return;
  }

  if (isObject(params)) {
    navigateToCore(params);

    return;
  }

  const text = '?????????????????????';

  showErrorMessage({
    message: text,
  });
}

export function getValue(obj) {
  return Object.keys(obj)
    .map((key) => obj[key])
    .join(',');
}

/**
 * ??????????????????
 * @param {*} text
 * @param {*} showText
 */
export function copyToClipboard({ text, successCallback = null }) {
  setClipboardData({
    data: text,
    success: (res) => {
      if (isFunction(successCallback)) {
        successCallback(text, res);
      }
    },
  });
}

/**
 *?????????????????????
 *
 * @export
 * @param {*} text
 * @param {*} replaceText
 * @param {*} beforeKeepNumber
 * @param {*} afterKeepNumber
 * @returns
 */
export function replaceTargetText(
  text,
  replaceText,
  beforeKeepNumber,
  afterKeepNumber,
) {
  let result = toString(text);

  const textLength = (text || '').length;
  if (textLength > 0 && (beforeKeepNumber >= 0 || afterKeepNumber >= 0)) {
    if (
      beforeKeepNumber >= textLength ||
      afterKeepNumber >= textLength ||
      (beforeKeepNumber || 0) + (afterKeepNumber || 0) >= textLength
    ) {
      result = text;
    } else {
      const beforeKeep = text.substr(0, beforeKeepNumber);

      const afterKeep = text.substr(
        textLength - afterKeepNumber,
        afterKeepNumber,
      );

      result = beforeKeep + replaceText + afterKeep;
    }
  }

  return result || '';
}

export function checkDevelopment() {
  return process.env.NODE_ENV === 'development';
}

/**
 * corsTarget
 * ??????????????????
 * @export
 * @param {*} v
 * @returns
 */
export function corsTarget() {
  const appInit = getAppInitConfigData();
  let corsTargetDomain = '';

  if (appInit.apiPrefix != null) {
    if (appInit.apiPrefix.corsTargetDomain != null) {
      const {
        apiPrefix: { corsTargetDomain: corsTargetDomainRemote },
      } = appInit;

      corsTargetDomain = corsTargetDomainRemote;
    }
  }

  return corsTargetDomain;
}

export function showError(text) {
  showErrorMessage({
    message: text,
  });
}

export function showRuntimeError({ message: messageText, showStack = true }) {
  try {
    if (!stringIsNullOrWhiteSpace(messageText || '')) {
      showErrorMessage({
        message: messageText,
      });

      recordError({
        message: messageText,
      });
    }

    if (showStack) {
      throw new Error(
        `${
          stringIsNullOrWhiteSpace(messageText || '')
            ? ''
            : `${toString(messageText)},`
        }????????????:`,
      );
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.stack);
  }
}

export function showSuccessMessage({
  duration = 1500,
  message: messageText,
  onClose = () => {},
}) {
  showMessage({
    type: messageTypeCollection.success,
    message: messageText,
    duration,
    onClose,
  });
}

export function showErrorMessage({
  duration = 1500,
  message: messageText,
  onClose = () => {},
}) {
  showMessage({
    type: messageTypeCollection.error,
    message: messageText,
    duration,
    onClose,
  });
}

export function showWarnMessage({
  duration = 1500,
  message: messageText,
  onClose = () => {},
}) {
  showMessage({
    type: messageTypeCollection.warn,
    message: messageText,
    duration,
    onClose,
  });
}

/**
 * ?????????????????????
 */
export function showWarningMessage({
  duration = 1500,
  message: messageText,
  onClose = () => {},
}) {
  showMessage({
    type: messageTypeCollection.warning,
    message: messageText,
    duration,
    onClose,
  });
}

/**
 * ??????????????????
 */
export function showInfoMessage({
  duration = 1500,
  message: messageText,
  onClose = () => {},
}) {
  showMessage({
    type: messageTypeCollection.info,
    message: messageText,
    duration,
    onClose,
  });
}

export function showOpenMessage({
  duration = 1500,
  message: messageText,
  onClose = () => {},
}) {
  showMessage({
    type: messageTypeCollection.open,
    message: messageText,
    duration,
    onClose,
  });
}

export function showMessage({
  type,
  duration = 1500,
  message: messageText,
  onClose = () => {},
}) {
  requestAnimationFrame(() => {
    switch (type) {
      case messageTypeCollection.success:
        Tips.success(messageText, duration, onClose);
        break;

      case messageTypeCollection.error:
        Tips.error(messageText, duration, onClose);
        break;

      case messageTypeCollection.info:
        Tips.info(messageText, duration, onClose);
        break;

      case messageTypeCollection.warning:
        Tips.warning(messageText, duration, onClose);
        break;

      case messageTypeCollection.warn:
        Tips.warn(messageText, duration, onClose);
        break;

      default:
        Tips.toast(messageText, duration, onClose);
        break;
    }
  });
}

/**
 * ????????????
 *
 * @export
 * @param {*} str
 * @returns
 */
export function recordLog(record, showMode, level = logLevel.debug) {
  recordLogCore(record, showMode, level);
}

export function recordWarn(record) {
  recordWarnCore(record);
}

export function recordInfo(record) {
  recordInfoCore(record);
}

export function recordConfig(record) {
  recordConfigCore(record);
}

export function recordDebug(record) {
  recordDebugCore(record);
}

export function recordExecute(record) {
  recordExecuteCore(record);
}

/**
 * ??????????????????
 */
export function recordError(record) {
  recordErrorCore(record);
}

/**
 * ????????????
 *
 * @export
 * @param {*} str
 * @returns
 */
export function recordText(record, level = logLevel.debug) {
  recordTextCore(record, level);
}

/**
 * ????????????
 *
 * @export
 * @param {*} str
 * @returns
 */
export function recordObject(record, level = logLevel.debug) {
  recordObjectCore(record, level);
}

/**
 * ??????Guid
 *
 * @export
 * @param {*} v
 * @returns
 */
export function getGuid(len = 8, radix = 16) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
    '',
  );
  const value = [];
  let i = 0;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) value[i] = chars[0 | (Math.random() * radix)];
  } else {
    // rfc4122, version 4 form
    let r;

    // rfc4122 requires these characters
    /* eslint-disable-next-line */
    value[8] = value[13] = value[18] = value[23] = '-';
    value[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!value[i]) {
        r = 0 | (Math.random() * 16);
        value[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return value.join('');
}

/**
 * ????????????????????????????????????
 */
export function inCollection(collection, value) {
  return inCollectionCore(collection, value);
}

export function split(source, separator, limit = 1000) {
  return splitLodash(source, separator, limit);
}

/**
 * ???????????????????????????????????????
 */
export function sortedUnique(array) {
  return sortedUniqLodash(array);
}

export function memoize(fn) {
  return memoizeLodash(fn);
}

/**
 *
 *@param  val ??? len??????????????????
 *
 */
export function roundToTarget(v, len) {
  return roundLodash(v, len);
}

export function floor(v, len) {
  return floorLodash(v, len);
}

export function first(array) {
  return firstLodash(array);
}

export function startsWith(source, target) {
  return startsWithLodash(source, target);
}

export function dropRight(array, n = 1) {
  return dropRightLodash(array, n);
}

export function uniqBy(array, iterate) {
  return uniqByLodash(array, iterate);
}

/**
 * ?????? key ??????????????????
 */
export function getValueByKey({
  data,
  key,
  defaultValue = null,
  convert = null,
  convertBuilder = null,
  format = null,
  formatBuilder = null,
}) {
  const v = getPathValue(data, key, defaultValue);

  let result = v;

  if ((convertBuilder || null) != null || (convert || null) != null) {
    if (isFunction(convertBuilder)) {
      result = convertTarget({
        target: v,
        convert: convertBuilder,
      });
    } else {
      result = convertTarget({
        target: v,
        convert,
      });
    }
  }

  if ((formatBuilder || null) != null || (format || null) != null) {
    if (isFunction(formatBuilder)) {
      result = formatTarget({
        target: result,
        format: formatBuilder,
      });
    } else {
      result = formatTarget({
        target: result,
        format,
      });
    }
  }

  return result;
}

/**
 * convertTarget
 * @param {*} param0
 * @returns
 */
export function convertTarget({ target, convert }) {
  if (isFunction(convert)) {
    return convert(target);
  }

  if (isString(convert)) {
    switch (convert) {
      case convertCollection.number:
        return toNumber(target);

      case convertCollection.datetime:
        return toDatetime(target);

      case convertCollection.string:
        return toString(target);

      case convertCollection.money:
        return toMoney(target);

      case convertCollection.array:
        return (target || null) == null
          ? []
          : isArray(target)
          ? target
          : [target];

      default:
        return target;
    }
  }

  return target;
}

export function formatDatetime({
  data: date,
  fmt = datetimeFormat.yearMonthDayHourMinuteSecond,
}) {
  if ((date || null) == null) {
    return '';
  }

  return dayjs(date).format(fmt);
}

export function getDayOfWeek({ data: date }) {
  return dayjs(date).day();
}

export function getNowDayOfWeek(transferChinese = true) {
  const day = dayjs().day();

  if (!transferChinese) {
    return day;
  }

  let result = '';

  switch (toNumber(day)) {
    case 0:
      result = '???';
      break;

    case 1:
      result = '???';
      break;

    case 2:
      result = '???';
      break;

    case 3:
      result = '???';
      break;

    case 4:
      result = '???';
      break;

    case 5:
      result = '???';
      break;

    case 6:
      result = '???';
      break;

    default:
      result = '';
      break;
  }

  return stringIsNullOrWhiteSpace(result) ? '' : `??????${result}`;
}

export function formatTarget({ target, format, option = {} }) {
  if (isFunction(format)) {
    return format(target);
  }

  if (isString(format)) {
    switch (format) {
      case formatCollection.money:
        return formatMoney({
          data: target,
        });

      case formatCollection.datetime:
        return formatDatetime({
          data: target,
        });

      case formatCollection.chineseMoney:
        return formatMoneyToChinese({ target, option });

      case formatCollection.percentage:
        return `${roundToTarget(target * 100, 1)}%`;

      default:
        return target;
    }
  }

  return target;
}

/**
 *??????????????????
 * @param {startTime} ????????????
 * @param {endTime} ????????????
 */
export function calculateTimeInterval(startTime, endTime) {
  const timeBegin = startTime.getTime();
  const timeEnd = endTime.getTime();
  const total = (timeEnd - timeBegin) / 1000;

  const day = parseInt(total / (24 * 60 * 60)); //??????????????????
  const afterDay = total - day * 24 * 60 * 60; //????????????????????????????????????
  const hour = parseInt(afterDay / (60 * 60)); //?????????????????????
  const afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60; //???????????????????????????????????????
  const min = parseInt(afterHour / 60); //???????????????
  const afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60; //?????????????????????????????????

  return {
    day,
    hour: hour,
    minute: min,
    second: afterMin,
  };
}

export function addHour(datetime, value) {
  const t = toDatetime(datetime);

  return t.setHours(t.getHours() + value);
}

export function addMinute(datetime, value) {
  const t = toDatetime(datetime);

  return t.setMinutes(t.getMinutes() + value);
}

export function addSecond(datetime, value) {
  const t = toDatetime(datetime);

  return t.setSeconds(t.getSeconds() + value);
}

export function getNow() {
  return new Date();
}

/**
 * ???????????????
 */
export const calculateMonthInterval = (startMonth, endMonth) => {
  const start = toDatetime(startMonth);
  const end = toDatetime(endMonth);
  return (
    (start.getFullYear() - end.getFullYear()) * 12 +
    start.getMonth() -
    end.getMonth()
  );
};

/**
 * ???????????????
 */
export const calculateDateInterval = (date, nowDate, unit) => {
  const start = toDatetime(date);
  const end = nowDate ? toDatetime(nowDate) : new Date();
  const output = end.getTime() - start.getTime();

  return (
    (unit === 'second' && output / 1000) ||
    (unit === 'minute' && output / 1000 / 60) ||
    (unit === 'hour' && output / 1000 / 60 / 60) ||
    (unit === 'day' && output / 1000 / 60 / 60 / 24) ||
    (unit === 'week' && output / 1000 / 60 / 60 / 24 / 7) ||
    (unit === 'month' && calculateMonthInterval(start, end)) ||
    (unit === 'quarter' && calculateMonthInterval(start, end) / 3) ||
    (unit === 'year' && calculateMonthInterval(start, end) / 12) ||
    output
  );
};

/**
 * ?????????????????????????????????????????????
 * @param    {date} start ????????????
 * @param    {date} end ????????????
 * @param    {Object} opts ????????????
 * @return   {String}      ????????????
 */
export function formatDateInterval(start, end, opts = {}) {
  const options = {
    ...{
      second: ['??????', '?????????'],
      seconds: ['%d ??????', '%d ??????'],
      minute: ['?????? 1 ?????????', '?????? 1 ?????????'],
      minutes: ['%d ?????????', '%d ?????????'],
      hour: ['?????? 1 ?????????', '?????? 1 ?????????'],
      hours: ['%d ?????????', '%d ?????????'],
      day: ['1 ??????', '1 ??????'],
      days: ['%d ??????', '%d ??????'],
      month: ['?????? 1 ?????????', '?????? 1 ?????????'],
      months: ['%d ??????', '%d ??????'],
      year: ['?????? 1 ??????', '?????? 1 ??????'],
      years: ['%d ??????', '%d ??????'],
    },
    ...(opts || {}),
  };

  const diff = calculateDateInterval(start, end);

  const interval = diff < 0 ? 1 : 0;
  const seconds = Math.abs(diff) / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const years = days / 365;
  const substitute = (string, number) => string.replace(/%d/i, number);

  return (
    (seconds < 10 && substitute(options.second[interval], parseInt(seconds))) ||
    (seconds < 45 &&
      substitute(options.seconds[interval], parseInt(seconds))) ||
    (seconds < 90 && substitute(options.minute[interval], 1)) ||
    (minutes < 45 &&
      substitute(options.minutes[interval], parseInt(minutes))) ||
    (minutes < 90 && substitute(options.hour[interval], 1)) ||
    (hours < 24 && substitute(options.hours[interval], parseInt(hours))) ||
    (hours < 42 && substitute(options.day[interval], 1)) ||
    (days < 30 && substitute(options.days[interval], parseInt(days))) ||
    (days < 45 && substitute(options.month[interval], 1)) ||
    (days < 365 && substitute(options.months[interval], parseInt(days / 30))) ||
    (years < 1.5 && substitute(options.year[interval], 1)) ||
    substitute(options.years[interval], parseInt(years))
  );
}

/**
 * ???????????????????????????????????????????????????
 * @param    {time} start ??????
 * @param    {Object} opts ????????????
 * @return   {String}      ????????????
 */
export function formatDateIntervalWithNow(time, opts = {}) {
  return formatDateInterval(time, getNow(), opts);
}

/**
 * ?????? path ??????????????????
 */
export function getPathValue(o, path, defaultValue = null) {
  if (isUndefined(o)) {
    return null || defaultValue;
  }

  if (o == null) {
    return null || defaultValue;
  }

  if (!isString(path)) {
    const text = 'getPathValue Function param path must be string';

    showRuntimeError({
      message: text,
    });

    return null;
  }

  const v = getLodash(o, path, defaultValue);

  if (isUndefined(defaultValue) || isNull(defaultValue)) {
    return v;
  }

  return v || defaultValue;
}

/**
 * ???????????????
 *
 * @export
 * @param {*} str
 * @returns
 */
export function formatDecimal({
  data,
  places = 2,
  thousand = ',',
  decimal = '.',
}) {
  return formatMoney({
    data,
    places,
    symbol: '',
    thousand,
    decimal,
  });
}

/**
 * ???????????????
 *
 * @export
 * @param {*} str
 * @returns
 */
export function formatMoney({
  data: numberSource,
  places: placesSource = 2,
  symbol: symbolSource = '??',
  thousand: thousandSource = ',',
  decimal: decimalSource = '.',
}) {
  let number = numberSource || 0;
  //?????????????????? ???????????? formatMoney(542986,3) ??????????????????????????????, ????????? ???????????????
  // eslint-disable-next-line no-restricted-globals
  let places = !isNaN((placesSource = Math.abs(placesSource)))
    ? placesSource
    : 2;
  //symbol????????????????????????????????? ???????????? formatMoney(542986,2,"$")
  let symbol = symbolSource !== undefined ? symbolSource : '???';
  //thousand??????????????????,??????,???????????????
  let thousand = thousandSource || ',';
  //decimal???????????????
  let decimal = decimalSource || '.';
  //negative???????????????????????????????????????-????????????????????? ??????????????????
  //i???????????????????????????
  let negative = number < 0 ? '-' : '';
  let i = parseInt((number = Math.abs(+number || 0).toFixed(places)), 10) + '';

  let j = i.length;

  j = j > 3 ? j % 3 : 0;

  return (
    symbol +
    negative +
    (j ? i.substr(0, j) + thousand : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, symbolSource + '1' + thousand) +
    // ???????????????
    // i.substr(j).replace(/(\d{3})(?=\d)/g, "$" + "1" + thousand) +
    // ???????????????
    // i.substr(j).replace(/(?=(\B\d{3})+$)/g, thousand) +
    (places
      ? decimal +
        Math.abs(number - toNumber(i))
          .toFixed(places)
          .slice(2)
      : '')
  );
}

/**
 * ???????????????string??????????????????target???????????????
 */
export function endsWith(source, target, position) {
  return endsWithLodash(source, target, position);
}

/**
 * ??????????????????????????????????????????, ???????????????????????????????????????
 */
export function removeEndMatch(source, target) {
  if (!isString(source)) {
    throw new Error('removeEndMatch only use for string source');
  }

  if (!isString(target)) {
    throw new Error('removeEndMatch only use for string target');
  }

  if (stringIsNullOrWhiteSpace(source)) {
    return source;
  }

  if (stringIsNullOrWhiteSpace(target)) {
    return source;
  }

  const lastIndex = source.lastIndexOf(target);

  if (lastIndex >= 0 && source.length === lastIndex + target.length) {
    return source.substr(lastIndex, target.length);
  }

  return source;
}

/**
 * ??????????????????????????????????????????
 */
export function removeLastMatch(source, target) {
  if (!isString(source)) {
    throw new Error('removeEndMatch only use for string source');
  }

  if (!isString(target)) {
    throw new Error('removeEndMatch only use for string target');
  }

  if (stringIsNullOrWhiteSpace(source)) {
    return source;
  }

  if (stringIsNullOrWhiteSpace(target)) {
    return source;
  }

  const lastIndex = source.lastIndexOf(target);

  if (lastIndex >= 0) {
    return source.substr(lastIndex, target.length);
  }

  return source;
}

/**
 * ??????????????????????????????
 *
 * @export
 * @param {*} target ???????????????
 * @returns
 */
export function formatMoneyToChinese({ target }) {
  let money = target;

  const cnNumber = ['???', '???', '???', '???', '???', '???', '???', '???', '???', '???']; // ???????????????
  const cnIntBasic = ['', '???', '???', '???']; // ????????????
  const cnIntUnits = ['', '???', '???', '???']; // ??????????????????????????????
  const cnDecUnits = ['???', '???', '???', '???']; // ????????????????????????
  // var cnInteger = "???"; // ?????????????????????????????????
  const cnIntLast = '???'; // ????????????????????????
  const maxNum = 999999999999999.9999; // ?????????????????????

  let IntegerNum; // ??????????????????
  let DecimalNum; // ??????????????????
  let ChineseString = ''; // ??????????????????????????????
  let parts; // ???????????????????????????, ?????????
  if (money === '') {
    return '';
  }
  money = parseFloat(money);
  if (money >= maxNum) {
    return '????????????????????????';
  }
  if (money === 0) {
    ChineseString = cnNumber[0] + cnIntLast;

    return ChineseString;
  }
  money = money.toString(); // ??????????????????
  if (money.indexOf('.') === -1) {
    IntegerNum = money;
    DecimalNum = '';
  } else {
    parts = money.split('.');

    [IntegerNum, DecimalNum] = parts;
    DecimalNum = parts[1].substr(0, 4);
  }
  if (parseInt(IntegerNum, 10) > 0) {
    // ????????????????????????
    let zeroCount = 0;
    const IntLen = IntegerNum.length;
    for (let i = 0; i < IntLen; i += 1) {
      const n = IntegerNum.substr(i, 1);
      const p = IntLen - i - 1;
      const q = p / 4;
      const m = p % 4;
      if (n === '0') {
        zeroCount += 1;
      } else {
        if (zeroCount > 0) {
          ChineseString += cnNumber[0];
        }
        zeroCount = 0; // ??????
        ChineseString += cnNumber[parseInt(n, 10)] + cnIntBasic[m];
      }
      if (m === 0 && zeroCount < 4) {
        ChineseString += cnIntUnits[q];
      }
    }
    ChineseString += cnIntLast;
    // ????????????????????????
  }
  if (DecimalNum !== '') {
    // ????????????
    const decLen = DecimalNum.length;
    for (let i = 0; i < decLen; i += 1) {
      const n = DecimalNum.substr(i, 1);
      if (n !== '0') {
        ChineseString += cnNumber[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (ChineseString === '') {
    ChineseString += cnNumber[0] + cnIntLast;
  }

  return ChineseString;
}

export function seededRandom({ seed, min, max }) {
  const maxValue = max || 1;
  const minValue = min || 0;
  const seedValue = (seed * 9301 + 49297) % 233280;
  const rnd = seedValue / 233280.0;

  return minValue + rnd * (maxValue - minValue);
}

/**
 * ??????????????????????????????????????????
 *
 * @export
 * @param {*} seed
 * @returns
 */
export function getRandomColor({ seed }) {
  return `#${`00000${((seededRandom({ seed }) * 0x1000000) << 0).toString(
    16,
  )}`.substr(-6)}`;
}

function getBrowserInfoCore() {
  const getBrowserVersion = () => {
    const u = navigator.userAgent;
    return {
      // ?????????????????????????????????
      trident: u.indexOf('Trident') > -1, // IE??????
      presto: u.indexOf('Presto') > -1, // opera??????
      webKit: u.indexOf('AppleWebKit') > -1, // ?????????????????????
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // ????????????
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), // ?????????????????????
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios??????
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android ?????????uc?????????
      iPhone: u.indexOf('iPhone') > -1, // ????????? iPhone ?????? QQHD ?????????
      iPad: u.indexOf('iPad') > -1, // ??????iPad
      webApp: u.indexOf('Safari') === -1, // ??????web????????????, ?????????????????????
    };
  };

  return {
    versions: getBrowserVersion(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase(),
  };
}

export function transformListData({
  list = [],
  convert = null,
  recursiveKey = 'children',
}) {
  const listData = isArray(list) ? list : [list];

  const l = listData.map((one) => {
    return transformData({ data: one, convert, target: recursiveKey });
  });

  return l;
}

export function transformData({
  data,
  convert = null,
  recursiveKey = 'children',
}) {
  if (!isFunction(convert)) {
    return data;
  }

  const d = convert(data);

  const children = data[recursiveKey];

  let listData = [];

  if (isArray(children)) {
    listData = children.map((one) => {
      return transformData({ data: one, convert, target: recursiveKey });
    });
  }

  d[recursiveKey] = listData;

  return d;
}

/**
 * ?????????????????????
 *
 * @export
 * @returns
 */
export function getBrowserInfo() {
  return getBrowserInfoCore();
}

/**
 * ?????????????????????
 *
 * @export
 * @param {*} v
 * @param {*} justice
 * @param {*} defaultValue
 * @param {*} originalOption
 * @param {*} convertCallback
 */
export function refitFieldDecoratorOption(
  v,
  justice,
  defaultValue,
  originalOption,
  convertCallback,
) {
  const result = originalOption;
  const justiceV = typeof justice !== 'undefined' && justice !== null;
  const defaultV = typeof defaultValue === 'undefined' ? null : defaultValue;

  if (justiceV) {
    if (typeof convertValue === 'function') {
      result.initialValue = convertCallback(v) || defaultV;
    } else {
      result.initialValue = v || defaultV;
    }
  }

  return result;
}

/**
 * ??????????????????
 *
 * @export ????????????
 * @param {*} listData ???????????????
 * @param {*} empty ????????????????????????
 * @param {*} otherListData ??????????????????????????????
 * @returns ????????????????????????
 */
export function refitCommonData(listData, empty, otherListData) {
  let result = [];

  if (typeof listData !== 'undefined') {
    if (listData !== null) {
      result = [...listData];
    }
  }

  if (typeof otherListData !== 'undefined') {
    if (otherListData !== null) {
      result = [...result, ...otherListData];
    }
  }

  if (typeof empty !== 'undefined') {
    if (empty !== null) {
      result = [empty, ...result];
    }
  }

  return result;
}

/**
 * ?????????????????????
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function evil(fn) {
  // ??????????????????Function, ????????????????????????????????????
  const Fn = Function;
  return new Fn(`return ${fn}`)();
}

/**
 * ???????????????????????????
 *
 * @export
 * @param {*} itemKey
 * @param {*} itemValue
 * @param {*} sourceData
 * @returns
 */
export function searchFromList(itemKey, itemValue, sourceData) {
  const d = sourceData || [];
  let result = null;

  if (itemValue == null) {
    return result;
  }

  d.forEach((o) => {
    if (o[itemKey] === itemValue) {
      result = o;
    }
  });

  return result;
}

/**
 * ??????????????????
 * @param {*} v
 * @param {*} op
 * @param {*} other
 */
export function buildFieldDescription(v, op, other) {
  const o = (other || '') === '' ? '' : `,${other}`;
  return `???${op || '??????'}${v}${o}`;
}

/**
 * ??????LocalStorage??????
 * @export
 * @param {*} key
 * @param {*} value
 */
export function getStringFromLocalStorage(key) {
  try {
    const result = getStorageSync(key);

    return result;
  } catch (e) {
    recordError({
      key,
      e,
    });

    throw e;
  }
}

/**
 * ??????LocalStorage??????
 * @export
 * @param {*} key
 * @param {*} value
 */
export function getJsonFromLocalStorage(key) {
  const jsonString = getStringFromLocalStorage(key);

  if (!stringIsNullOrWhiteSpace(jsonString)) {
    return JSON.parse(jsonString || '{}');
  }

  return null;
}

/**
 * ??????????????????
 * @export
 * @param {*} key
 * @param {*} value
 */
export function saveStringToLocalStorage(key, value) {
  setStorageSync(key, value);
}

/**
 * ??????????????????
 * @export
 * @param {*} key
 * @param {*} value
 */
export function saveJsonToLocalStorage(key, json) {
  setStorageSync(key, JSON.stringify(json || {}));
}

/**
 * ??????LocalStorage??????
 * @export
 * @param {*} key
 */
export function removeLocalStorage(key) {
  removeStorageSync(key);
}

/**
 * ??????LocalStorage??????
 * @export
 * @param {*} key
 */
export function clearLocalStorage() {
  clearStorage();
}

/**
 * Reacts????????????getDerivedStateFromProps ?????????????????????url???????????????????????????????????????state,
 * @export
 */
export function getDerivedStateFromPropsForUrlParamsCore(nextProps) {
  const { match } = nextProps;

  if ((match || null) != null) {
    const { params } = match;

    if ((params || null) != null) {
      return { urlParams: params };
    }
  }

  return null;
}

/**
 * Reacts????????????getDerivedStateFromProps ?????????????????????url???????????????????????????????????????state,???????????????, ?????????null,
 * @export
 */
export function getDerivedStateFromPropsForUrlParams(
  nextProps,
  prevState,
  defaultUrlParams = { id: '' },
  parseUrlParamsForSetState = null,
) {
  let stateUrlParams = getDerivedStateFromPropsForUrlParamsCore(
    nextProps,
    prevState,
  );

  stateUrlParams = stateUrlParams || { urlParams: defaultUrlParams };

  const { urlParams: urlParamsPrev } = prevState;

  const { urlParams } = stateUrlParams;

  if (
    isEqualBySerialize(
      { ...(urlParamsPrev || {}), ...{} },
      { ...(urlParams || {}), ...{} },
    )
  ) {
    return prevState;
  }

  if (isFunction(parseUrlParamsForSetState)) {
    const data = parseUrlParamsForSetState(stateUrlParams);

    return { ...prevState, ...stateUrlParams, ...data };
  }

  return { ...prevState, ...stateUrlParams };
}

export function cloneWithoutMethod(value) {
  if (value == null) {
    return null;
  }

  return JSON.parse(JSON.stringify(value));
}

export function difference(array, values) {
  return differenceLodash(array, values);
}

export function map(collection, iteratee) {
  return mapLodash(collection, iteratee);
}

export function set(object, path, value) {
  return setLodash(object, path, value);
}

export function size(collection) {
  return sizeLodash(collection);
}

/**
 * ?????????????????????
 * @param {collection} ??????????????????, ????????????
 * @param {predicateFunction} ?????????????????????????????????
 */
export function filter(collection, predicateFunction) {
  return filterLodash(collection, predicateFunction);
}

/**
 * ????????????????????????.  ??? iteratee ???????????????????????????.  ??????????????????????????????, ?????????????????????????????????????????????.  iteratees ??????1?????????:  (value).
 * @param {collection}  (Array|Object), ?????????????????????.
 * @param {predicateFunction} ????????????????????????
 */
export function sortBy(collection, predicateFunction) {
  return sortByLodash(collection, predicateFunction);
}

/**
 * ?????????????????????????????? predicateFunction ???????????????????????????????????????index???, ?????????????????????.
 * @param {array} (Array): ??????????????????.
 * @param {predicateFunction} ???????????????????????????????????????
 * @param {fromIndex} (number): The index to search from.
 */
export function findIndex(array, predicateFunction, fromIndex = 0) {
  return findIndexLodash(array, predicateFunction, fromIndex);
}

/**
 * ?????????????????????????????? predicateFunction ???????????????????????????????????????index???, ?????????????????????,??????????????????, ???????????? undefined. .
 * @param {array} (Array): ??????????????????.
 * @param {predicateFunction} ???????????????????????????????????????
 * @param {fromIndex} (number): The index to search from.
 */
export function find(array, predicateFunction, fromIndex = 0) {
  return findLodash(array, predicateFunction, fromIndex);
}

export function checkExist(array, predicateFunction, fromIndex = 0) {
  const result = find(array, predicateFunction, fromIndex);

  return !isUndefined(result);
}

export function reverse(array) {
  return reverseLodash(array);
}

export function trim(source) {
  return trimCore(source);
}

export function replace(source, pattern, replacement) {
  return replaceCore(source, pattern, replacement);
}

export function assign(target, source) {
  return assignLodash(target, source);
}

export function assignWith(target, sources, customizer) {
  return assignWithLodash(target, sources, customizer);
}

export function forEach(collection, iteratee) {
  return forEachLodash(collection, iteratee);
}

export function gte(value, other) {
  return gteLodash(value, other);
}

/**
 * ???????????????predicate??????????????????????????????????????????, ????????????????????????????????????. predicate???????????? ?????????3?????????:  (value, index, array).
 * @param {*} array
 * @param {*} predicate (Array|Function|Object|string): ???????????????????????????
 */
export function removeFromArray(array, predicate) {
  return removeLodash(array, predicate);
}

export function stringIsNullOrWhiteSpace(value) {
  return stringIsNullOrWhiteSpaceCore(value);
}

export function sha1(v) {
  return hash(v, { algorithm: 'sha1' });
}

export function md5(v) {
  return hash(v, { algorithm: 'md5' });
}

/**
 * base64??????
 */
export function decodeBase64(target) {
  let commonContent = (target || '').replace(/\s/g, '+');
  commonContent = Buffer.from(commonContent, 'base64').toString();
  return commonContent;
}

/**
 * base64??????
 */
export function encodeBase64(target) {
  const base64Content = Buffer.from(target).toString('base64');
  return base64Content;
}

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

/**
 * ??????????????????
 * @param {*} v
 * @param {*} op
 * @param {*} other
 */
export function buildFieldHelper(v, prefix = '???: ') {
  return `${prefix}${v}. `;
}

export function getNearestLocalhostNotifyCache() {
  const key = storageKeyCollection.nearestLocalhostNotify;

  const d = getJsonFromLocalStorage(key);

  if ((d || null) == null) {
    return null;
  }

  if ((d.nearestTime || null) == null) {
    return null;
  }

  return d || null;
}

export function setNearestLocalhostNotifyCache() {
  const key = storageKeyCollection.nearestLocalhostNotify;

  const now = parseInt(new Date().getTime() / 1000, 10);

  const d = {
    nearestTime: now,
  };

  return saveJsonToLocalStorage(key, d);
}

export function removeNearestLocalhostNotifyCache() {
  const key = storageKeyCollection.nearestLocalhostNotify;
  removeLocalStorage(key);
}

/**
 * ?????????????????????????????????????????????????????????????????????, ???????????????????????????
 */
export function trySendNearestLocalhostNotify({ text }) {
  let needSend = false;
  let nearestTime = 0;

  const nearestLocalhostNotify = getNearestLocalhostNotifyCache() || null;

  if (nearestLocalhostNotify == null) {
    needSend = true;
  } else {
    nearestTime = nearestLocalhostNotify.nearestTime || 0;
  }

  const now = parseInt(new Date().getTime() / 1000, 10);

  try {
    if (nearestTime + 30 < now) {
      needSend = true;
    }

    if (needSend) {
      const message = `??????????????????: ${text}. `;

      notify({
        type: notificationTypeCollection.info,
        message,
      });

      recordText({
        message,
      });

      setNearestLocalhostNotifyCache();
    }
  } catch (error) {
    recordLog(error);
  }
}

/**
 * ????????????
 */
export function ellipsis(value, length, symbol = '...') {
  if (value && value.length > length) {
    return `${toString(value).substr(0, length)}${symbol}`;
  }

  return toString(value);
}

export function notifySuccess(text) {
  notify({
    type: notificationTypeCollection.success,
    message: text,
  });
}

/**
 * ??????????????????
 */
export function notify({
  type = notificationTypeCollection.info,
  message: messageValue,
  closeCallback = null,
}) {
  const { message: messageText } = {
    ...{
      message: '????????????',
    },
    ...{
      message: messageValue,
    },
  };

  setTimeout(() => {
    switch (type) {
      case notificationTypeCollection.success:
        Tips.success(messageText, 1500, closeCallback);
        break;

      case notificationTypeCollection.warning:
        Tips.info(messageText, 1500, closeCallback);
        break;

      case notificationTypeCollection.error:
        Tips.info(messageText, 1500, closeCallback);
        break;

      case notificationTypeCollection.info:
        Tips.info(messageText, 1500, closeCallback);
        break;

      case notificationTypeCollection.warn:
        Tips.info(messageText, 1500, closeCallback);
        break;

      default:
        Tips.info(messageText, 1500, closeCallback);
        break;
    }
  }, 600);
}

export function checkFromConfig({ label, name, helper }) {
  let labelText = 'object';
  let nameText = 'object';
  let helperText = 'object';

  if (isObject(label)) {
    const text = 'label???????????????';

    showRuntimeError({
      message: text,
    });

    recordObject(label);
  } else {
    labelText = label;
  }

  if (isObject(name)) {
    const text = 'name???????????????';

    showRuntimeError({
      message: text,
    });

    recordObject(name);
  } else {
    nameText = name;
  }

  if (isObject(helper)) {
    const text = 'helper???????????????';

    showRuntimeError({
      message: text,
    });

    recordObject(helper);
  } else {
    helperText = helper;
  }

  return {
    label: labelText,
    name: nameText,
    helper: helperText,
  };
}

/**
 * ?????????????????????????????????, ??????????????????????????????
 */
export function sortCollectionByKey({
  operate,
  item,
  list,
  sortKey,
  sortMin = 0,
}) {
  if ((item || null) == null) {
    return list;
  }

  const beforeList = [];
  const afterList = [];
  let result = [];

  if ((list || []).length <= 1) {
    const text = '????????????!';

    showWarnMessage({
      message: text,
    });

    return list;
  }

  const itemSort = getValueByKey({
    data: item,
    key: sortKey,
    convert: convertCollection.number,
  });

  (list || []).forEach((o) => {
    const sort = getValueByKey({
      data: o,
      key: sortKey,
      convert: convertCollection.number,
    });

    if (sort < itemSort) {
      beforeList.push(o);
    }

    if (sort > itemSort) {
      afterList.push(o);
    }
  });

  switch (operate) {
    case sortOperate.moveUp:
      if (itemSort === sortMin) {
        const text = '??????????????????!';

        showWarnMessage({
          message: text,
        });

        return list;
      }

      (beforeList || []).forEach((o, index) => {
        if (index < beforeList.length - 1) {
          result.push(o);
        } else {
          const o1 = item;
          o1[sortKey] -= 1;

          result.push(o1);

          const o2 = o;
          o2[sortKey] += 1;

          result.push(o2);
        }
      });

      result = result.concat(afterList);

      break;

    case sortOperate.moveDown:
      if (itemSort === (list || []).length + sortMin - 1) {
        const text = '??????????????????!';

        showWarnMessage({
          message: text,
        });

        return list;
      }

      result = result.concat(beforeList);

      (afterList || []).forEach((o, index) => {
        if (index === 0) {
          const o2 = o;
          o2[sortKey] -= 1;

          result.push(o2);

          const o1 = item;
          o1[sortKey] += 1;

          result.push(o1);
        } else {
          result.push(o);
        }
      });

      break;

    default:
      const text = `??????????????????, ??????????????????['${sortOperate.moveUp}','${sortOperate.moveDown}']!`;

      showWarnMessage({
        message: text,
      });

      break;
  }

  return result;
}

export function queryStringify(data) {
  return stringify(data);
}

export function queryStringParse(data) {
  return parse(data);
}

/**
 * ??????????????????????????????(??????)
 * @param  n
 */
export function sleep(n, callback) {
  let start = new Date().getTime();

  while (true) {
    if (new Date().getTime() - start > n) {
      break;
    }
  }

  if (isFunction(callback)) {
    callback();
  }
}

export function getSystemInfo() {
  if (globalSystemInfo == null) {
    globalSystemInfo = getSystemInfoSync();
  }

  return globalSystemInfo;
}

export function createSelectorQuery() {
  return createSelectorQueryCore();
}

export function requestAnimationFrame(callback) {
  const systemInfo = getSystemInfoSync();
  if (systemInfo.platform === 'devtools') {
    return setTimeout(() => {
      callback();
    }, 33.333333333333336);
  }
  return createSelectorQuery()
    .selectViewport()
    .boundingClientRect()
    .exec(() => {
      callback();
    });
}

export function getSetting(params) {
  return getSettingCore(params);
}

export function switchTab(params) {
  return switchTabCore(params);
}

export function reLaunch(params) {
  return reLaunchCore(params);
}

export function navigateBack(params) {
  return navigateBackCore(params);
}

/**
 * startGeographicalLocationUpdate
 */
export function startGeographicalLocationUpdate({
  success = null,
  fail = null,
  complete = null,
}) {
  recordExecute('startGeographicalLocationUpdate');

  startGeographicalLocationUpdateCore({
    success,
    fail,
    complete,
  });
}

/**
 * stopGeographicalLocationUpdate
 */
export function stopGeographicalLocationUpdate({
  success = null,
  fail = null,
  complete = null,
}) {
  recordExecute('stopGeographicalLocationUpdate');

  stopGeographicalLocationUpdateCore({
    success,
    fail,
    complete,
  });
}

export function onGeographicalLocationChange(callback) {
  recordExecute('onGeographicalLocationChange');

  onGeographicalLocationChangeCore(callback);
}

export function offGeographicalLocationChange(callback) {
  recordExecute('offGeographicalLocationChange');

  offGeographicalLocationChangeCore(callback);
}

/**
 *
 * @param {*} success  success callback
 * @param {*} fail     fail callback
 * @param {*} complete complete callback
 * @param {*} simulationMode true or false,do not set to true in production,unless you know what it does
 * @param {*} simulationData simulation data for simulation mode set to true
 * @returns
 */
export function getGeographicalLocation({
  success: successCallback,
  fail: failCallback,
  complete: completeCallback,
  simulationMode = false,
  simulationData = null,
}) {
  if (simulationMode) {
    recordDebug('getGeographicalLocation simulationMode:true');

    if ((simulationData || null) == null) {
      throw new Error(
        'simulationData is required and must be an object when simulationMode is true!',
      );
    }

    successCallback(simulationData);

    return;
  }

  recordExecute('getGeographicalLocation');

  startGeographicalLocationUpdate({
    success: () => {
      recordDebug('startGeographicalLocationUpdate callback success');

      onGeographicalLocationChange((res) => {
        try {
          if (isFunction(successCallback)) {
            successCallback(res);
          }
        } catch {
          if (isFunction(failCallback)) {
            failCallback(res);
          }
        } finally {
          offGeographicalLocationChange();

          stopGeographicalLocationUpdate({});
        }
      });
    },
    fail: (res) => {
      recordDebug('startGeographicalLocationUpdate callback fail');

      try {
        if (isFunction(failCallback)) {
          failCallback(res);
        }
      } catch (e) {
        recordError(e);
      } finally {
        stopGeographicalLocationUpdate({});
      }
    },
    complete: (res) => {
      if (isFunction(completeCallback)) {
        completeCallback(res);
      }
    },
  });
}

export function createAnimation(params) {
  return createAnimationCore(params);
}

export function getSelectorQuery() {
  return createSelectorQuery();
}

export function requestPayment(params) {
  return requestPaymentCore(params);
}

export function uploadFile(params) {
  return uploadFileCore(params);
}

export function downloadFile(params) {
  return downloadFileCore(params);
}

/**
 * downloadFileAndOpen
 */
export function downloadFileAndOpen({ url, successCallback = null }) {
  downloadFile({
    url,
    success: (res) => {
      if (res.statusCode === 200) {
        if (isFunction(successCallback)) {
          successCallback();
        }

        openDocument({
          filePath: res.tempFilePath,
          fileType: 'pdf',
          showMenu: true,
        });
      }
    },
  });
}

export function openDocument(params) {
  return openDocumentCore(params);
}

export function getClipboardData(params) {
  return getClipboardDataCore(params);
}

export function setClipboardData(params) {
  return setClipboardDataCore(params);
}

export function makePhoneCall(params) {
  return makePhoneCallCore(params);
}

export function getFields(selector, context = null) {
  return new Promise((resolve) => {
    let query = createSelectorQuery();

    if (context) {
      query = query.in(context);
    }

    query
      .select(selector)
      .fields({
        node: true,
        size: true,
        properties: ['scrollX', 'scrollY'],
      })
      .exec((rect = []) => {
        return resolve(rect[0]);
      });
  });
}

export function getRect(selector, context = null) {
  return new Promise((resolve) => {
    let query = createSelectorQuery();

    if (context) {
      query = query.in(context);
    }

    query
      .select(selector)
      .boundingClientRect()
      .exec((rect = []) => {
        return resolve(rect[0]);
      });
  });
}

export function getAllRect(selector, context = null) {
  return new Promise((resolve) => {
    let query = createSelectorQuery();
    if (context) {
      query = query.in(context);
    }
    query
      .selectAll(selector)
      .boundingClientRect()
      .exec((rect = []) => resolve(rect[0]));
  });
}

export function getScrollOffset(selector, context = null) {
  return new Promise((resolve) => {
    let query = createSelectorQuery();

    if (context) {
      query = query.in(context);
    }

    query
      .select(selector)
      .scrollOffset()
      .exec((rect = []) => {
        return resolve(rect[0]);
      });
  });
}

export function toPromise(promiseLike) {
  if (isPromise(promiseLike)) {
    return promiseLike;
  }
  return Promise.resolve(promiseLike);
}

/**
 * ???????????????????????????????????????????????????
 * @param {*} pageNo [number] page number
 * @param {*} pageSize [number] page size
 * @param {*} pageSize [number] data total count
 * @returns
 */
export function checkHasMore({ pageNo, pageSize, total }) {
  if ((total || 0) <= 0) {
    return false;
  }

  return (pageNo || 0) * (pageSize || 0) < (total || 0);
}

export function checkEnvIsDevelopment() {
  return process.env.NODE_ENV === 'development';
}

/**
 * ?????? style
 * @param {Object|String} target
 * @param {Object|String} source
 * @returns {String}
 */
export function mergeStyle(target, source) {
  if (
    target &&
    typeof target === 'object' &&
    source &&
    typeof source === 'object'
  ) {
    return Object.assign({}, target, source);
  }

  return styleToString(target) + styleToString(source);
}

export function styleToString(style) {
  if (style && typeof style === 'object') {
    let styleStr = '';

    Object.keys(style).forEach((key) => {
      const lowerCaseKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      styleStr += `${lowerCaseKey}:${style[key]};`;
    });

    return styleStr;
  } else if (style && typeof style === 'string') {
    return style;
  }

  return '';
}

export function mergeProps(...items) {
  function customizer(objValue, srcValue) {
    return isUndefined(srcValue) ? objValue : srcValue;
  }

  let ret = assign({}, items[0]);
  for (let i = 1; i < items.length; i++) {
    ret = assignWith(ret, items[i], customizer);
  }
  return ret;
}

export function withNativeProps(props, element) {
  const p = {
    ...element.props,
  };
  if (props.className) {
    p.className = classNames(element.props.className, props.className);
  }
  if (props.style) {
    p.style = {
      ...p.style,
      ...props.style,
    };
  }
  if (props.tabIndex !== undefined) {
    p.tabIndex = props.tabIndex;
  }
  for (const key in props) {
    if (!props.hasOwnProperty(key)) continue;
    if (key.startsWith('data-') || key.startsWith('aria-')) {
      p[key] = props[key];
    }
  }
  return React.cloneElement(element, p);
}

export function attachPropertiesToComponent(component, properties) {
  const ret = component;

  for (const key in properties) {
    if (properties.hasOwnProperty(key)) {
      ret[key] = properties[key];
    }
  }

  return ret;
}

export function bound(position, min, max) {
  let ret = position;
  if (min !== undefined) {
    ret = Math.max(position, min);
  }
  if (max !== undefined) {
    ret = Math.min(ret, max);
  }
  return ret;
}

export function colorHexToRGB(color, symbol = 'RGB') {
  // 16????????????????????????
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;

  // ????????????????????????
  let c = color.toLowerCase();

  if (reg.test(c)) {
    // ????????????????????????????????????????????????: #fff => #ffffff
    if (c.length === 4) {
      let colorNew = '#';

      for (let i = 1; i < 4; i += 1) {
        colorNew += c.slice(i, i + 1).concat(c.slice(i, i + 1));
      }
      c = colorNew;
    }

    // ?????????????????????????????????RGB
    const colorChange = [];

    for (let i = 1; i < 7; i += 2) {
      colorChange.push(parseInt('0x' + c.slice(i, i + 2)));
    }

    if (symbol) {
      return `${symbol}(${colorChange.join(',')})`;
    }

    return colorChange.join(',');
  } else {
    recordError('?????????16????????????');

    return c;
  }
}

export function handleTouchScroll(flag) {
  if (getEnv() !== ENV_TYPE.WEB) {
    return;
  }

  let scrollTop = 0;

  if (flag) {
    scrollTop = document.documentElement.scrollTop;

    // ???body???????????????
    document.body.classList.add('tfc-frozen');

    // ?????????????????????body??????????????????????????????????????????
    document.body.style.top = transformSize(scrollTop);
  } else {
    document.body.style.top = '';
    document.body.classList.remove('tfc-frozen');

    document.documentElement.scrollTop = scrollTop;
  }
}

export function pxToRem(
  pxSize,
  rootValue = pxToRemRoot,
  unitPrecision = 5,
  minPixelValue = 0,
) {
  if (!isNumber(pxSize)) {
    return pxSize;
  }

  const pixels = parseFloat(pxSize);

  if (pixels < minPixelValue) {
    return pxSize;
  }

  const fixedVal = toFixed(pixels / rootValue, unitPrecision);

  return fixedVal === 0 ? '0' : fixedVal + 'rem';
}

function toFixed(number, precision) {
  const multiplier = Math.pow(10, precision + 1),
    wholeNumber = Math.floor(number * multiplier);
  return (Math.round(wholeNumber / 10) * 10) / multiplier;
}

/**
 * transformSize
 * @param {*} si
 * @returns
 */
export function transformSize(si) {
  if (isNumber(si)) {
    const s = toNumber(si);

    if (s >= -2000 && s <= 2000) {
      if (s === 0) {
        return '0';
      }

      if (s > 0) {
        return `var(--tfc-${s})`;
      }

      return `calc(var(--tfc-${Math.abs(s)}) * -1)`;
    }

    return `${s}px`;
  }

  return si;
}

export function handleInlayColor(color) {
  return inCollection(
    [
      'red',
      'orange',
      'yellow',
      'olive',
      'green',
      'cyan',
      'blue',
      'purple',
      'mauve',
      'pink',
      'brown',
      'grey',
      'gray',
      'black',
    ],
    color,
  )
    ? `var(--tfc-color-${color})`
    : color;
}

export function buildLinearGradient({ direct, list = [] }) {
  const d = isNumber(direct) ? `${direct}deg` : direct;

  return `linear-gradient(${d}, ${list.join()})`;
}

/**
 * ????????????
 *
 * @export
 * @returns
 */
export function emptyExport() {
  return {};
}
