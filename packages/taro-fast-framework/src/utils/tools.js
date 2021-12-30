import Taro from "@tarojs/taro";
import { stringify, parse } from "qs";
import {
  isEqual as isEqualLodash,
  isFunction as isFunctionLodash,
  filter as filterLodash,
  sortBy as sortByLodash,
  findIndex as findIndexLodash,
  find as findLodash,
  reverse as reverseLodash,
  replace as replaceLodash,
  trim as trimLodash,
  isBoolean as isBooleanLodash,
  isUndefined as isUndefinedLodash,
  isNull as isNullLodash,
  isDate as isDateLodash,
  isArray as isArrayLodash,
  isString as isStringLodash,
  remove as removeLodash,
  isObject as isObjectLodash,
  difference as differenceLodash,
  toNumber as toNumberLodash,
  split as splitLodash,
  toString as toStringLodash,
  get as getLodash,
  sortedUniq as sortedUniqLodash,
  toLower,
  endsWith as endsWithLodash,
} from "lodash";

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
} from "./constants";

const storageKeyCollection = {
  nearestLocalhostNotify: "nearestLocalhostNotify",
};

function isBrowser() {
  return (
    typeof window !== "undefined" &&
    typeof window.document !== "undefined" &&
    typeof window.document.createElement !== "undefined"
  );
}

export function getAppInitConfigData() {
  let appInitConfig = appInitDefault;

  if (isBrowser()) {
    if ((window.appInitCustomLocal || null) != null) {
      appInitConfig = { ...appInitConfig, ...window.appInitCustomLocal };
    }

    if ((window.appInitCustomRemote || null) != null) {
      appInitConfig = { ...appInitConfig, ...window.appInitCustomRemote };
    }
  }

  return appInitConfig;
}

export function defaultBaseState() {
  return {
    dataLoading: false,
    processing: false,
    reloading: false,
    searching: false,
    refreshing: false,
    paging: false,
    firstLoadSuccess: false,
    loadSuccess: false,
    urlParams: null,
    externalData: null,
  };
}

export function defaultCoreState() {
  const data = { ...defaultBaseState(), ...{ dataLoading: true } };

  return data;
}

export function defaultCommonState() {
  const data = {
    ...defaultCoreState(),
    ...{
      loadApiPath: "",
      pageName: "",
      metaData: null,
      metaExtra: null,
      metaListData: [],
      metaOriginalData: null,
    },
  };

  return data;
}

export function defaultListState() {
  const data = {
    ...defaultCommonState(),
    ...{
      dateRangeFieldName: "发生时间",
      tableScroll: { x: 1520 },
      formValues: {},
      pageNo: 1,
      pageSize: 10,
      startTimeAlias: "",
      endTimeAlias: "",
      startTime: "",
      endTime: "",
      showSelect: false,
      selectedDataTableDataRows: [],
    },
  };

  return data;
}

export function defaultPageListState() {
  const data = {
    ...defaultCommonState(),
    ...{
      paramsKey: "",
      loadApiPath: "",
      dateRangeFieldName: "发生时间",
      tableScroll: { x: 1520 },
      formValues: {},
      pageNo: 1,
      pageSize: 10,
      startTime: "",
      endTime: "",
      showSelect: false,
      selectedDataTableDataRows: [],
    },
  };

  return data;
}

export function defaultFormState() {
  const data = {
    ...defaultCommonState(),
    ...{ errorFieldName: "", submitApiPath: "" },
  };

  return data;
}

export function getValue(obj) {
  return Object.keys(obj)
    .map((key) => obj[key])
    .join(",");
}

/**
 * 复制到剪贴板
 * @param {*} text
 * @param {*} showText
 */
