import React from 'react';
import {
  ENV_TYPE,
  getApp,
  getEnv,
  getStorageSync,
  setStorageSync,
  removeStorageSync,
  clearStorage,
  getClipboardData as getClipboardDataCore,
  setClipboardData as setClipboardDataCore,
  createSelectorQuery as createSelectorQueryCore,
  getSystemInfoSync,
  redirectTo as redirectToCore,
  navigateTo as navigateToCore,
  createAnimation as createAnimationCore,
  getSetting as getSettingCore,
  switchTab as switchTabCore,
  reLaunch as reLaunchCore,
  navigateBack as navigateBackCore,
  getPhoneLocation as getPhoneLocationCore,
  requestPayment as requestPaymentCore,
  uploadFile as uploadFileCore,
  downloadFile as downloadFileCore,
  makePhoneCall as makePhoneCallCore,
  showNavigationBarLoading as showNavigationBarLoadingCore,
  hideNavigationBarLoading as hideNavigationBarLoadingCore,
  stopPullDownRefresh as stopPullDownRefreshCore,
  pageScrollTo as pageScrollToCore,
} from '@tarojs/taro';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { stringify, parse } from 'qs';
import {
  filter as filterLodash,
  sortBy as sortByLodash,
  findIndex as findIndexLodash,
  find as findLodash,
  reverse as reverseLodash,
  replace as replaceLodash,
  trim as trimLodash,
  remove as removeLodash,
  difference as differenceLodash,
  split as splitLodash,
  get as getLodash,
  sortedUniq as sortedUniqLodash,
  endsWith as endsWithLodash,
  assign as assignLodash,
  assignWith as assignWithLodash,
  forEach as forEachLodash,
  memoize as memoizeLodash,
  round as roundLodash,
  floor as floorLodash,
  gte as gteLodash,
  first as firstLodash,
  map as mapLodash,
  set as setLodash,
  size as sizeLodash,
} from 'lodash';

import {
  notificationTypeCollection,
  messageTypeCollection,
  logLevel,
  logShowMode,
  appInitDefault,
  convertCollection,
  formatCollection,
  datetimeFormat,
  sortOperate,
  pxToRemRoot,
} from './constants';
import {
  isArray,
  isEqualBySerialize,
  isFunction,
  isNull,
  isObject,
  isString,
  isUndefined,
  isPromise,
  isNumber,
} from './typeCheck';
import Tips from './tips';
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
  return {
    test: 'success',
  };
}

export function getTaroGlobalData() {
  const ENV = getEnv();

  // 标签栏滚动
  switch (ENV) {
    case ENV_TYPE.WEAPP:
      const app = getApp();

      if (isUndefined(app)) {
        return null;
      }

      return app.$app.taroGlobalData;

    case ENV_TYPE.ALIPAY:
      console.warn(`框架在该环境[${ENV}]还未适配`);
      break;

    case ENV_TYPE.SWAN:
      console.warn(`框架在该环境[${ENV}]还未适配`);
      break;

    case ENV_TYPE.WEB:
      if (!window.taroGlobalData) {
        window.taroGlobalData = getDefaultTaroGlobalData();
      }

      return window.taroGlobalData;

    default:
      console.warn(`框架在该环境[${ENV}]还未适配`);
      break;
  }

  return null;
}

export function setTaroGlobalData(config) {
  const ENV = getEnv();

  // 标签栏滚动
  switch (ENV) {
    case ENV_TYPE.WEAPP:
      break;

    case ENV_TYPE.ALIPAY:
      console.warn(`框架在该环境[${ENV}]还未适配`);

    case ENV_TYPE.SWAN:
      console.warn(`框架在该环境[${ENV}]还未适配`);
      break;

    case ENV_TYPE.WEB:
      if (!isObject(window.taroGlobalData)) {
        window.taroGlobalData = {};
      }

      window.taroGlobalData.appInitCustomLocal = config;
      break;

    default:
      console.warn(`框架在该环境[${ENV}]还未适配`);
      break;
  }
}

export function showNavigationBarLoading() {
  showNavigationBarLoadingCore();
}

export function hideNavigationBarLoading() {
  if (isWechat) {
    hideNavigationBarLoadingCore();
  }
}

export function stopPullDownRefresh() {
  stopPullDownRefreshCore();
}

