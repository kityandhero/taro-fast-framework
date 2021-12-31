import '../classCallCheck.js';
import '../_commonjsHelpers.js';
import '../defineProperty.js';
import { _ as _objectSpread2 } from '../objectSpread2.js';
import './mediaDefault.js';
import './constants.js';
import 'lodash';
import { isFunction, isUndefined, isString, isObject } from './typeCheck.js';
import './typeConvert.js';
import '@tarojs/taro';
import './tips.js';
import { redirectTo, stringIsNullOrWhiteSpace, recordObject, corsTarget, getTaroGlobalData, showErrorMessage, queryStringify, showInfoMessage } from './tools.js';
import 'qs';
import 'node-cache';
import './cacheAssist.js';
import { getToken } from './globalStorageAssist.js';
import { defaultSettingsLayoutCustom } from './defaultSettingsSpecial.js';
import remoteRequest from './request.js';
import { _ as _asyncToGenerator, g as _regeneratorRuntime, e as apiVirtualAccess, a as apiVirtualFailData, b as apiVirtualSuccessData } from '../virtualRequest.js';

/**
 * 错误数据模型
 */

function errorCustomData() {
  return {
    code: -1,
    message: "",
    data: null,
    list: [],
    extra: null
  };
}
/**
 * 数据异常通知
 * @param {*} d 异常数据
 */


function dataExceptionNotice(d) {
  var code = d.code,
      messageText = d.message;
  var c = errorCustomData();
  var taroGlobalData = getTaroGlobalData();
  var lastCustomMessage = taroGlobalData.lastCustomMessage || {
    code: -1,
    message: "",
    time: new Date().getTime()
  };

  if (code !== c.code) {
    if ((messageText || "") !== "") {
      var currentTime = new Date().getTime();

      if (code === lastCustomMessage.code) {
        if (currentTime - lastCustomMessage.time > 800) {
          showErrorMessage({
            message: messageText
          });
          taroGlobalData.lastCustomMessage = {
            code: code,
            message: messageText,
            time: currentTime
          };
        }
      } else {
        showErrorMessage({
          message: messageText
        });
        taroGlobalData.lastCustomMessage = {
          code: code,
          message: messageText,
          time: currentTime
        };
      }
    }

    var loginPath = defaultSettingsLayoutCustom.getLoginPath();
    var authenticationFailCode = defaultSettingsLayoutCustom.getAuthenticationFailCode();

    if (code === authenticationFailCode) {
      if (stringIsNullOrWhiteSpace(loginPath)) {
        throw new Error("缺少登录页面路径配置");
      }

      redirectTo(loginPath);
    }
  }
}
/**
 * 预处理单项数据返回
 *
 * @export
 * @param {*} d
 * @returns
 */


function pretreatmentRemoteSingleData(d) {
  var _ref = d || errorCustomData(),
      code = _ref.code,
      messageText = _ref.message;

  var v = {};
  var apiSuccessCode = defaultSettingsLayoutCustom.getApiSuccessCode();

  if (code === apiSuccessCode) {
    var data = d.data,
        extra = d.extra;
    v = {
      code: code,
      message: messageText,
      data: data || {},
      extra: extra || {},
      dataSuccess: true
    };
  } else {
    v = {
      code: code,
      message: messageText || "网络异常",
      data: null,
      extra: null,
      dataSuccess: false
    };
    dataExceptionNotice(v);
  }

  return v;
}
/**
 * 预处理集合数据返回
 *
 * @export
 * @param {*} d
 * @returns
 */

function pretreatmentRemoteListData(d, itemHandler) {
  var _ref2 = d || errorCustomData(),
      code = _ref2.code,
      messageText = _ref2.message;

  var v = {};

  if (code === defaultSettingsLayoutCustom.getApiSuccessCode()) {
    var listData = d.list,
        extraData = d.extra;
    var list = (listData || []).map(function (item, index) {
      var o = item;

      if ((o.key || null) == null) {
        o.key = "list-".concat(index);
      }

      if (typeof itemHandler === "function") {
        o = itemHandler(o);
      }

      return o;
    });
    v = {
      code: code,
      message: messageText,
      count: (list || []).length,
      list: list,
      extra: extraData,
      dataSuccess: true
    };
  } else {
    v = {
      code: code,
      message: messageText || "网络异常",
      count: 0,
      list: [],
      extra: null,
      dataSuccess: false
    };
    dataExceptionNotice(v);
  }

  return v;
}
/**
 * 预处理分页数据返回
 *
 * @export
 * @param {*} d
 * @returns
 */