export function copyToClipboard({ text, successCallback = null }) {
  Taro.setClipboardData({
    data: text,
    success: (res) => {
      successCallback(res);
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
  afterKeepNumber
) {
  let result = toString(text);

  const textLength = (text || "").length;
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
        afterKeepNumber
      );

      // const replaceTargetLength = textLength - (beforeKeepNumber || 0) - (afterKeepNumber || 0);

      // const replaceTarget = text.substring(
      //   (beforeKeepNumber || 0) <= 0 ? 0 : beforeKeepNumber - 1,
      //   textLength - (beforeKeepNumber || 0) - (afterKeepNumber || 0)
      // );

      // const replaced = [];

      // let i = 1;
      // while (i <= replaceTargetLength) {
      //   replaced.push(replaceText);
      //   i += 1;
      // }

      result = beforeKeep + replaceText + afterKeep;
    }
  }

  return result || "";
}

export function checkDevelopment() {
  return process.env.NODE_ENV === "development";
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
  let corsTargetDomain = "";

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
    if (!stringIsNullOrWhiteSpace(messageText || "")) {
      showErrorMessage({
        message: messageText,
      });
    }

    if (showStack) {
      throw new Error(
        `${
          stringIsNullOrWhiteSpace(messageText || "")
            ? ""
            : `${toString(messageText)},`
        }调用堆栈:`
      );
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.stack);
  }
}

