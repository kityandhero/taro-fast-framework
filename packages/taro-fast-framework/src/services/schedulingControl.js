import {
  addMinute,
  getGuid,
  getNow,
  recordLog,
} from 'taro-fast-common/es/utils/tools';

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

  const simulation = {
    sessionId: getGuid(),
    code: code || '',
  };

  recordLog(`info simulation session data: ${JSON.stringify(simulation)}`);

  return request({
    api: `/schedulingControl/refreshSession`,
    params,
    useVirtualRequest: true,
    virtualNeedAuthorize: false,
    virtualSuccessResponse: {
      data: simulation,
    },
  });
}

export async function checkTicketValidityData(params) {
  const simulation = {
    needRefresh: true,
    nextCheckLoginUnixTime: Math.round(addMinute(getNow(), 30) / 1000),
  };

  recordLog(
    `info simulation ticket validity data: ${JSON.stringify(simulation)}`,
  );

  return request({
    api: `/schedulingControl/checkTicketValidity`,
    params,
    useVirtualRequest: true,
    virtualNeedAuthorize: false,
    virtualSuccessResponse: {
      data: simulation,
    },
  });
}

export async function exchangePhoneData(params) {
  const simulation = {
    key: getGuid(),
  };

  recordLog(`info simulation phone key data: ${JSON.stringify(simulation)}`);

  return request({
    api: `/schedulingControl/exchangePhone`,
    params,
    useVirtualRequest: true,
    virtualNeedAuthorize: false,
    virtualSuccessResponse: {
      data: simulation,
    },
  });
}

export async function signInSilentData(params) {
  const verifySignInResult = getVerifySignInResult();

  const simulation = {
    signInResult: verifySignInResult.fail,
    token: '',
    openId: '',
  };

  recordLog(
    `info simulation sign in silent data: ${JSON.stringify(simulation)}`,
  );

  return request({
    api: `/schedulingControl/signInSilent`,
    params,
    useVirtualRequest: true,
    virtualNeedAuthorize: false,
    virtualSuccessResponse: {
      data: simulation,
    },
  });
}

export async function getCustomerData(params) {
  const simulation = {};

  recordLog(
    `info simulation customer silent data: ${JSON.stringify(simulation)}`,
  );

  return request({
    api: `/schedulingControl/getCustomer`,
    params,
    useVirtualRequest: true,
    virtualNeedAuthorize: false,
    virtualSuccessResponse: {
      data: simulation,
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