function pretreatmentRemotePageListData(d, listItemHandler) {
  var _ref3 = d || errorCustomData(),
      code = _ref3.code,
      messageText = _ref3.message;

  var v = {};

  if (code === defaultSettingsLayoutCustom.getApiSuccessCode()) {
    var listData = d.list,
        extraData = d.extra;
    var pageNo = extraData.pageNo;
    var list = (listData || []).map(function (item, index) {
      var o = item;

      if ((o.key || null) == null) {
        o.key = "".concat(pageNo, "-").concat(index);
      }

      if (typeof listItemHandler === "function") {
        o = listItemHandler(o);
      }

      return o;
    });
    v = {
      code: code,
      message: messageText,
      count: (list || []).length,
      list: list,
      pagination: {
        total: extraData.total,
        pageSize: extraData.pageSize,
        current: parseInt(pageNo || 1, 10) || 1
      },
      extra: extraData,
      dataSuccess: true
    };
  } else {
    v = {
      code: code,
      message: messageText || "网络异常",
      count: 0,
      list: [],
      extra: null,
      pagination: {
        total: 0,
        pageSize: 10,
        current: 1
      },
      dataSuccess: false
    };
    dataExceptionNotice(v);
  }

  return v;
}
/**
 * 预处理数据请求
 *
 * @export
 * @param {*} d
 * @returns
 */

function pretreatmentRequestParams(params, customHandle) {
  var submitData = params || {};

  if (typeof customHandle === "function") {
    submitData = customHandle(submitData);
  }

  return submitData;
}
/**
 * 常规数据出库辅助方法
 * @param {*} state
 * @param {*} action
 * @param {*} callback
 * @returns
 */

function handleCommonDataAssist(state, action) {
  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var d = action.payload,
      alias = action.alias;
  var v = pretreatmentRemoteSingleData(d);

  if (isFunction(callback)) {
    v = callback(v);
  }

  if (isUndefined(alias)) {
    return _objectSpread2(_objectSpread2({}, state), {}, {
      data: v,
      fromRemote: true
    });
  }

  var aliasData = {};
  aliasData[alias] = v;
  return _objectSpread2(_objectSpread2(_objectSpread2({}, state), aliasData), {}, {
    fromRemote: true
  });
}
/**
 * handleListDataAssist
 * @param {*} state
 * @param {*} action
 * @param {*} pretreatment
 * @param {*} callback
 * @returns
 */

function handleListDataAssist(state, action) {
  var pretreatment = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var d = action.payload,
      alias = action.alias;
  var v = pretreatmentRemoteListData(d, pretreatment);

  if (isFunction(callback)) {
    v = callback(v);
  }

  if (isUndefined(alias)) {
    return _objectSpread2(_objectSpread2({}, state), {}, {
      data: v,
      fromRemote: true
    });
  }

  var aliasData = {};
  aliasData[alias] = v;
  return _objectSpread2(_objectSpread2(_objectSpread2({}, state), aliasData), {}, {
    fromRemote: true
  });
}
function handlePageListDataAssist(state, action) {
  var pretreatment = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var d = action.payload,
      alias = action.alias;
  var v = pretreatmentRemotePageListData(d, pretreatment);

  if (isFunction(callback)) {
    v = callback(v);
  }

  if (isUndefined(alias)) {
    return _objectSpread2(_objectSpread2({}, state), {}, {
      data: v,
      fromRemote: true
    });
  }

  var aliasData = {};
  aliasData[alias] = v;
  return _objectSpread2(_objectSpread2(_objectSpread2({}, state), aliasData), {}, {
    fromRemote: true
  });
}
/**
 * begin request（remote request / local virtual requests）
 * @param {*} api [string]: request address
 * @param {*} params [object]: request params
 * @param {*} method [string]: ’GET‘ or ’POST‘, default is ’POST‘
 * @param {*} useVirtualRequest [bool]: whether to apply virtual requests
 * @param {*} showUseVirtualRequestMessage [bool]: whether display virtual request message prompt
 * @param {*} virtualSuccessResponse [object]: virtual request success response data
 * @param {*} virtualFailResponse [object]: virtual request fail response data
 * @param {*} virtualRequestResult [object]:mandatory set virtual request result, generally used to debug
 * @param {*} virtualNeedAuthorize [object]:set virtual request whether check token， only check mull or empty, generally used to debug
 * @returns
 */

function request(_x) {
  return _request.apply(this, arguments);
}
/**
 * 获取配置的 api 版本号
 */