export function showSuccessMessage({
  duration = 3,
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
  duration = 3,
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
  duration = 3,
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
  duration = 3,
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
  duration = 3,
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

export function showLoadingMessage({
  duration = 3,
  message: messageText,
  onClose = () => {},
}) {
  showMessage({
    type: messageTypeCollection.loading,
    message: messageText,
    duration,
    onClose,
  });
}

export function showOpenMessage({
  duration = 3,
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
        setTimeout(() => {
          Taro.showToast({
            title: messageText || "",
            icon: "none",
            mask: true,
            duration,
          }).then((res) => {
            if (isFunction(onClose)) {
              setTimeout(() => {
                onClose(res);
              }, 500);
            }
          });
        }, 0);

        break;

      case messageTypeCollection.error:
        setTimeout(() => {
          Taro.showToast({
            title: messageText || "",
            icon: "none",
            mask: true,
            duration,
          }).then((res) => {
            if (isFunction(onClose)) {
              setTimeout(() => {
                onClose(res);
              }, 500);
            }
          });
        }, 0);

        break;

      case messageTypeCollection.info:
        setTimeout(() => {
          Taro.showToast({
            title: messageText || "",
            icon: "none",
            mask: true,
            duration,
          }).then((res) => {
            if (isFunction(onClose)) {
              setTimeout(() => {
                onClose(res);
              }, 500);
            }
          });
        }, 0);

        break;

      case messageTypeCollection.warning:
        setTimeout(() => {
          Taro.showToast({
            title: messageText || "",
            icon: "none",
            mask: true,
            duration,
          }).then((res) => {
            if (isFunction(onClose)) {
              setTimeout(() => {
                onClose(res);
              }, 500);
            }
          });
        }, 0);

        break;

      case messageTypeCollection.warn:
        setTimeout(() => {
          Taro.showToast({
            title: messageText || "",
            icon: "none",
            mask: true,
            duration,
          }).then((res) => {
            if (isFunction(onClose)) {
              setTimeout(() => {
                onClose(res);
              }, 500);
            }
          });
        }, 0);

        break;

      case messageTypeCollection.loading:
        setTimeout(() => {
          Taro.showToast({
            title: messageText || "",
            icon: "none",
            mask: true,
            duration,
          }).then((res) => {
            if (isFunction(onClose)) {
              setTimeout(() => {
                onClose(res);
              }, 500);
            }
          });
        }, 0);

        break;

      default:
        setTimeout(() => {
          Taro.showToast({
            title: messageText || "",
            icon: "none",
            mask: true,
            duration,
          }).then((res) => {
            if (isFunction(onClose)) {
              setTimeout(() => {
                onClose(res);
              }, 500);
            }
          });
        }, 0);

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
      showModeModified
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
      const data = { level, record };

      // eslint-disable-next-line no-console
      console.log(JSON.stringify(data));
    }

    if (showModeModified === logShowMode.object) {
      // eslint-disable-next-line no-console
      console.log({ level, record });
    }
  }

  if (level === logLevel.error) {
    if (showModeModified === logShowMode.text) {
      const data = { level, record };

      // eslint-disable-next-line no-console
      console.log(JSON.stringify(data));
    }

    if (showModeModified === logShowMode.object) {
      // eslint-disable-next-line no-console
      console.log({ level, record });
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
export function getGuid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
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

/**
 * 格式化时间
 *
 * @export
 * @param {*} v
 * @returns
 */
export function isInvalid(v) {
  return typeof v === "undefined";
}

export function toDatetime(v) {
  if ((v || null) == null) {
    return null;
  }

  if (isDate(v)) {
    return v;
  }

  if (isString(v)) {
    const i = v.indexOf("T");

    if (i < 0) {
      // eslint-disable-next-line no-useless-escape
      const value = v.replace(/\-/g, "/");
      const result = new Date(value);

      return result;
    }
  }

  return new Date(v);
}

/**
 * 判断是否是时间字符串
 *
 * @export
 * @param {*} v
 * @returns
 */
export function isDatetime(v) {
  const date = `${typeof v === "undefined" ? null : v}`;
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
 * 判断是否是数字字符串
 *
 * @export
 * @param {*} str
 * @returns
 */
export function isNumber(v) {
  const str = `${typeof v === "undefined" ? null : v}`;

  if (str === "") {
    return false;
  }

  const regular = /^[0-9]*$/;
  const re = new RegExp(regular);
  return re.test(str);
}

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

export function split(source, separator, limit = 1000) {
  return splitLodash(source, separator, limit);
}

/**
 * 去除重复数据并排序（升序）
 */
export function sortedUnique(array) {
  return sortedUniqLodash(array);
}

/**
 *
 *@param  val 值 len保留小数位数
 *
 */
export function roundToTarget(v, len) {
  if (!isMoney(v)) {
    return 0;
  }

  const temp = 10 ** len;

  return Math.round(toMoney(v) * temp) / temp;
}

/**
 * 判断是否是数字字符串
 *
 * @export
 * @param {*} str
 * @returns
 */
export function isMoney(v) {
  const str = `${typeof v === "undefined" ? null : v}`;

  if (str === "") {
    return false;
  }

  const regular = /^([1-9][\d]{0,15}|0)(\.[\d]{1,2})?$/;
  const re = new RegExp(regular);
  return re.test(str);
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
    return "";
  }

  let o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }

  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }

  return fmt;
}

export function formatTarget({ target, format, option = {} }) {
  if (isFunction(format)) {
    return format(target);
  }

  if (isString(format)) {
    switch (format) {
      case formatCollection.money:
        return formatMoney(target);

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
    const text = "getPathValue Function param path must be string";

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
export function formatDecimal(
  numberSource,
  placesSource = 2,
  thousandSource = ",",
  decimalSource = "."
) {
  return formatMoney(
    numberSource,
    placesSource,
    "",
    thousandSource,
    decimalSource
  );
}

/**
 * 格式化货币
 *
 * @export
 * @param {*} str
 * @returns
 */
export function formatMoney({
  number: numberSource,
  places: placesSource = 2,
  symbol: symbolSource = "¥",
  thousand: thousandSource = ",",
  decimal: decimalSource = ".",
}) {
  let number = numberSource || 0;
  //保留的小位数 可以写成 formatMoney(542986,3) 后面的是保留的小位数，否则默 认保留两位
  // eslint-disable-next-line no-restricted-globals
  let places = !isNaN((placesSource = Math.abs(placesSource)))
    ? placesSource
    : 2;
  //symbol表示前面表示的标志是￥ 可以写成 formatMoney(542986,2,"$")
  let symbol = symbolSource !== undefined ? symbolSource : "￥";
  //thousand表示每几位用,隔开,是货币标识
  let thousand = thousandSource || ",";
  //decimal表示小数点
  let decimal = decimalSource || ".";
  //negative表示如果钱是负数有就显示“-”如果不是负数 就不显示负号
  //i表示处理过的纯数字
  let negative = number < 0 ? "-" : "";
  let i = parseInt((number = Math.abs(+number || 0).toFixed(places)), 10) + "";

  let j = i.length;

  j = j > 3 ? j % 3 : 0;

  return (
    symbol +
    negative +
    (j ? i.substr(0, j) + thousand : "") +
    i.substr(j).replace(/(\d{3})(?=\d)/g, symbolSource + "1" + thousand) +
    // 第一种方案
    // i.substr(j).replace(/(\d{3})(?=\d)/g, "$" + "1" + thousand) +
    // 第二种方案
    // i.substr(j).replace(/(?=(\B\d{3})+$)/g, thousand) +
    (places
      ? decimal +
        Math.abs(number - toNumber(i))
          .toFixed(places)
          .slice(2)
      : "")
  );
}

export function toPercentage(val) {
  return `${toMoney((toNumber(val) * 1000) / 10)}%`;
}

/**
 * 检查字符串string是否以给定的target字符串结尾
 */
export function endsWith(source, target, position) {
  return endsWithLodash(source, target, position);
}

/**
 * 如果字符串末尾匹配目标字符串，则从源字符串末尾移除匹配项
 */
export function removeEndMatch(source, target) {
  if (!isString(source)) {
    throw new Error("removeEndMatch only use for string source");
  }

  if (!isString(target)) {
    throw new Error("removeEndMatch only use for string target");
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
    throw new Error("removeEndMatch only use for string source");
  }

  if (!isString(target)) {
    throw new Error("removeEndMatch only use for string target");
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

  const cnNumber = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"]; // 汉字的数字
  const cnIntBasic = ["", "拾", "佰", "仟"]; // 基本单位
  const cnIntUnits = ["", "万", "亿", "兆"]; // 对应整数部分扩展单位
  const cnDecUnits = ["角", "分", "毫", "厘"]; // 对应小数部分单位
  // var cnInteger = "整"; // 整数金额时后面跟的字符
  const cnIntLast = "元"; // 整型完以后的单位
  const maxNum = 999999999999999.9999; // 最大处理的数字

  let IntegerNum; // 金额整数部分
  let DecimalNum; // 金额小数部分
  let ChineseString = ""; // 输出的中文金额字符串
  let parts; // 分离金额后用的数组，预定义
  if (money === "") {
    return "";
  }
  money = parseFloat(money);
  if (money >= maxNum) {
    return "超出最大处理数字";
  }
  if (money === 0) {
    ChineseString = cnNumber[0] + cnIntLast;

    return ChineseString;
  }
  money = money.toString(); // 转换为字符串
  if (money.indexOf(".") === -1) {
    IntegerNum = money;
    DecimalNum = "";
  } else {
    parts = money.split(".");

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
      if (n === "0") {
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
  if (DecimalNum !== "") {
    // 小数部分
    const decLen = DecimalNum.length;
    for (let i = 0; i < decLen; i += 1) {
      const n = DecimalNum.substr(i, 1);
      if (n !== "0") {
        ChineseString += cnNumber[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (ChineseString === "") {
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
  return `#${`00000${((seededRandom(seed) * 0x1000000) << 0).toString(
    16
  )}`.substr(-6)}`;
}

function getBrowserInfoCore() {
  const getBrowserVersion = () => {
    const u = navigator.userAgent;
    return {
      // 移动终端浏览器版本信息
      trident: u.indexOf("Trident") > -1, // IE内核
      presto: u.indexOf("Presto") > -1, // opera内核
      webKit: u.indexOf("AppleWebKit") > -1, // 苹果、谷歌内核
      gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") === -1, // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, // android 终端或uc浏览器
      iPhone: u.indexOf("iPhone") > -1, // 是否为 iPhone 或者 QQHD 浏览器
      iPad: u.indexOf("iPad") > -1, // 是否iPad
      webApp: u.indexOf("Safari") === -1, // 是否web应该程序，没有头部与底部
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
  convertCallback
) {
  const result = originalOption;
  const justiceV = typeof justice !== "undefined" && justice !== null;
  const defaultV = typeof defaultValue === "undefined" ? null : defaultValue;

  if (justiceV) {
    if (typeof convertValue === "function") {
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

  if (typeof listData !== "undefined") {
    if (listData !== null) {
      result = [...listData];
    }
  }

  if (typeof otherListData !== "undefined") {
    if (otherListData !== null) {
      result = [...result, ...otherListData];
    }
  }

  if (typeof empty !== "undefined") {
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
  // 一个变量指向Function，防止有些前端编译工具报错
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
  const o = (other || "") === "" ? "" : `,${other}`;
  return `请${op || "输入"}${v}${o}`;
}

/**
 * 获取SessionStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function getStringFromSessionStorage(key) {
  const storage = window.sessionStorage;
  const value = storage.getItem(key);

  if (process.env.NODE_ENV === "development") {
    return value;
  }

  const decode = decodeBase64(value);
  const v = encodeBase64(decode);

  if (value !== v) {
    return null;
  }

  return decode;
}

/**
 * 获取LocalStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function getStringFromLocalStorage(key) {
  const storage = window.localStorage;
  const value = storage.getItem(key);

  if (process.env.NODE_ENV === "development") {
    return value;
  }

  const decode = decodeBase64(value);
  const v = encodeBase64(decode);

  if (value !== v) {
    return null;
  }

  return decode;
}

/**
 * 获取SessionStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function getJsonFromSessionStorage(key) {
  const jsonString = getStringFromSessionStorage(key);

  if (jsonString) {
    return JSON.parse(jsonString || "{}");
  }

  return null;
}

/**
 * 获取LocalStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function getJsonFromLocalStorage(key) {
  const jsonString = getStringFromLocalStorage(key);

  if (jsonString) {
    return JSON.parse(jsonString || "{}");
  }

  return null;
}

/**
 * 存储SessionStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function saveStringToSessionStorage(key, value) {
  const storage = window.sessionStorage;

  if (process.env.NODE_ENV === "development") {
    storage.setItem(key, value);
  } else {
    storage.setItem(key, encodeBase64(value));
  }
}

/**
 * 存储本地数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function saveStringToLocalStorage(key, value) {
  const storage = window.localStorage;

  if (process.env.NODE_ENV === "development") {
    storage.setItem(key, value);
  } else {
    storage.setItem(key, encodeBase64(value));
  }
}

/**
 * 存储SessionStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function saveJsonToSessionStorage(key, json) {
  saveStringToSessionStorage(key, JSON.stringify(json || {}));
}

/**
 * 存储本地数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function saveJsonToLocalStorage(key, json) {
  saveStringToLocalStorage(key, JSON.stringify(json || {}));
}

/**
 * 移除SessionStorage数据
 * @export
 * @param {*} key
 */
export function removeSessionStorage(key) {
  const storage = window.sessionStorage;
  storage.removeItem(key);
}

/**
 * 移除LocalStorage数据
 * @export
 * @param {*} key
 */
export function removeLocalStorage(key) {
  const storage = window.localStorage;
  storage.removeItem(key);
}

/**
 * 清空SessionStorage数据
 * @export
 * @param {*} key
 */
export function clearSessionStorage() {
  const storage = window.sessionStorage;
  storage.clear();
}

/**
 * 清空LocalStorage数据
 * @export
 * @param {*} key
 */
export function clearLocalStorage() {
  const storage = window.localStorage;
  storage.clear();
}

/**
 * Reacts生命周期getDerivedStateFromProps 辅助函数用于将url参数解析到返回值中用于设定state，
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
 * Reacts生命周期getDerivedStateFromProps 辅助函数用于将url参数解析到返回值中用于设定state,如果值重复，则返回null，
 * @export
 */
export function getDerivedStateFromPropsForUrlParams(
  nextProps,
  prevState,
  defaultUrlParams = { id: "" },
  parseUrlParamsForSetState = null
) {
  let stateUrlParams = getDerivedStateFromPropsForUrlParamsCore(
    nextProps,
    prevState
  );

  stateUrlParams = stateUrlParams || { urlParams: defaultUrlParams };

  const { urlParams: urlParamsPrev } = prevState;

  const { urlParams } = stateUrlParams;

  if (
    isEqualBySerialize(
      { ...(urlParamsPrev || {}), ...{} },
      { ...(urlParams || {}), ...{} }
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

/**
 * 获取本地数据
 * @export
 * @param {value} 对比源
 * @param {other} 对比对象
 * 执行深比较来确定两者的值是否相等。
 * 这个方法支持比较 arrays, array buffers, booleans, date objects, error objects, maps, numbers, Object objects, regexes, sets, strings, symbols, 以及 typed arrays. Object 对象值比较自身的属性，不包括继承的和可枚举的属性。 不支持函数和DOM节点比较。
 */
export function isEqual(value, other) {
  return isEqualLodash(value, other);
}

export function isEqualBySerialize(value, other) {
  const d1 = JSON.stringify(value || {});
  const d2 = JSON.stringify(other || {});

  return d1 === d2;
}

export function cloneWithoutMethod(value) {
  if (value == null) {
    return null;
  }

  return JSON.parse(JSON.stringify(value));
}

export function isFunction(value) {
  return isFunctionLodash(value);
}

export function isArray(value) {
  return isArrayLodash(value);
}

export function isObject(o) {
  return isObjectLodash(o);
}

export function difference(array, values) {
  return differenceLodash(array, values);
}

/**
 * 筛选需要的集合
 * @param {collection} 可筛选的对象，例如数组
 * @param {predicateFunction} 每次迭代调用的筛选函数
 */
export function filter(collection, predicateFunction) {
  return filterLodash(collection, predicateFunction);
}

/**
 * 创建一个元素数组。 以 iteratee 处理的结果升序排序。 这个方法执行稳定排序，也就是说相同元素会保持原始排序。 iteratees 调用1个参数： (value)。
 * @param {collection}  (Array|Object), 用来迭代的集合。
 * @param {predicateFunction} 这个函数决定排序
 */
export function sortBy(collection, predicateFunction) {
  return sortByLodash(collection, predicateFunction);
}

/**
 * 该方法返回第一个通过 predicateFunction 判断为真值的元素的索引值（index），而不是元素本身。
 * @param {array} (Array): 要搜索的数组。
 * @param {predicateFunction} 这个函数会在每一次迭代调用
 * @param {fromIndex} (number): The index to search from.
 */
export function findIndex(array, predicateFunction, fromIndex = 0) {
  return findIndexLodash(array, predicateFunction, fromIndex);
}

/**
 * 该方法返回第一个通过 predicateFunction 判断为真值的元素的索引值（index），而不是元素本身,返回匹配元素，否则返回 undefined。。
 * @param {array} (Array): 要搜索的数组。
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

export function toString(value) {
  return toStringLodash(value);
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

/**
 * 移除数组中predicate（断言）返回为真值的所有元素，并返回移除元素组成的数组。predicate（断言） 会传入3个参数： (value, index, array)。
 * @param {*} array
 * @param {*} predicate (Array|Function|Object|string): 每次迭代调用的函数
 */
export function removeFromArray(array, predicate) {
  return removeLodash(array, predicate);
}

export function stringIsNullOrWhiteSpace(value) {
  return trim(replace(value || "", " ", "")) === "";
}

/**
 * base64解码
 */
export function decodeBase64(target) {
  let commonContent = (target || "").replace(/\s/g, "+");
  commonContent = Buffer.from(commonContent, "base64").toString();
  return commonContent;
}

/**
 * base64编码
 */
export function encodeBase64(target) {
  const base64Content = Buffer.from(target).toString("base64");
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
export function buildFieldHelper(v, prefix = "注：") {
  return `${prefix}${v}。`;
}

export function checkLocalhost() {
  const hostname = toLower(window.location.hostname);

  return hostname === "127.0.0.1" || hostname === "localhost";
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
 * 尝试发送最近一次本地调用通知（一般用于开发阶段，提示调用的接口域）
 */
export function trySendNearestLocalhostNotify({ text }) {
  let needSend = false;
  let nearestTime = 0;

  if (checkLocalhost()) {
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
        notify({
          type: notificationTypeCollection.info,
          message: `当前接口域名：${text}。`,
        });

        setNearestLocalhostNotifyCache();
      }
    } catch (error) {
      recordLog(error);
    }
  }
}

/**
 * 文本缩略
 */
export function ellipsis(value, length) {
  if (value && value.length > length) {
    return `${toString(value).substr(0, length)}...`;
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
      message: "操作结果",
    },
    ...{
      message: messageValue,
    },
  };

  setTimeout(() => {
    switch (type) {
      case notificationTypeCollection.success:
        setTimeout(() => {
          Taro.showToast({
            title: messageText || "",
            icon: "none",
            mask: true,
            duration: 1500,
          }).then((res) => {
            if (isFunction(closeCallback)) {
              setTimeout(() => {
                closeCallback(res);
              }, 500);
            }
          });
        }, 0);

        break;

      case notificationTypeCollection.warning:
        setTimeout(() => {
          Taro.showToast({
            title: messageText || "",
            icon: "none",
            mask: true,
            duration: 1500,
          }).then((res) => {
            if (isFunction(closeCallback)) {
              setTimeout(() => {
                closeCallback(res);
              }, 500);
            }
          });
        }, 0);

        break;

      case notificationTypeCollection.error:
        setTimeout(() => {
          Taro.showToast({
            title: messageText || "",
            icon: "none",
            mask: true,
            duration: 1500,
          }).then((res) => {
            if (isFunction(closeCallback)) {
              setTimeout(() => {
                closeCallback(res);
              }, 500);
            }
          });
        }, 0);

        break;

      case notificationTypeCollection.info:
        setTimeout(() => {
          Taro.showToast({
            title: messageText || "",
            icon: "none",
            mask: true,
            duration: 1500,
          }).then((res) => {
            if (isFunction(closeCallback)) {
              setTimeout(() => {
                closeCallback(res);
              }, 500);
            }
          });
        }, 0);

        break;

      case notificationTypeCollection.warn:
        setTimeout(() => {
          Taro.showToast({
            title: messageText || "",
            icon: "none",
            mask: true,
            duration: 1500,
          }).then((res) => {
            if (isFunction(closeCallback)) {
              setTimeout(() => {
                closeCallback(res);
              }, 500);
            }
          });
        }, 0);

        break;

      default:
        setTimeout(() => {
          Taro.showToast({
            title: messageText || "",
            icon: "none",
            mask: true,
            duration: 1500,
          }).then((res) => {
            if (isFunction(closeCallback)) {
              setTimeout(() => {
                closeCallback(res);
              }, 500);
            }
          });
        }, 0);

        break;
    }
  }, 600);
}

export function checkFromConfig({ label, name, helper }) {
  let labelText = "object";
  let nameText = "object";
  let helperText = "object";

  if (isObject(label)) {
    const text = "label必须为文本";

    showRuntimeError({
      message: text,
    });

    recordObject(label);
  } else {
    labelText = label;
  }

  if (isObject(name)) {
    const text = "name必须为文本";

    showRuntimeError({
      message: text,
    });

    recordObject(name);
  } else {
    nameText = name;
  }

  if (isObject(helper)) {
    const text = "helper必须为文本";

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

const requestAnimFrameCustom = (() => {
  if (isBrowser()) {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      ((a) => {
        window.setTimeout(a, 1e3 / 60);
      })
    );
  }

  return () => {};
})();

export const requestAnimFrame = requestAnimFrameCustom;

/**
 * 依照某个键的值进行排序，请确保键的值为数字型
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
    const text = "无需排序!";

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
        const text = "已经排在首位!";

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
        const text = "已经排在末位!";

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
      const text = `不符合的操作，允许的操作为['${sortOperate.moveUp}','${sortOperate.moveDown}']!`;

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
 * 占位函数
 *
 * @export
 * @returns
 */
export function emptyExport() {
  return {};
}
