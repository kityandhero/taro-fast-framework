import '../classCallCheck.js';
import '../defineProperty.js';
import { _ as _objectSpread2 } from '../objectSpread2.js';
import './mediaDefault.js';
import { messageTypeCollection, logShowMode, logLevel, convertCollection, formatCollection, notificationTypeCollection, sortOperate, appInitDefault, datetimeFormat } from './constants.js';
import { replace as replace$1, trim as trim$1, split as split$1, sortedUniq, get, endsWith as endsWith$1, difference as difference$1, filter as filter$1, sortBy as sortBy$1, findIndex as findIndex$1, find as find$1, reverse as reverse$1, remove, toLower } from 'lodash';
import { isUndefined, isFunction, isString, isArray, isMoney, isNull, isEqualBySerialize, isObject } from './typeCheck.js';
import { toMoney, toDatetime, toNumber } from './typeConvert.js';
import Taro from '@tarojs/taro';
import Tips from './tips.js';
import { stringify, parse } from 'qs';

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var storageKeyCollection = {
  nearestLocalhostNotify: "nearestLocalhostNotify"
};
function getTaroGlobalData() {
  var app = Taro.getApp();

  if (isUndefined(app)) {
    return null;
  }

  return app.$app.taroGlobalData;
}
function redirectTo(url) {
  Taro.redirectTo({
    url: url
  });
}
function navigateTo(url) {
  Taro.navigateTo({
    url: url
  });
}
function getAppInitConfigData() {
  var appInitConfig = appInitDefault;
  var taroGlobalData = getTaroGlobalData();

  if (taroGlobalData) {
    if ((taroGlobalData.appInitCustomLocal || null) != null) {
      appInitConfig = _objectSpread2(_objectSpread2({}, appInitConfig), taroGlobalData.appInitCustomLocal);
    }

    if ((taroGlobalData.appInitCustomRemote || null) != null) {
      appInitConfig = _objectSpread2(_objectSpread2({}, appInitConfig), taroGlobalData.appInitCustomRemote);
    }
  }

  return appInitConfig;
}
function defaultBaseState() {
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
    externalData: null
  };
}
function defaultCoreState() {
  var data = _objectSpread2(_objectSpread2({}, defaultBaseState()), {
    dataLoading: true
  });

  return data;
}
function defaultCommonState() {
  var data = _objectSpread2(_objectSpread2({}, defaultCoreState()), {
    loadApiPath: "",
    pageName: "",
    metaData: null,
    metaExtra: null,
    metaListData: [],
    metaOriginalData: null
  });

  return data;
}
function defaultListState() {
  var data = _objectSpread2(_objectSpread2({}, defaultCommonState()), {
    dateRangeFieldName: "发生时间",
    tableScroll: {
      x: 1520
    },
    formValues: {},
    pageNo: 1,
    pageSize: 10,
    startTimeAlias: "",
    endTimeAlias: "",
    startTime: "",
    endTime: "",
    showSelect: false,
    selectedDataTableDataRows: []
  });

  return data;
}
function defaultPageListState() {
  var data = _objectSpread2(_objectSpread2({}, defaultCommonState()), {
    paramsKey: "",
    loadApiPath: "",
    dateRangeFieldName: "发生时间",
    tableScroll: {
      x: 1520
    },
    formValues: {},
    pageNo: 1,
    pageSize: 10,
    startTime: "",
    endTime: "",
    showSelect: false,
    selectedDataTableDataRows: []
  });

  return data;
}
function defaultFormState() {
  var data = _objectSpread2(_objectSpread2({}, defaultCommonState()), {
    errorFieldName: "",
    submitApiPath: ""
  });

  return data;
}
function getValue(obj) {
  return Object.keys(obj).map(function (key) {
    return obj[key];
  }).join(",");
}
/**
 * 复制到剪贴板
 * @param {*} text
 * @param {*} showText
 */

