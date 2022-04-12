import { addMinute, getGuid, getNow } from 'taro-fast-common/es/utils/tools';

import { getVerifySignInResult } from '../utils/tools';
import { request } from '../utils/requestAssistor';

export async function getWeatherData(params) {
  return request({
    api: `https://wis.qq.com/weather/common`,
    urlParams: params,
    method: 'GET',
  });
}

export async function refreshSessionData(params) {
  const { code } = params;

  return request({
    api: `/schedulingControl/refreshSession`,
    params,
    useVirtualRequest: true,
    virtualNeedAuthorize: false,
    virtualSuccessResponse: {
      data: {
        sessionId: getGuid(),
        code: code || '',
      },
    },
  });
}

export async function checkTicketValidityData(params) {
  return request({
    api: `/schedulingControl/checkTicketValidity`,
    params,
    useVirtualRequest: true,
    virtualNeedAuthorize: false,
    virtualSuccessResponse: {
      data: {
        needRefresh: true,
        nextCheckLoginUnixTime: Math.round(addMinute(getNow(), 30) / 1000),
      },
    },
  });
}

export async function signInSilentData(params) {
  const verifySignInResult = getVerifySignInResult();

  return request({
    api: `/schedulingControl/signInSilent`,
    params,
    useVirtualRequest: true,
    virtualNeedAuthorize: false,
    virtualSuccessResponse: {
      data: {
        signInResult: verifySignInResult.fail,
        token: '',
        openId: '',
      },
    },
  });
}

export async function getCustomerData(params) {
  return request({
    api: `/schedulingControl/getCustomer`,
    params,
    useVirtualRequest: true,
    virtualNeedAuthorize: false,
    virtualSuccessResponse: {
      data: {
        nickName: '',
      },
    },
  });
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export async function empty() {
  return {};
}
