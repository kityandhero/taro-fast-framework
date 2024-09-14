import Taro from '@tarojs/taro';

import {
  checkStringIsNullOrWhiteSpace,
  getToken,
  getTokenKeyName,
  isString,
  logDebug,
  logException,
  logExecute,
  logObject,
  logText,
  requestMethod,
  showErrorMessage,
  toLower,
  trySendNearestLocalhostNotify,
} from 'easy-soft-utility';

import {
  corsTarget,
  getAppId,
  getAuthenticationFailCode,
  getShowRequestInfo,
  getSignInPath,
  getTokenAnonymous,
  Tips,
} from 'taro-fast-common';

import { getLocationMode } from './locationAssist';
import { getOpenId } from './openIdAssist';
import { getSession } from './sessionAssist';

const Request = {
  /**
   *
   * @static request请求 基于 Taro.request
   * @param {Options} o
   */
  async request(o) {
    let options = Object.assign(o, {
      fail: (error) => {
        Tips.loaded();

        showErrorMessage({
          text: '请求失败, 请检查网络',
        });

        logException(error);
      },
    });

    const response = await Taro.request(options);

    logDebug(`api request complete: ${options.url}`);

    const { code } = response.data;

    if (code === getAuthenticationFailCode()) {
      const signInPath = getSignInPath();

      if (checkStringIsNullOrWhiteSpace(signInPath)) {
        throw new Error('缺少登录页面路径配置');
      }

      // Tips.toast('跳转登录页面');
    }

    return response.data;
  },

  /**
   *
   * @static 开始请求
   * @returns
   * @memberof PostJson
   */
  Execute({ url, data, header = {}, option, method = requestMethod.post }) {
    try {
      const token = getToken() || getTokenAnonymous();
      const appId = getAppId() ?? '';
      const openId = getOpenId() ?? '';
      const sessionId = getSession() ?? '';
      const locationMode = getLocationMode() ?? '';

      const headerChange = {
        ...header,
        appId,
        openId,
        sessionId,
        locationMode,
      };

      headerChange[`${getTokenKeyName()}`] = token;

      const corsUrl = corsTarget();

      if (!isString(corsUrl)) {
        logText(corsUrl);

        throw new Error('corsUrl is not string');
      }

      if (!isString(url)) {
        logText({ url });

        throw new Error('url is not string');
      }

      let urlChange = url;

      if (
        toLower(url).startsWith('http://') ||
        toLower(url).startsWith('https://')
      ) {
        urlChange = url;
      } else {
        if (!checkStringIsNullOrWhiteSpace(corsUrl)) {
          urlChange = url.includes(corsUrl) ? url : `${corsUrl}${url}`;
        }
      }

      const showRequestInfo = getShowRequestInfo();

      if (showRequestInfo) {
        trySendNearestLocalhostNotify({ text: corsUrl });
      }

      if (!isString(urlChange)) {
        logText({ urlChange });

        throw new Error('urlChange is not string');
      }

      if (showRequestInfo) {
        logObject({
          corsUrl,
          api: url,
          apiAdjust: urlChange,
          data,
          options: { header: headerChange },
        });
      }

      logDebug(`api request start: ${urlChange}`);

      return Request.request({
        mode: 'cors',
        dataType: 'json',
        cache: 'no-cache',
        fail: (response) => {
          console.lod(response);
        },
        ...option,
        url: urlChange,
        data: data || {},
        header: headerChange,
        method,
      });
    } catch (error_) {
      logExecute(error_.message);
    }
  },
};

export { Request };