export function pageScrollTo(params) {
  pageScrollToCore(params);
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

  const text = '无效的跳转参数';

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

  const text = '无效的跳转参数';

  showErrorMessage({
    message: text,
  });
}

export function getAppInitConfigData() {
  let appInitConfig = appInitDefault;

  const taroGlobalData = getTaroGlobalData();

  if (taroGlobalData) {
    if ((taroGlobalData.appInitCustomLocal || null) != null) {
      appInitConfig = {
        ...appInitConfig,
        ...taroGlobalData.appInitCustomLocal,
      };
    }

    if ((taroGlobalData.appInitCustomRemote || null) != null) {
      appInitConfig = {
        ...appInitConfig,
        ...taroGlobalData.appInitCustomRemote,
      };
    }
  }

  return appInitConfig;
}

export function getValue(obj) {
  return Object.keys(obj)
    .map((key) => obj[key])
    .join(',');
}

/**
 * 复制到剪贴板
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
 *替换指定字符串
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
 * 跨域域名配置
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
        }调用堆栈:`,
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
 * 显示警告信息框
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
 * 显示消息信息
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
 * 记录日志
 *
 * @export
 * @param {*} str
 * @returns
 */
export function recordLog(record, showMode, level = logLevel.debug) {
  let showModeModified =
    (showMode || null) == null || stringIsNullOrWhiteSpace(showMode)
      ? logShowMode.unknown
      : showMode;

  if (
    !inCollection(
      [logShowMode.unknown, logShowMode.text, logShowMode.object],
      showModeModified,
    )
  ) {
    throw new Error(`无效的日志显示模式:${showModeModified}`);
  }

  if (showModeModified === logShowMode.unknown) {
    if (isString(record)) {
      showModeModified = logShowMode.text;
    } else {
      showModeModified = logShowMode.object;
    }
  }

  if (logShowInConsole() && level === logLevel.debug) {
    if (showModeModified === logShowMode.text) {
      const data = { record, level };

      console.log(JSON.stringify(data));
    }

    if (showModeModified === logShowMode.object) {
      console.log({ record, level });
    }
  }

  if (level === logLevel.error) {
    if (showModeModified === logShowMode.text) {
      const data = { record, level };

      console.log(JSON.stringify(data));
    }

    if (showModeModified === logShowMode.object) {
      console.log({ record, level });
    }
  }
}

/**
 * 记录错误信息
 */
export function recordError(record) {
  if (isString(record)) {
    recordText(record, logLevel.error);
  } else {
    recordObject(record, logLevel.error);
  }
}

/**
 * 记录日志
 *
 * @export
 * @param {*} str
 * @returns
 */
export function recordText(record, level = logLevel.debug) {
  recordLog(record, logShowMode.text, level);
}

/**
 * 记录日志
 *
 * @export
 * @param {*} str
 * @returns
 */
export function recordObject(record, level = logLevel.debug) {
  recordLog(record, logShowMode.object, level);
}

function logShowInConsole() {
  const appInit = getAppInitConfigData();
  const result = !!(appInit.showLogInConsole || false);

  return result;
}

/**
 * 获取Guid
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
 * 检测目标是否在数组址之中
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

export function split(source, separator, limit = 1000) {
  return splitLodash(source, separator, limit);
}

/**
 * 去除重复数据并排序（升序）
 */
export function sortedUnique(array) {
  return sortedUniqLodash(array);
}

export function memoize(fn) {
  return memoizeLodash(fn);
}

/**
 *
 *@param  val 值 len保留小数位数
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

/**
 * 通过 key 获取对应得值
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
 *计算时间间隔
 * @param {startTime} 起始时间
 * @param {endTime} 结束时间
 */