function _request() {
  _request = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref4) {
    var api, _ref4$urlParams, urlParams, _ref4$params, params, _ref4$method, method, _ref4$useVirtualReque, useVirtualRequest, _ref4$showUseVirtualR, showUseVirtualRequestMessage, _ref4$virtualSuccessR, virtualSuccessResponse, _ref4$virtualFailResp, virtualFailResponse, _ref4$virtualRequestR, virtualRequestResult, _ref4$virtualNeedAuth, virtualNeedAuthorize, apiVersion, url, showRequestInfo, result, verifyToken, token, loginPath;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            api = _ref4.api, _ref4$urlParams = _ref4.urlParams, urlParams = _ref4$urlParams === void 0 ? null : _ref4$urlParams, _ref4$params = _ref4.params, params = _ref4$params === void 0 ? {} : _ref4$params, _ref4$method = _ref4.method, method = _ref4$method === void 0 ? "POST" : _ref4$method, _ref4$useVirtualReque = _ref4.useVirtualRequest, useVirtualRequest = _ref4$useVirtualReque === void 0 ? defaultSettingsLayoutCustom.getUseVirtualRequest() : _ref4$useVirtualReque, _ref4$showUseVirtualR = _ref4.showUseVirtualRequestMessage, showUseVirtualRequestMessage = _ref4$showUseVirtualR === void 0 ? defaultSettingsLayoutCustom.getShowUseVirtualRequestMessage() : _ref4$showUseVirtualR, _ref4$virtualSuccessR = _ref4.virtualSuccessResponse, virtualSuccessResponse = _ref4$virtualSuccessR === void 0 ? {} : _ref4$virtualSuccessR, _ref4$virtualFailResp = _ref4.virtualFailResponse, virtualFailResponse = _ref4$virtualFailResp === void 0 ? {
              code: 1001,
              message: "虚拟未知错误"
            } : _ref4$virtualFailResp, _ref4$virtualRequestR = _ref4.virtualRequestResult, virtualRequestResult = _ref4$virtualRequestR === void 0 ? true : _ref4$virtualRequestR, _ref4$virtualNeedAuth = _ref4.virtualNeedAuthorize, virtualNeedAuthorize = _ref4$virtualNeedAuth === void 0 ? true : _ref4$virtualNeedAuth;
            apiVersion = defaultSettingsLayoutCustom.getApiVersion();

            if (isString(apiVersion)) {
              _context.next = 5;
              break;
            }

            recordObject(apiVersion);
            throw new Error("apiVersion is not string");

          case 5:
            if (isString(api)) {
              _context.next = 8;
              break;
            }

            recordObject(api);
            throw new Error("api is not string");

          case 8:
            if (!stringIsNullOrWhiteSpace(apiVersion)) {
              apiVersion = "/".concat(apiVersion, "/");
            }

            url = "".concat(apiVersion).concat(api).replace("//", "/");

            if ((urlParams || null) != null) {
              if (isString(urlParams)) {
                url = "url?".concat(urlParams);
              }

              if (isObject(urlParams)) {
                url = "url?".concat(queryStringify(urlParams));
              }
            }

            showRequestInfo = defaultSettingsLayoutCustom.getShowRequestInfo();

            if (!useVirtualRequest) {
              _context.next = 29;
              break;
            }

            if (showUseVirtualRequestMessage) {
              setTimeout(function () {
                var text = "由虚拟访问返回";
                showInfoMessage({
                  message: text
                });
              }, 500);
            }

            result = {};
            verifyToken = false;

            if (virtualNeedAuthorize) {
              token = getToken();

              if (!stringIsNullOrWhiteSpace(token)) {
                verifyToken = true;
              }
            }

            if (!(virtualNeedAuthorize && !verifyToken)) {
              _context.next = 24;
              break;
            }

            loginPath = defaultSettingsLayoutCustom.getLoginPath();

            if (!stringIsNullOrWhiteSpace(loginPath)) {
              _context.next = 21;
              break;
            }

            throw new Error("缺少登录页面路径配置");

          case 21:
            redirectTo(loginPath);
            _context.next = 27;
            break;

          case 24:
            _context.next = 26;
            return apiVirtualAccess({
              dataBuild: function dataBuild(resolve) {
                if (virtualRequestResult) {
                  resolve(apiVirtualSuccessData({
                    remoteResponse: virtualSuccessResponse,
                    needAuthorize: virtualNeedAuthorize
                  }));
                } else {
                  resolve(apiVirtualFailData(_objectSpread2(_objectSpread2({}, virtualFailResponse || {}), {
                    needAuthorize: virtualNeedAuthorize
                  })));
                }
              }
            });

          case 26:
            result = _context.sent;

          case 27:
            if (showRequestInfo) {
              recordObject({
                url: url,
                useVirtualRequest: useVirtualRequest,
                virtualResponse: result,
                params: params
              });
            }

            return _context.abrupt("return", result);

          case 29:
            if (showRequestInfo) {
              recordObject({
                api: api,
                apiVersion: apiVersion,
                apiChange: url,
                params: params
              });
            }

            return _context.abrupt("return", remoteRequest(url, {
              method: method,
              data: params
            }));

          case 31:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _request.apply(this, arguments);
}

function getApiVersion() {
  var version = defaultSettingsLayoutCustom.getApiVersion();
  return version;
}
/**
 * 构建跨域请求域前缀
 */

function corsTargetWithApiVersion() {
  var apiVersion = getApiVersion();

  if (!stringIsNullOrWhiteSpace(apiVersion)) {
    apiVersion = "/".concat(apiVersion);
  }

  var path = "".concat(corsTarget()).concat(apiVersion);
  return path;
}
/**
 * 占位函数
 *
 * @export
 * @returns
 */

function empty() {
  return {};
}

export { corsTargetWithApiVersion, empty, getApiVersion, handleCommonDataAssist, handleListDataAssist, handlePageListDataAssist, pretreatmentRemoteListData, pretreatmentRemotePageListData, pretreatmentRemoteSingleData, pretreatmentRequestParams, request };
