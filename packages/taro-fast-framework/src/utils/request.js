import Taro from "@tarojs/taro";

import {
  corsTarget,
  trySendNearestLocalhostNotify,
  stringIsNullOrWhiteSpace,
  recordObject,
  recordError,
} from "./tools";
import { isString } from "./typeCheck";
import {
  getTokenKeyName,
  getToken,
  getOpenId,
  getSessionId,
  getLocationMode,
} from "./globalStorageAssist";
import { requestMethod } from "./constants";
import { defaultSettingsLayoutCustom } from "./defaultSettingsSpecial";
import Tips from "./tips";

export class Request {
  /**
   *
   * @static request请求 基于 Taro.request
   * @param {Options} opts
   */
  static request(opts) {
    let options = Object.assign(opts, {
      fail: (res) => {
        Tips.loaded();

        recordError(res);
      },
    });

    return Taro.request(options).then((response) => {
      const { code } = response.data;

      if (code === defaultSettingsLayoutCustom.getAuthenticationFailCode()) {
        const loginPath = defaultSettingsLayoutCustom.getLoginPath();

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
  static Post(url, data, header = {}) {
    try {
      const token = getToken() || "anonymous";
      const openId = getOpenId();
      const sessionId = getSessionId();
      const locationMode = getLocationMode();

      const headerChange = {
        ...(header || {}),
        ...{
          openId,
          sessionId,
          locationMode,
        },
      };

      headerChange[`${getTokenKeyName()}`] = token;

      const corsUrl = corsTarget();

      if (!isString(corsUrl)) {
        recordObject(corsUrl);

        throw new Error("corsUrl is not string");
      }

      if (!isString(url)) {
        recordObject({ url });

        throw new Error("url is not string");
      }

      let urlChange = url;

      if (!stringIsNullOrWhiteSpace(corsUrl)) {
        if (url.indexOf(corsUrl) >= 0) {
          urlChange = url;
        } else {
          urlChange = `${corsUrl}${url}`;
        }
      }

      trySendNearestLocalhostNotify({ text: corsUrl });

      if (!isString(urlChange)) {
        recordObject({ urlChange });

        throw new Error("urlChange is not string");
      }

      const showRequestInfo = defaultSettingsLayoutCustom.getShowRequestInfo();

      if (showRequestInfo) {
        recordObject({
          corsUrl,
          api: url,
          apiAdjust: urlChange,
          data,
          options: { header: headerChange },
        });
      }

      return Request.request({
        url: url,
        data: data || {},
        header: headerChange,
        method: requestMethod.post,
      });
    } catch (e) {
      recordError(e.stack);
    }
  }
}

export default Request;