function copyToClipboard(_ref) {
  var text = _ref.text,
      _ref$successCallback = _ref.successCallback,
      successCallback = _ref$successCallback === void 0 ? null : _ref$successCallback;
  Taro.setClipboardData({
    data: text,
    success: function success(res) {
      successCallback(res);
    }
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

function replaceTargetText(text, replaceText, beforeKeepNumber, afterKeepNumber) {
  var result = toString(text);
  var textLength = (text || "").length;

  if (textLength > 0 && (beforeKeepNumber >= 0 || afterKeepNumber >= 0)) {
    if (beforeKeepNumber >= textLength || afterKeepNumber >= textLength || (beforeKeepNumber || 0) + (afterKeepNumber || 0) >= textLength) {
      result = text;
    } else {
      var beforeKeep = text.substr(0, beforeKeepNumber);
      var afterKeep = text.substr(textLength - afterKeepNumber, afterKeepNumber);
      result = beforeKeep + replaceText + afterKeep;
    }
  }

  return result || "";
}
function checkDevelopment() {
  return process.env.NODE_ENV === "development";
}
/**
 * corsTarget
 * 跨域域名配置
 * @export
 * @param {*} v
 * @returns
 */

function corsTarget() {
  var appInit = getAppInitConfigData();
  var corsTargetDomain = "";

  if (appInit.apiPrefix != null) {
    if (appInit.apiPrefix.corsTargetDomain != null) {
      var corsTargetDomainRemote = appInit.apiPrefix.corsTargetDomain;
      corsTargetDomain = corsTargetDomainRemote;
    }
  }

  return corsTargetDomain;
}
function showError(text) {
  showErrorMessage({
    message: text
  });
}
function showRuntimeError(_ref2) {
  var messageText = _ref2.message,
      _ref2$showStack = _ref2.showStack,
      showStack = _ref2$showStack === void 0 ? true : _ref2$showStack;

  try {
    if (!stringIsNullOrWhiteSpace(messageText || "")) {
      showErrorMessage({
        message: messageText
      });
    }

    if (showStack) {
      throw new Error("".concat(stringIsNullOrWhiteSpace(messageText || "") ? "" : "".concat(toString(messageText), ","), "\u8C03\u7528\u5806\u6808:"));
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.stack);
  }
}
function showSuccessMessage(_ref3) {
  var _ref3$duration = _ref3.duration,
      duration = _ref3$duration === void 0 ? 3 : _ref3$duration,
      messageText = _ref3.message,
      _ref3$onClose = _ref3.onClose,
      onClose = _ref3$onClose === void 0 ? function () {} : _ref3$onClose;
  showMessage({
    type: messageTypeCollection.success,
    message: messageText,
    duration: duration,
    onClose: onClose
  });
}
function showErrorMessage(_ref4) {
  var _ref4$duration = _ref4.duration,
      duration = _ref4$duration === void 0 ? 3 : _ref4$duration,
      messageText = _ref4.message,
      _ref4$onClose = _ref4.onClose,
      onClose = _ref4$onClose === void 0 ? function () {} : _ref4$onClose;
  showMessage({
    type: messageTypeCollection.error,
    message: messageText,
    duration: duration,
    onClose: onClose
  });
}
function showWarnMessage(_ref5) {
  var _ref5$duration = _ref5.duration,
      duration = _ref5$duration === void 0 ? 3 : _ref5$duration,
      messageText = _ref5.message,
      _ref5$onClose = _ref5.onClose,
      onClose = _ref5$onClose === void 0 ? function () {} : _ref5$onClose;
  showMessage({
    type: messageTypeCollection.warn,
    message: messageText,
    duration: duration,
    onClose: onClose
  });
}
/**
 * 显示警告信息框
 */

function showWarningMessage(_ref6) {
  var _ref6$duration = _ref6.duration,
      duration = _ref6$duration === void 0 ? 3 : _ref6$duration,
      messageText = _ref6.message,
      _ref6$onClose = _ref6.onClose,
      onClose = _ref6$onClose === void 0 ? function () {} : _ref6$onClose;
  showMessage({
    type: messageTypeCollection.warning,
    message: messageText,
    duration: duration,
    onClose: onClose
  });
}
/**
 * 显示消息信息
 */

function showInfoMessage(_ref7) {
  var _ref7$duration = _ref7.duration,
      duration = _ref7$duration === void 0 ? 3 : _ref7$duration,
      messageText = _ref7.message,
      _ref7$onClose = _ref7.onClose,
      onClose = _ref7$onClose === void 0 ? function () {} : _ref7$onClose;
  showMessage({
    type: messageTypeCollection.info,
    message: messageText,
    duration: duration,
    onClose: onClose
  });
}
function showLoadingMessage(_ref8) {
  var _ref8$duration = _ref8.duration,
      duration = _ref8$duration === void 0 ? 3 : _ref8$duration,
      messageText = _ref8.message,
      _ref8$onClose = _ref8.onClose,
      onClose = _ref8$onClose === void 0 ? function () {} : _ref8$onClose;
  showMessage({
    type: messageTypeCollection.loading,
    message: messageText,
    duration: duration,
    onClose: onClose
  });
}
function showOpenMessage(_ref9) {
  var _ref9$duration = _ref9.duration,
      duration = _ref9$duration === void 0 ? 3 : _ref9$duration,
      messageText = _ref9.message,
      _ref9$onClose = _ref9.onClose,
      onClose = _ref9$onClose === void 0 ? function () {} : _ref9$onClose;
  showMessage({
    type: messageTypeCollection.open,
    message: messageText,
    duration: duration,
    onClose: onClose
  });
}
function showMessage(_ref10) {
  var type = _ref10.type,
      _ref10$duration = _ref10.duration,
      duration = _ref10$duration === void 0 ? 1500 : _ref10$duration,
      messageText = _ref10.message,
      _ref10$onClose = _ref10.onClose,
      onClose = _ref10$onClose === void 0 ? function () {} : _ref10$onClose;
  requestAnimationFrame(function () {
    switch (type) {
      case messageTypeCollection.success:
        setTimeout(function () {
          Taro.showToast({
            title: messageText || "",
            icon: "none",
            mask: true,
            duration: duration
          }).then(function (res) {
            if (isFunction(onClose)) {
              setTimeout(function () {
                onClose(res);
              }, 500);
            }
          });
        }, 0);
        break;

      case messageTypeCollection.error:
        setTimeout(function () {
          Taro.showToast({
            title: messageText || "",
            icon: "none",
            mask: true,
            duration: duration
          }).then(function (res) {
            if (isFunction(onClose)) {
              setTimeout(function () {
                onClose(res);
              }, 500);
            }
          });
        }, 0);
        break;

      case messageTypeCollection.info:
        setTimeout(function () {
          Taro.showToast({
            title: messageText || "",
            icon: "none",
            mask: true,
            duration: duration
          }).then(function (res) {
            if (isFunction(onClose)) {
              setTimeout(function () {
                onClose(res);
              }, 500);
            }
          });
        }, 0);
        break;

      case messageTypeCollection.warning:
        setTimeout(function () {
          Taro.showToast({
            title: messageText || "",
            icon: "none",
            mask: true,
            duration: duration
          }).then(function (res) {
            if (isFunction(onClose)) {
              setTimeout(function () {
                onClose(res);
              }, 500);
            }
          });
        }, 0);
        break;

      case messageTypeCollection.warn:
        setTimeout(function () {
          Taro.showToast({
            title: messageText || "",
            icon: "none",
            mask: true,
            duration: duration
          }).then(function (res) {
            if (isFunction(onClose)) {
              setTimeout(function () {
                onClose(res);
              }, 500);
            }
          });
        }, 0);
        break;

      case messageTypeCollection.loading:
        setTimeout(function () {
          Taro.showToast({
            title: messageText || "",
            icon: "none",
            mask: true,
            duration: duration
          }).then(function (res) {
            if (isFunction(onClose)) {
              setTimeout(function () {
                onClose(res);
              }, 500);
            }
          });
        }, 0);
        break;

      default:
        setTimeout(function () {
          Taro.showToast({
            title: messageText || "",
            icon: "none",
            mask: true,
            duration: duration
          }).then(function (res) {
            if (isFunction(onClose)) {
              setTimeout(function () {
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

function recordLog(record, showMode) {
  var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : logLevel.debug;
  var showModeModified = (showMode || null) == null || stringIsNullOrWhiteSpace(showMode) ? logShowMode.unknown : showMode;

  if (!inCollection([logShowMode.unknown, logShowMode.text, logShowMode.object], showModeModified)) {
    throw new Error("\u65E0\u6548\u7684\u65E5\u5FD7\u663E\u793A\u6A21\u5F0F:".concat(showModeModified));
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
      var data = {
        level: level,
        record: record
      }; // eslint-disable-next-line no-console

      console.log(JSON.stringify(data));
    }

    if (showModeModified === logShowMode.object) {
      // eslint-disable-next-line no-console
      console.log({
        level: level,
        record: record
      });
    }
  }

  if (level === logLevel.error) {
    if (showModeModified === logShowMode.text) {
      var _data = {
        level: level,
        record: record
      }; // eslint-disable-next-line no-console

      console.log(JSON.stringify(_data));
    }

    if (showModeModified === logShowMode.object) {
      // eslint-disable-next-line no-console
      console.log({
        level: level,
        record: record
      });
    }
  }
}
/**
 * 记录错误信息
 */

function recordError(record) {
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

function recordText(record) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : logLevel.debug;
  recordLog(record, logShowMode.text, level);
}
/**
 * 记录日志
 *
 * @export
 * @param {*} str
 * @returns
 */

function recordObject(record) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : logLevel.debug;
  recordLog(record, logShowMode.object, level);
}

function logShowInConsole() {
  var appInit = getAppInitConfigData();
  var result = !!(appInit.showLogInConsole || false);
  return result;
}
/**
 * 获取Guid
 *
 * @export
 * @param {*} v
 * @returns
 */


function getGuid() {
  function S4() {
    return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
  }

  return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
}
/**
 * 检测目标是否在数组址之中
 */

function inCollection(collection, value) {
  var result = false;

  if (!isArray(collection)) {
    return result;
  }

  collection.some(function (o) {
    if (o === value) {
      result = true;
      return true;
    }

    return false;
  });
  return result;
}
function split(source, separator) {
  var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;
  return split$1(source, separator, limit);
}
/**
 * 去除重复数据并排序（升序）
 */

function sortedUnique(array) {
  return sortedUniq(array);
}
/**
 *
 *@param  val 值 len保留小数位数
 *
 */

function roundToTarget(v, len) {
  if (!isMoney(v)) {
    return 0;
  }

  var temp = Math.pow(10, len);
  return Math.round(toMoney(v) * temp) / temp;
}
/**
 * 通过 key 获取对应得值
 */

function getValueByKey(_ref11) {
  var data = _ref11.data,
      key = _ref11.key,
      _ref11$defaultValue = _ref11.defaultValue,
      defaultValue = _ref11$defaultValue === void 0 ? null : _ref11$defaultValue,
      _ref11$convert = _ref11.convert,
      convert = _ref11$convert === void 0 ? null : _ref11$convert,
      _ref11$convertBuilder = _ref11.convertBuilder,
      convertBuilder = _ref11$convertBuilder === void 0 ? null : _ref11$convertBuilder,
      _ref11$format = _ref11.format,
      format = _ref11$format === void 0 ? null : _ref11$format,
      _ref11$formatBuilder = _ref11.formatBuilder,
      formatBuilder = _ref11$formatBuilder === void 0 ? null : _ref11$formatBuilder;
  var v = getPathValue(data, key, defaultValue);
  var result = v;

  if ((convertBuilder || null) != null || (convert || null) != null) {
    if (isFunction(convertBuilder)) {
      result = convertTarget({
        target: v,
        convert: convertBuilder
      });
    } else {
      result = convertTarget({
        target: v,
        convert: convert
      });
    }
  }

  if ((formatBuilder || null) != null || (format || null) != null) {
    if (isFunction(formatBuilder)) {
      result = formatTarget({
        target: result,
        format: formatBuilder
      });
    } else {
      result = formatTarget({
        target: result,
        format: format
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

function convertTarget(_ref12) {
  var target = _ref12.target,
      convert = _ref12.convert;

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
        return (target || null) == null ? [] : isArray(target) ? target : [target];

      default:
        return target;
    }
  }

  return target;
}
function formatDatetime(_ref13) {
  var date = _ref13.data,
      _ref13$fmt = _ref13.fmt,
      fmt = _ref13$fmt === void 0 ? datetimeFormat.yearMonthDayHourMinuteSecond : _ref13$fmt;

  if ((date || null) == null) {
    return "";
  }

  var o = {
    "M+": date.getMonth() + 1,
    //月份
    "d+": date.getDate(),
    //日
    "h+": date.getHours(),
    //小时
    "m+": date.getMinutes(),
    //分
    "s+": date.getSeconds(),
    //秒
    "q+": Math.floor((date.getMonth() + 3) / 3),
    //季度
    S: date.getMilliseconds() //毫秒

  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }

  return fmt;
}
function formatTarget(_ref14) {
  var target = _ref14.target,
      format = _ref14.format,
      _ref14$option = _ref14.option,
      option = _ref14$option === void 0 ? {} : _ref14$option;

  if (isFunction(format)) {
    return format(target);
  }

  if (isString(format)) {
    switch (format) {
      case formatCollection.money:
        return formatMoney(target);

      case formatCollection.datetime:
        return formatDatetime({
          data: target
        });

      case formatCollection.chineseMoney:
        return formatMoneyToChinese({
          target: target,
          option: option
        });

      case formatCollection.percentage:
        return "".concat(roundToTarget(target * 100, 1), "%");

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

function calculateTimeInterval(startTime, endTime) {
  var timeBegin = startTime.getTime();
  var timeEnd = endTime.getTime();
  var total = (timeEnd - timeBegin) / 1000;
  var day = parseInt(total / (24 * 60 * 60)); //计算整数天数

  var afterDay = total - day * 24 * 60 * 60; //取得算出天数后剩余的秒数

  var hour = parseInt(afterDay / (60 * 60)); //计算整数小时数

  var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60; //取得算出小时数后剩余的秒数

  var min = parseInt(afterHour / 60); //计算整数分

  var afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60; //取得算出分后剩余的秒数

  return {
    day: day,
    hour: hour,
    minute: min,
    second: afterMin
  };
}
/**
 * 通过 path 获取对应得值
 */

function getPathValue(o, path) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (isUndefined(o)) {
    return  defaultValue;
  }

  if (o == null) {
    return  defaultValue;
  }

  if (!isString(path)) {
    var text = "getPathValue Function param path must be string";
    showRuntimeError({
      message: text
    });
    return null;
  }

  var v = get(o, path, defaultValue);

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

function formatDecimal(numberSource) {
  return formatMoney(numberSource);
}
/**
 * 格式化货币
 *
 * @export
 * @param {*} str
 * @returns
 */

function formatMoney(_ref15) {
  var numberSource = _ref15.number,
      _ref15$places = _ref15.places,
      placesSource = _ref15$places === void 0 ? 2 : _ref15$places,
      _ref15$symbol = _ref15.symbol,
      symbolSource = _ref15$symbol === void 0 ? "¥" : _ref15$symbol,
      _ref15$thousand = _ref15.thousand,
      thousandSource = _ref15$thousand === void 0 ? "," : _ref15$thousand,
      _ref15$decimal = _ref15.decimal,
      decimalSource = _ref15$decimal === void 0 ? "." : _ref15$decimal;
  var number = numberSource || 0; //保留的小位数 可以写成 formatMoney(542986,3) 后面的是保留的小位数，否则默 认保留两位
  // eslint-disable-next-line no-restricted-globals

  var places = !isNaN(placesSource = Math.abs(placesSource)) ? placesSource : 2; //symbol表示前面表示的标志是￥ 可以写成 formatMoney(542986,2,"$")

  var symbol = symbolSource !== undefined ? symbolSource : "￥"; //thousand表示每几位用,隔开,是货币标识

  var thousand = thousandSource || ","; //decimal表示小数点

  var decimal = decimalSource || "."; //negative表示如果钱是负数有就显示“-”如果不是负数 就不显示负号
  //i表示处理过的纯数字

  var negative = number < 0 ? "-" : "";
  var i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "";
  var j = i.length;
  j = j > 3 ? j % 3 : 0;
  return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, symbolSource + "1" + thousand) + ( // 第一种方案
  // i.substr(j).replace(/(\d{3})(?=\d)/g, "$" + "1" + thousand) +
  // 第二种方案
  // i.substr(j).replace(/(?=(\B\d{3})+$)/g, thousand) +
  places ? decimal + Math.abs(number - toNumber(i)).toFixed(places).slice(2) : "");
}
/**
 * 检查字符串string是否以给定的target字符串结尾
 */

function endsWith(source, target, position) {
  return endsWith$1(source, target, position);
}
/**
 * 如果字符串末尾匹配目标字符串，则从源字符串末尾移除匹配项
 */

function removeEndMatch(source, target) {
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

  var lastIndex = source.lastIndexOf(target);

  if (lastIndex >= 0 && source.length === lastIndex + target.length) {
    return source.substr(lastIndex, target.length);
  }

  return source;
}
/**
 * 从源字符串移除最后一个匹配项
 */

function removeLastMatch(source, target) {
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

  var lastIndex = source.lastIndexOf(target);

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

function formatMoneyToChinese(_ref16) {
  var target = _ref16.target;
  var money = target;
  var cnNumber = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"]; // 汉字的数字

  var cnIntBasic = ["", "拾", "佰", "仟"]; // 基本单位

  var cnIntUnits = ["", "万", "亿", "兆"]; // 对应整数部分扩展单位

  var cnDecUnits = ["角", "分", "毫", "厘"]; // 对应小数部分单位
  // var cnInteger = "整"; // 整数金额时后面跟的字符

  var cnIntLast = "元"; // 整型完以后的单位

  var maxNum = 999999999999999.9999; // 最大处理的数字

  var IntegerNum; // 金额整数部分

  var DecimalNum; // 金额小数部分

  var ChineseString = ""; // 输出的中文金额字符串

  var parts; // 分离金额后用的数组，预定义

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
    var _parts = parts;

    var _parts2 = _slicedToArray(_parts, 2);

    IntegerNum = _parts2[0];
    DecimalNum = _parts2[1];
    DecimalNum = parts[1].substr(0, 4);
  }

  if (parseInt(IntegerNum, 10) > 0) {
    // 获取整型部分转换
    var zeroCount = 0;
    var IntLen = IntegerNum.length;

    for (var i = 0; i < IntLen; i += 1) {
      var n = IntegerNum.substr(i, 1);
      var p = IntLen - i - 1;
      var q = p / 4;
      var m = p % 4;

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

    ChineseString += cnIntLast; // 整型部分处理完毕
  }

  if (DecimalNum !== "") {
    // 小数部分
    var decLen = DecimalNum.length;

    for (var _i = 0; _i < decLen; _i += 1) {
      var _n = DecimalNum.substr(_i, 1);

      if (_n !== "0") {
        ChineseString += cnNumber[Number(_n)] + cnDecUnits[_i];
      }
    }
  }

  if (ChineseString === "") {
    ChineseString += cnNumber[0] + cnIntLast;
  }

  return ChineseString;
}
function seededRandom(_ref17) {
  var seed = _ref17.seed,
      min = _ref17.min,
      max = _ref17.max;
  var maxValue = max || 1;
  var minValue = min || 0;
  var seedValue = (seed * 9301 + 49297) % 233280;
  var rnd = seedValue / 233280.0;
  return minValue + rnd * (maxValue - minValue);
}
/**
 * 通过种子等配置返回随机颜色值
 *
 * @export
 * @param {*} seed
 * @returns
 */

function getRandomColor(_ref18) {
  var seed = _ref18.seed;
  return "#".concat("00000".concat((seededRandom(seed) * 0x1000000 << 0).toString(16)).substr(-6));
}

function getBrowserInfoCore() {
  var getBrowserVersion = function getBrowserVersion() {
    var u = navigator.userAgent;
    return {
      // 移动终端浏览器版本信息
      trident: u.indexOf("Trident") > -1,
      // IE内核
      presto: u.indexOf("Presto") > -1,
      // opera内核
      webKit: u.indexOf("AppleWebKit") > -1,
      // 苹果、谷歌内核
      gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") === -1,
      // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/),
      // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      // ios终端
      android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1,
      // android 终端或uc浏览器
      iPhone: u.indexOf("iPhone") > -1,
      // 是否为 iPhone 或者 QQHD 浏览器
      iPad: u.indexOf("iPad") > -1,
      // 是否iPad
      webApp: u.indexOf("Safari") === -1 // 是否web应该程序，没有头部与底部

    };
  };

  return {
    versions: getBrowserVersion(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  };
}
/**
 * 获取浏览器信息
 *
 * @export
 * @returns
 */


function getBrowserInfo() {
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

function refitFieldDecoratorOption(v, justice, defaultValue, originalOption, convertCallback) {
  var result = originalOption;
  var justiceV = typeof justice !== "undefined" && justice !== null;
  var defaultV = typeof defaultValue === "undefined" ? null : defaultValue;

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

function refitCommonData(listData, empty, otherListData) {
  var result = [];

  if (typeof listData !== "undefined") {
    if (listData !== null) {
      result = _toConsumableArray(listData);
    }
  }

  if (typeof otherListData !== "undefined") {
    if (otherListData !== null) {
      result = [].concat(_toConsumableArray(result), _toConsumableArray(otherListData));
    }
  }

  if (typeof empty !== "undefined") {
    if (empty !== null) {
      result = [empty].concat(_toConsumableArray(result));
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

function evil(fn) {
  // 一个变量指向Function，防止有些前端编译工具报错
  var Fn = Function;
  return new Fn("return ".concat(fn))();
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

function searchFromList(itemKey, itemValue, sourceData) {
  var d = sourceData || [];
  var result = null;

  if (itemValue == null) {
    return result;
  }

  d.forEach(function (o) {
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

function buildFieldDescription(v, op, other) {
  var o = (other || "") === "" ? "" : ",".concat(other);
  return "\u8BF7".concat(op || "输入").concat(v).concat(o);
}
/**
 * 获取LocalStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */

function getStringFromLocalStorage(key) {
  var result = Taro.getStorageSync(key);
  return result;
}
/**
 * 获取LocalStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */

function getJsonFromLocalStorage(key) {
  var jsonString = getStringFromLocalStorage(key);

  if (!stringIsNullOrWhiteSpace(jsonString)) {
    return JSON.parse(jsonString || "{}");
  }

  return null;
}
/**
 * 存储本地数据
 * @export
 * @param {*} key
 * @param {*} value
 */

function saveStringToLocalStorage(key, value) {
  Taro.setStorageSync(key, value);
}
/**
 * 存储本地数据
 * @export
 * @param {*} key
 * @param {*} value
 */

function saveJsonToLocalStorage(key, json) {
  Taro.setStorageSync(key, JSON.stringify(json || {}));
}
/**
 * 移除LocalStorage数据
 * @export
 * @param {*} key
 */

function removeLocalStorage(key) {
  Taro.removeStorageSync(key);
}
/**
 * 清空LocalStorage数据
 * @export
 * @param {*} key
 */

function clearLocalStorage() {
  Taro.clearStorage();
}
/**
 * Reacts生命周期getDerivedStateFromProps 辅助函数用于将url参数解析到返回值中用于设定state，
 * @export
 */

function getDerivedStateFromPropsForUrlParamsCore(nextProps) {
  var match = nextProps.match;

  if ((match || null) != null) {
    var params = match.params;

    if ((params || null) != null) {
      return {
        urlParams: params
      };
    }
  }

  return null;
}
/**
 * Reacts生命周期getDerivedStateFromProps 辅助函数用于将url参数解析到返回值中用于设定state,如果值重复，则返回null，
 * @export
 */

function getDerivedStateFromPropsForUrlParams(nextProps, prevState) {
  var defaultUrlParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    id: ""
  };
  var parseUrlParamsForSetState = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var stateUrlParams = getDerivedStateFromPropsForUrlParamsCore(nextProps);
  stateUrlParams = stateUrlParams || {
    urlParams: defaultUrlParams
  };
  var urlParamsPrev = prevState.urlParams;
  var _stateUrlParams = stateUrlParams,
      urlParams = _stateUrlParams.urlParams;

  if (isEqualBySerialize(_objectSpread2(_objectSpread2({}, urlParamsPrev || {}), {}), _objectSpread2(_objectSpread2({}, urlParams || {}), {}))) {
    return prevState;
  }

  if (isFunction(parseUrlParamsForSetState)) {
    var data = parseUrlParamsForSetState(stateUrlParams);
    return _objectSpread2(_objectSpread2(_objectSpread2({}, prevState), stateUrlParams), data);
  }

  return _objectSpread2(_objectSpread2({}, prevState), stateUrlParams);
}
function cloneWithoutMethod(value) {
  if (value == null) {
    return null;
  }

  return JSON.parse(JSON.stringify(value));
}
function difference(array, values) {
  return difference$1(array, values);
}
/**
 * 筛选需要的集合
 * @param {collection} 可筛选的对象，例如数组
 * @param {predicateFunction} 每次迭代调用的筛选函数
 */

function filter(collection, predicateFunction) {
  return filter$1(collection, predicateFunction);
}
/**
 * 创建一个元素数组。 以 iteratee 处理的结果升序排序。 这个方法执行稳定排序，也就是说相同元素会保持原始排序。 iteratees 调用1个参数:  (value)。
 * @param {collection}  (Array|Object), 用来迭代的集合。
 * @param {predicateFunction} 这个函数决定排序
 */

function sortBy(collection, predicateFunction) {
  return sortBy$1(collection, predicateFunction);
}
/**
 * 该方法返回第一个通过 predicateFunction 判断为真值的元素的索引值（index），而不是元素本身。
 * @param {array} (Array): 要搜索的数组。
 * @param {predicateFunction} 这个函数会在每一次迭代调用
 * @param {fromIndex} (number): The index to search from.
 */

function findIndex(array, predicateFunction) {
  var fromIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return findIndex$1(array, predicateFunction, fromIndex);
}
/**
 * 该方法返回第一个通过 predicateFunction 判断为真值的元素的索引值（index），而不是元素本身,返回匹配元素，否则返回 undefined。。
 * @param {array} (Array): 要搜索的数组。
 * @param {predicateFunction} 这个函数会在每一次迭代调用
 * @param {fromIndex} (number): The index to search from.
 */

function find(array, predicateFunction) {
  var fromIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return find$1(array, predicateFunction, fromIndex);
}
function checkExist(array, predicateFunction) {
  var fromIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var result = find(array, predicateFunction, fromIndex);
  return !isUndefined(result);
}
function reverse(array) {
  return reverse$1(array);
}
function trim(source) {
  return trim$1(source);
}
function replace(source, pattern, replacement) {
  return replace$1(source, pattern, replacement);
}
/**
 * 移除数组中predicate（断言）返回为真值的所有元素，并返回移除元素组成的数组。predicate（断言） 会传入3个参数:  (value, index, array)。
 * @param {*} array
 * @param {*} predicate (Array|Function|Object|string): 每次迭代调用的函数
 */

function removeFromArray(array, predicate) {
  return remove(array, predicate);
}
function stringIsNullOrWhiteSpace(value) {
  return trim(replace(value || "", " ", "")) === "";
}
/**
 * base64解码
 */

function decodeBase64(target) {
  var commonContent = (target || "").replace(/\s/g, "+");
  commonContent = Buffer.from(commonContent, "base64").toString();
  return commonContent;
}
/**
 * base64编码
 */

function encodeBase64(target) {
  var base64Content = Buffer.from(target).toString("base64");
  return base64Content;
}
function fixedZero(val) {
  return val * 1 < 10 ? "0".concat(val) : val;
}
/**
 * 构建描述文本
 * @param {*} v
 * @param {*} op
 * @param {*} other
 */

function buildFieldHelper(v) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "注: ";
  return "".concat(prefix).concat(v, "\u3002");
}
function checkLocalhost() {
  var hostname = toLower(window.location.hostname);
  return hostname === "127.0.0.1" || hostname === "localhost";
}
function getNearestLocalhostNotifyCache() {
  var key = storageKeyCollection.nearestLocalhostNotify;
  var d = getJsonFromLocalStorage(key);

  if ((d || null) == null) {
    return null;
  }

  if ((d.nearestTime || null) == null) {
    return null;
  }

  return d || null;
}
function setNearestLocalhostNotifyCache() {
  var key = storageKeyCollection.nearestLocalhostNotify;
  var now = parseInt(new Date().getTime() / 1000, 10);
  var d = {
    nearestTime: now
  };
  return saveJsonToLocalStorage(key, d);
}
function removeNearestLocalhostNotifyCache() {
  var key = storageKeyCollection.nearestLocalhostNotify;
  removeLocalStorage(key);
}
/**
 * 尝试发送最近一次本地调用通知（一般用于开发阶段，提示调用的接口域）
 */

function trySendNearestLocalhostNotify(_ref19) {
  var text = _ref19.text;
  var needSend = false;
  var nearestTime = 0;

  if (checkLocalhost()) {
    var nearestLocalhostNotify = getNearestLocalhostNotifyCache() || null;

    if (nearestLocalhostNotify == null) {
      needSend = true;
    } else {
      nearestTime = nearestLocalhostNotify.nearestTime || 0;
    }

    var now = parseInt(new Date().getTime() / 1000, 10);

    try {
      if (nearestTime + 30 < now) {
        needSend = true;
      }

      if (needSend) {
        notify({
          type: notificationTypeCollection.info,
          message: "\u5F53\u524D\u63A5\u53E3\u57DF\u540D: ".concat(text, "\u3002")
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

function ellipsis(value, length) {
  var symbol = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "...";

  if (value && value.length > length) {
    return "".concat(toString(value).substr(0, length)).concat(symbol);
  }

  return toString(value);
}
function notifySuccess(text) {
  notify({
    type: notificationTypeCollection.success,
    message: text
  });
}
/**
 * 发送页面通知
 */

function notify(_ref20) {
  var _ref20$type = _ref20.type,
      type = _ref20$type === void 0 ? notificationTypeCollection.info : _ref20$type,
      messageValue = _ref20.message,
      _ref20$closeCallback = _ref20.closeCallback,
      closeCallback = _ref20$closeCallback === void 0 ? null : _ref20$closeCallback;

  var _message$message = _objectSpread2(_objectSpread2({}, {
    message: "操作结果"
  }), {
    message: messageValue
  }),
      messageText = _message$message.message;

  setTimeout(function () {
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
function checkFromConfig(_ref21) {
  var label = _ref21.label,
      name = _ref21.name,
      helper = _ref21.helper;
  var labelText = "object";
  var nameText = "object";
  var helperText = "object";

  if (isObject(label)) {
    var text = "label必须为文本";
    showRuntimeError({
      message: text
    });
    recordObject(label);
  } else {
    labelText = label;
  }

  if (isObject(name)) {
    var _text = "name必须为文本";
    showRuntimeError({
      message: _text
    });
    recordObject(name);
  } else {
    nameText = name;
  }

  if (isObject(helper)) {
    var _text2 = "helper必须为文本";
    showRuntimeError({
      message: _text2
    });
    recordObject(helper);
  } else {
    helperText = helper;
  }

  return {
    label: labelText,
    name: nameText,
    helper: helperText
  };
}
/**
 * 依照某个键的值进行排序，请确保键的值为数字型
 */

function sortCollectionByKey(_ref22) {
  var operate = _ref22.operate,
      item = _ref22.item,
      list = _ref22.list,
      sortKey = _ref22.sortKey,
      _ref22$sortMin = _ref22.sortMin,
      sortMin = _ref22$sortMin === void 0 ? 0 : _ref22$sortMin;

  if ((item || null) == null) {
    return list;
  }

  var beforeList = [];
  var afterList = [];
  var result = [];

  if ((list || []).length <= 1) {
    var text = "无需排序!";
    showWarnMessage({
      message: text
    });
    return list;
  }

  var itemSort = getValueByKey({
    data: item,
    key: sortKey,
    convert: convertCollection.number
  });
  (list || []).forEach(function (o) {
    var sort = getValueByKey({
      data: o,
      key: sortKey,
      convert: convertCollection.number
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
        var _text4 = "已经排在首位!";
        showWarnMessage({
          message: _text4
        });
        return list;
      }

      (beforeList || []).forEach(function (o, index) {
        if (index < beforeList.length - 1) {
          result.push(o);
        } else {
          var o1 = item;
          o1[sortKey] -= 1;
          result.push(o1);
          var o2 = o;
          o2[sortKey] += 1;
          result.push(o2);
        }
      });
      result = result.concat(afterList);
      break;

    case sortOperate.moveDown:
      if (itemSort === (list || []).length + sortMin - 1) {
        var _text5 = "已经排在末位!";
        showWarnMessage({
          message: _text5
        });
        return list;
      }

      result = result.concat(beforeList);
      (afterList || []).forEach(function (o, index) {
        if (index === 0) {
          var o2 = o;
          o2[sortKey] -= 1;
          result.push(o2);
          var o1 = item;
          o1[sortKey] += 1;
          result.push(o1);
        } else {
          result.push(o);
        }
      });
      break;

    default:
      var _text3 = "\u4E0D\u7B26\u5408\u7684\u64CD\u4F5C\uFF0C\u5141\u8BB8\u7684\u64CD\u4F5C\u4E3A['".concat(sortOperate.moveUp, "','").concat(sortOperate.moveDown, "']!");

      showWarnMessage({
        message: _text3
      });
      break;
  }

  return result;
}
function queryStringify(data) {
  return stringify(data);
}
function queryStringParse(data) {
  return parse(data);
}
/**
 * 同步线程挂起若干时间(毫秒)
 * @param  n
 */

function sleep(n, callback) {
  var start = new Date().getTime();

  while (true) {
    if (new Date().getTime() - start > n) {
      break;
    }
  }

  if (isFunction(callback)) {
    callback();
  }
}
function getSystemInfo() {
  if (Taro.globalSystemInfo && !Taro.globalSystemInfo.ios) {
    return Taro.globalSystemInfo;
  } else {
    // h5环境下忽略navbar
    if (!isFunction(Taro.getSystemInfoSync)) {
      return null;
    }

    var systemInfo = Taro.getSystemInfoSync() || {
      model: "",
      system: ""
    };
    var ios = !!(systemInfo.system.toLowerCase().search("ios") + 1);
    var rect;

    try {
      rect = Taro.getMenuButtonBoundingClientRect ? Taro.getMenuButtonBoundingClientRect() : null;

      if (rect === null) {
        throw "getMenuButtonBoundingClientRect error";
      } //取值为0的情况  有可能width不为0 top为0的情况


      if (!rect.width || !rect.top || !rect.left || !rect.height) {
        throw "getMenuButtonBoundingClientRect error";
      }
    } catch (error) {
      var gap = ""; //胶囊按钮上下间距 使导航内容居中

      var width = 96; //胶囊的宽度

      if (systemInfo.platform === "android") {
        gap = 8;
        width = 96;
      } else if (systemInfo.platform === "devtools") {
        if (ios) {
          gap = 5.5; //开发工具中ios手机
        } else {
          gap = 7.5; //开发工具中android和其他手机
        }
      } else {
        gap = 4;
        width = 88;
      }

      if (!systemInfo.statusBarHeight) {
        //开启wifi的情况下修复statusBarHeight值获取不到
        systemInfo.statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20;
      }

      rect = {
        //获取不到胶囊信息就自定义重置一个
        bottom: systemInfo.statusBarHeight + gap + 32,
        height: 32,
        left: systemInfo.windowWidth - width - 10,
        right: systemInfo.windowWidth - 10,
        top: systemInfo.statusBarHeight + gap,
        width: width
      };
      console.log("error", error);
      console.log("rect", rect);
    }

    var navBarHeight = "";

    if (!systemInfo.statusBarHeight) {
      //开启wifi和打电话下
      systemInfo.statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20;

      navBarHeight = function () {
        var gap = rect.top - systemInfo.statusBarHeight;
        return 2 * gap + rect.height;
      }();

      systemInfo.statusBarHeight = 0;
      systemInfo.navBarExtendHeight = 0; //下方扩展4像素高度 防止下方边距太小
    } else {
      navBarHeight = function () {
        var gap = rect.top - systemInfo.statusBarHeight;
        return systemInfo.statusBarHeight + 2 * gap + rect.height;
      }();

      if (ios) {
        systemInfo.navBarExtendHeight = 4; //下方扩展4像素高度 防止下方边距太小
      } else {
        systemInfo.navBarExtendHeight = 0;
      }
    }

    systemInfo.navBarHeight = navBarHeight; //导航栏高度不包括statusBarHeight

    systemInfo.capsulePosition = rect; //右上角胶囊按钮信息bottom: 58 height: 32 left: 317 right: 404 top: 26 width: 87 目前发现在大多机型都是固定值 为防止不一样所以会使用动态值来计算nav元素大小

    systemInfo.ios = ios; //是否ios

    Taro.globalSystemInfo = systemInfo; //将信息保存到全局变量中,后边再用就不用重新异步获取了
    //console.log('systemInfo', systemInfo);

    return systemInfo;
  }
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

export { buildFieldDescription, buildFieldHelper, calculateTimeInterval, checkDevelopment, checkExist, checkFromConfig, checkLocalhost, clearLocalStorage, cloneWithoutMethod, convertTarget, copyToClipboard, corsTarget, decodeBase64, defaultBaseState, defaultCommonState, defaultCoreState, defaultFormState, defaultListState, defaultPageListState, difference, ellipsis, emptyExport, encodeBase64, endsWith, evil, filter, find, findIndex, fixedZero, formatDatetime, formatDecimal, formatMoney, formatMoneyToChinese, formatTarget, getAppInitConfigData, getBrowserInfo, getDerivedStateFromPropsForUrlParams, getDerivedStateFromPropsForUrlParamsCore, getGuid, getJsonFromLocalStorage, getNearestLocalhostNotifyCache, getPathValue, getRandomColor, getStringFromLocalStorage, getSystemInfo, getTaroGlobalData, getValue, getValueByKey, inCollection, navigateTo, notify, notifySuccess, queryStringParse, queryStringify, recordError, recordLog, recordObject, recordText, redirectTo, refitCommonData, refitFieldDecoratorOption, removeEndMatch, removeFromArray, removeLastMatch, removeLocalStorage, removeNearestLocalhostNotifyCache, replace, replaceTargetText, reverse, roundToTarget, saveJsonToLocalStorage, saveStringToLocalStorage, searchFromList, seededRandom, setNearestLocalhostNotifyCache, showError, showErrorMessage, showInfoMessage, showLoadingMessage, showMessage, showOpenMessage, showRuntimeError, showSuccessMessage, showWarnMessage, showWarningMessage, sleep, sortBy, sortCollectionByKey, sortedUnique, split, stringIsNullOrWhiteSpace, trim, trySendNearestLocalhostNotify };