export function calculateTimeInterval(startTime, endTime) {
  const timeBegin = startTime.getTime();
  const timeEnd = endTime.getTime();
  const total = (timeEnd - timeBegin) / 1000;

  const day = parseInt(total / (24 * 60 * 60)); //计算整数天数
  const afterDay = total - day * 24 * 60 * 60; //取得算出天数后剩余的秒数
  const hour = parseInt(afterDay / (60 * 60)); //计算整数小时数
  const afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60; //取得算出小时数后剩余的秒数
  const min = parseInt(afterHour / 60); //计算整数分
  const afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60; //取得算出分后剩余的秒数

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
 * 计算月份差
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
 * 计算时间差
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
 * 格式化指定两时间时间的时间间隔
 * @param    {date} start 起始时间
 * @param    {date} end 结束时间
 * @param    {Object} opts 配置参数
 * @return   {String}      文本内容
 */
export function formatDateInterval(start, end, opts = {}) {
  const options = {
    ...{
      second: ['刚刚', '片刻后'],
      seconds: ['%d 秒前', '%d 秒后'],
      minute: ['大约 1 分钟前', '大约 1 分钟后'],
      minutes: ['%d 分钟前', '%d 分钟后'],
      hour: ['大约 1 小时前', '大约 1 小时后'],
      hours: ['%d 小时前', '%d 小时后'],
      day: ['1 天前', '1 天后'],
      days: ['%d 天前', '%d 天后'],
      month: ['大约 1 个月前', '大约 1 个月后'],
      months: ['%d 月前', '%d 月后'],
      year: ['大约 1 年前', '大约 1 年后'],
      years: ['%d 年前', '%d 年后'],
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
 * 格式化指定时间与当前时间的时间间隔
 * @param    {time} start 时间
 * @param    {Object} opts 配置参数
 * @return   {String}      文本内容
 */
export function formatDateIntervalWithNow(time, opts = {}) {
  return formatDateInterval(time, getNow(), opts);
}

/**
 * 通过 path 获取对应得值
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
 * 格式化货币
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
 * 格式化货币
 *
 * @export
 * @param {*} str
 * @returns
 */
export function formatMoney({
  data: numberSource,
  places: placesSource = 2,
  symbol: symbolSource = '¥',
  thousand: thousandSource = ',',
  decimal: decimalSource = '.',
}) {
  let number = numberSource || 0;
  //保留的小位数 可以写成 formatMoney(542986,3) 后面的是保留的小位数, 否则默 认保留两位
  // eslint-disable-next-line no-restricted-globals
  let places = !isNaN((placesSource = Math.abs(placesSource)))
    ? placesSource
    : 2;
  //symbol表示前面表示的标志是￥ 可以写成 formatMoney(542986,2,"$")
  let symbol = symbolSource !== undefined ? symbolSource : '￥';
  //thousand表示每几位用,隔开,是货币标识
  let thousand = thousandSource || ',';
  //decimal表示小数点
  let decimal = decimalSource || '.';
  //negative表示如果钱是负数有就显示“-”如果不是负数 就不显示负号
  //i表示处理过的纯数字
  let negative = number < 0 ? '-' : '';
  let i = parseInt((number = Math.abs(+number || 0).toFixed(places)), 10) + '';

  let j = i.length;

  j = j > 3 ? j % 3 : 0;

  return (
    symbol +
    negative +
    (j ? i.substr(0, j) + thousand : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, symbolSource + '1' + thousand) +
    // 第一种方案
    // i.substr(j).replace(/(\d{3})(?=\d)/g, "$" + "1" + thousand) +
    // 第二种方案
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
 * 检查字符串string是否以给定的target字符串结尾
 */
export function endsWith(source, target, position) {
  return endsWithLodash(source, target, position);
}

/**
 * 如果字符串末尾匹配目标字符串, 则从源字符串末尾移除匹配项
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
 * 从源字符串移除最后一个匹配项
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
 * 转换金额为人民币大写
 *
 * @export
 * @param {*} target 转换的目标
 * @returns
 */
export function formatMoneyToChinese({ target }) {
  let money = target;

  const cnNumber = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']; // 汉字的数字
  const cnIntBasic = ['', '拾', '佰', '仟']; // 基本单位
  const cnIntUnits = ['', '万', '亿', '兆']; // 对应整数部分扩展单位
  const cnDecUnits = ['角', '分', '毫', '厘']; // 对应小数部分单位
  // var cnInteger = "整"; // 整数金额时后面跟的字符
  const cnIntLast = '元'; // 整型完以后的单位
  const maxNum = 999999999999999.9999; // 最大处理的数字

  let IntegerNum; // 金额整数部分
  let DecimalNum; // 金额小数部分
  let ChineseString = ''; // 输出的中文金额字符串
  let parts; // 分离金额后用的数组, 预定义
  if (money === '') {
    return '';
  }
  money = parseFloat(money);
  if (money >= maxNum) {
    return '超出最大处理数字';
  }
  if (money === 0) {
    ChineseString = cnNumber[0] + cnIntLast;

    return ChineseString;
  }
  money = money.toString(); // 转换为字符串
  if (money.indexOf('.') === -1) {
    IntegerNum = money;
    DecimalNum = '';
  } else {
    parts = money.split('.');

    [IntegerNum, DecimalNum] = parts;
    DecimalNum = parts[1].substr(0, 4);
  }
  if (parseInt(IntegerNum, 10) > 0) {
    // 获取整型部分转换
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
        zeroCount = 0; // 归零
        ChineseString += cnNumber[parseInt(n, 10)] + cnIntBasic[m];
      }
      if (m === 0 && zeroCount < 4) {
        ChineseString += cnIntUnits[q];
      }
    }
    ChineseString += cnIntLast;
    // 整型部分处理完毕
  }
  if (DecimalNum !== '') {
    // 小数部分
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
 * 通过种子等配置返回随机颜色值
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
      // 移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1, // IE内核
      presto: u.indexOf('Presto') > -1, // opera内核
      webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android 终端或uc浏览器
      iPhone: u.indexOf('iPhone') > -1, // 是否为 iPhone 或者 QQHD 浏览器
      iPad: u.indexOf('iPad') > -1, // 是否iPad
      webApp: u.indexOf('Safari') === -1, // 是否web应该程序, 没有头部与底部
    };
  };

  return {
    versions: getBrowserVersion(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase(),
  };
}

/**
 * 获取浏览器信息
 *
 * @export
 * @returns
 */
export function getBrowserInfo() {
  return getBrowserInfoCore();
}

/**
 * 封装表单项配置
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
 * 封装公共数据
 *
 * @export 数据集合
 * @param {*} listData 源数据集合
 * @param {*} empty 要添加的首个数据
 * @param {*} otherListData 要添加的其他数据集合
 * @returns 封装后的数据集合
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
 * 计算表达式的值
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function evil(fn) {
  // 一个变量指向Function, 防止有些前端编译工具报错
  const Fn = Function;
  return new Fn(`return ${fn}`)();
}

/**
 * 搜索集合中的匹配项
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
 * 构建描述文本
 * @param {*} v
 * @param {*} op
 * @param {*} other
 */
export function buildFieldDescription(v, op, other) {
  const o = (other || '') === '' ? '' : `,${other}`;
  return `请${op || '输入'}${v}${o}`;
}

/**
 * 获取LocalStorage数据
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
 * 获取LocalStorage数据
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
 * 存储本地数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function saveStringToLocalStorage(key, value) {
  setStorageSync(key, value);
}

/**
 * 存储本地数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function saveJsonToLocalStorage(key, json) {
  setStorageSync(key, JSON.stringify(json || {}));
}

/**
 * 移除LocalStorage数据
 * @export
 * @param {*} key
 */
export function removeLocalStorage(key) {
  removeStorageSync(key);
}

/**
 * 清空LocalStorage数据
 * @export
 * @param {*} key
 */
export function clearLocalStorage() {
  clearStorage();
}

/**
 * Reacts生命周期getDerivedStateFromProps 辅助函数用于将url参数解析到返回值中用于设定state,
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
 * Reacts生命周期getDerivedStateFromProps 辅助函数用于将url参数解析到返回值中用于设定state,如果值重复, 则返回null,
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
 * 筛选需要的集合
 * @param {collection} 可筛选的对象, 例如数组
 * @param {predicateFunction} 每次迭代调用的筛选函数
 */
export function filter(collection, predicateFunction) {
  return filterLodash(collection, predicateFunction);
}

/**
 * 创建一个元素数组.  以 iteratee 处理的结果升序排序.  这个方法执行稳定排序, 也就是说相同元素会保持原始排序.  iteratees 调用1个参数:  (value).
 * @param {collection}  (Array|Object), 用来迭代的集合.
 * @param {predicateFunction} 这个函数决定排序
 */
export function sortBy(collection, predicateFunction) {
  return sortByLodash(collection, predicateFunction);
}

/**
 * 该方法返回第一个通过 predicateFunction 判断为真值的元素的索引值（index）, 而不是元素本身.
 * @param {array} (Array): 要搜索的数组.
 * @param {predicateFunction} 这个函数会在每一次迭代调用
 * @param {fromIndex} (number): The index to search from.
 */
export function findIndex(array, predicateFunction, fromIndex = 0) {
  return findIndexLodash(array, predicateFunction, fromIndex);
}

/**
 * 该方法返回第一个通过 predicateFunction 判断为真值的元素的索引值（index）, 而不是元素本身,返回匹配元素, 否则返回 undefined. .
 * @param {array} (Array): 要搜索的数组.
 * @param {predicateFunction} 这个函数会在每一次迭代调用
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
  return trimLodash(source);
}

export function replace(source, pattern, replacement) {
  return replaceLodash(source, pattern, replacement);
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
 * 移除数组中predicate（断言）返回为真值的所有元素, 并返回移除元素组成的数组. predicate（断言） 会传入3个参数:  (value, index, array).
 * @param {*} array
 * @param {*} predicate (Array|Function|Object|string): 每次迭代调用的函数
 */
export function removeFromArray(array, predicate) {
  return removeLodash(array, predicate);
}

export function stringIsNullOrWhiteSpace(value) {
  return trim(replace(value || '', ' ', '')) === '';
}

/**
 * base64解码
 */
export function decodeBase64(target) {
  let commonContent = (target || '').replace(/\s/g, '+');
  commonContent = Buffer.from(commonContent, 'base64').toString();
  return commonContent;
}

/**
 * base64编码
 */
export function encodeBase64(target) {
  const base64Content = Buffer.from(target).toString('base64');
  return base64Content;
}

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

/**
 * 构建描述文本
 * @param {*} v
 * @param {*} op
 * @param {*} other
 */
export function buildFieldHelper(v, prefix = '注: ') {
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
 * 尝试发送最近一次本地调用通知（一般用于开发阶段, 提示调用的接口域）
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
      const message = `当前接口域名: ${text}. `;

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
 * 文本缩略
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
 * 发送页面通知
 */
export function notify({
  type = notificationTypeCollection.info,
  message: messageValue,
  closeCallback = null,
}) {
  const { message: messageText } = {
    ...{
      message: '操作结果',
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
    const text = 'label必须为文本';

    showRuntimeError({
      message: text,
    });

    recordObject(label);
  } else {
    labelText = label;
  }

  if (isObject(name)) {
    const text = 'name必须为文本';

    showRuntimeError({
      message: text,
    });

    recordObject(name);
  } else {
    nameText = name;
  }

  if (isObject(helper)) {
    const text = 'helper必须为文本';

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
 * 依照某个键的值进行排序, 请确保键的值为数字型
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
    const text = '无需排序!';

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
        const text = '已经排在首位!';

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
        const text = '已经排在末位!';

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
      const text = `不符合的操作, 允许的操作为['${sortOperate.moveUp}','${sortOperate.moveDown}']!`;

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
 * 同步线程挂起若干时间(毫秒)
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

export function getPhoneLocation(params) {
  return getPhoneLocationCore(params);
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
      .fields({ node: true, size: true })
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

export function toPromise(promiseLike) {
  if (isPromise(promiseLike)) {
    return promiseLike;
  }
  return Promise.resolve(promiseLike);
}

/**
 * 检测是否尚有更多数据，用于分页场景
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
 * 合并 style
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
  // 16进制颜色值的正则
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;

  // 把颜色值变成小写
  let c = color.toLowerCase();

  if (reg.test(c)) {
    // 如果只有三位的值，需变成六位，如: #fff => #ffffff
    if (c.length === 4) {
      let colorNew = '#';

      for (let i = 1; i < 4; i += 1) {
        colorNew += c.slice(i, i + 1).concat(c.slice(i, i + 1));
      }
      c = colorNew;
    }

    // 处理六位的颜色值，转为RGB
    const colorChange = [];

    for (let i = 1; i < 7; i += 2) {
      colorChange.push(parseInt('0x' + c.slice(i, i + 2)));
    }

    if (symbol) {
      return `${symbol}(${colorChange.join(',')})`;
    }

    return colorChange.join(',');
  } else {
    recordError('无效的16进制颜色');

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

    // 使body脱离文档流
    document.body.classList.add('tfc-frozen');

    // 把脱离文档流的body拉上去！否则页面会回到顶部！
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

      return `calc(var(--tfc-${s}) * -1)`;
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

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function emptyExport() {
  return {};
}
