import Taro from '@tarojs/taro';

import {
  corsTarget,
  trySendNearestLocalhostNotify,
  stringIsNullOrWhiteSpace,
  recordObject,
  recordError,
  recordText,
  showErrorMessage,
} from 'taro-fast-common/es/utils/tools';
import { isString } from 'taro-fast-common/es/utils/typeCheck';
import { toLower } from 'taro-fast-common/es/utils/typeConvert';
import { requestMethod } from 'taro-fast-common/es/utils/constants';
import Tips from 'taro-fast-common/es/utils/tips';

import {
  getTokenKeyName,
  getToken,
  getOpenId,
  getSession,
  getLocationMode,
} from './globalStorageAssist';
import { defaultSettingsLayoutCustom } from './defaultSettingsSpecial';

const tokenAnonymous = defaultSettingsLayoutCustom.getTokenAnonymous();

export class Request {
  /**
   *
   * @static request请求 基于 Taro.request
   * @param {Options} o
   */
  static async request(o) {
    let options = Object.assign(o, {
      fail: (error) => {
        Tips.loaded();

        showErrorMessage({
          message: '请求失败, 请检查网络',
        });

        recordError(error);
      },
    });

    const response = await Taro.request(options);

    const { code } = response.data;

    if (code === defaultSettingsLayoutCustom.getAuthenticationFailCode()) {
      const signInPath = defaultSettingsLayoutCustom.getSignInPath();

      if (stringIsNullOrWhiteSpace(signInPath)) {
        throw new Error('缺少登录页面路径配置');
      }

      Tips.toast('跳转登录页面');
    }

    return response.data;
  }

  /**
   *
   * @static 开始请求
   * @returns
   * @memberof PostJson
   */
  static Execute({
    url,
    data,
    header = {},
    option,
    method = requestMethod.post,
  }) {
    try {
      const token = getToken() || tokenAnonymous;
      const openId = getOpenId();
      const sessionId = getSession();
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
        recordText(corsUrl);

        throw new Error('corsUrl is not string');
      }

      if (!isString(url)) {
        recordText({ url });

        throw new Error('url is not string');
      }

      let urlChange = url;

      if (
        toLower(url).startsWith('http://') ||
        toLower(url).startsWith('https://')
      ) {
        urlChange = url;
      } else {
        if (!stringIsNullOrWhiteSpace(corsUrl)) {
          if (url.indexOf(corsUrl) >= 0) {
            urlChange = url;
          } else {
            urlChange = `${corsUrl}${url}`;
          }
        }
      }

      const showRequestInfo = defaultSettingsLayoutCustom.getShowRequestInfo();

      if (showRequestInfo) {
        trySendNearestLocalhostNotify({ text: corsUrl });
      }

      if (!isString(urlChange)) {
        recordText({ urlChange });

        throw new Error('urlChange is not string');
      }

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
        ...{
          mode: 'cors',
          dataType: 'json',
          cache: 'no-cache',
          fail: (res) => {
            console.lod(res);
          },
        },
        ...(option || {}),
        ...{
          url: urlChange,
          data: data || {},
          header: headerChange,
          method,
        },
      });
    } catch (e) {
      recordError(e.stack);
    }
  }
}

export default Request;
