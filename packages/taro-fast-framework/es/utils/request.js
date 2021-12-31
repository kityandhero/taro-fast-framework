import { a as _createClass, _ as _classCallCheck } from '../classCallCheck.js';
import '../defineProperty.js';
import { _ as _objectSpread2 } from '../objectSpread2.js';
import './mediaDefault.js';
import { requestMethod } from './constants.js';
import 'lodash';
import { isString } from './typeCheck.js';
import './typeConvert.js';
import Taro from '@tarojs/taro';
import Tips from './tips.js';
import { recordError, stringIsNullOrWhiteSpace, corsTarget, recordObject, trySendNearestLocalhostNotify } from './tools.js';
import 'qs';
import 'node-cache';
import './cacheAssist.js';
import { getToken, getOpenId, getSessionId, getLocationMode, getTokenKeyName } from './globalStorageAssist.js';
import { defaultSettingsLayoutCustom } from './defaultSettingsSpecial.js';

var Request = /*#__PURE__*/function () {
  function Request() {
    _classCallCheck(this, Request);
  }

  _createClass(Request, null, [{
    key: "request",
    value:
    /**
     *
     * @static request请求 基于 Taro.request
     * @param {Options} opts
     */
    function request(opts) {
      var options = Object.assign(opts, {
        fail: function fail(res) {
          Tips.loaded();
          recordError(res);
        }
      }); // console.log(options);

      return Taro.request(options).then(function (response) {
        // response.data.statusCode = response.statusCode
        var code = response.data.code;

        if (code === defaultSettingsLayoutCustom.getAuthenticationFailCode()) {
          var loginPath = defaultSettingsLayoutCustom.getLoginPath();

          if (stringIsNullOrWhiteSpace(loginPath)) {
            throw new Error("缺少登录页面路径配置");
          }

          Tips.toast("跳转登录页面");
        }

        return response.data;
      });
    }
    /**
     *
     * @static 开始Post请求
     * @returns
     * @memberof PostJson
     */

  }, {
    key: "PostJson",
    value: function PostJson(url, data) {
      var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      try {
        var token = getToken() || "anonymous";
        var openId = getOpenId();
        var sessionId = getSessionId();
        var locationMode = getLocationMode();

        var headerChange = _objectSpread2(_objectSpread2({}, header || {}), {
          openId: openId,
          sessionId: sessionId,
          locationMode: locationMode
        });

        headerChange["".concat(getTokenKeyName())] = token;
        var corsUrl = corsTarget();

        if (!isString(corsUrl)) {
          recordObject(corsUrl);
          throw new Error("corsUrl is not string");
        }

        if (!isString(url)) {
          recordObject({
            url: url
          });
          throw new Error("url is not string");
        }

        var urlChange = url;

        if (!stringIsNullOrWhiteSpace(corsUrl)) {
          if (url.indexOf(corsUrl) >= 0) {
            urlChange = url;
          } else {
            urlChange = "".concat(corsUrl).concat(url);
          }
        }

        trySendNearestLocalhostNotify({
          text: corsUrl
        });

        if (!isString(urlChange)) {
          recordObject({
            urlChange: urlChange
          });
          throw new Error("urlChange is not string");
        }

        var showRequestInfo = defaultSettingsLayoutCustom.getShowRequestInfo();

        if (showRequestInfo) {
          recordObject({
            corsUrl: corsUrl,
            api: url,
            apiAdjust: urlChange,
            data: data,
            options: {
              header: headerChange
            }
          });
        }

        return Request.request({
          url: url,
          data: data || {},
          header: headerChange,
          method: requestMethod.post
        });
      } catch (e) {
        recordError(e.stack);
      }
    }
  }]);

  return Request;
}();

export default Request;
export { Request };
