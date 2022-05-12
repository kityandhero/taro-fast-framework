import {
  addMinute,
  formatDatetime,
  getGuid,
  getNow,
  recordInfo,
  stringIsNullOrWhiteSpace,
} from 'taro-fast-common/es/utils/tools';
import { datetimeFormat } from 'taro-fast-common/es/utils/constants';

import { getVerifySignInResult } from '../utils/tools';
import { request } from '../utils/requestAssistor';
import { defaultSettingsLayoutCustom } from '../utils/defaultSettingsSpecial';

export async function getWeatherData(params) {
  const weatherApi = defaultSettingsLayoutCustom.getWeatherApi();

  if (stringIsNullOrWhiteSpace(weatherApi)) {
    throw new Error('weatherApi is null, please check it in app config');
  }

  return request({
    api: weatherApi,
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

  recordInfo(`info simulation session data: ${JSON.stringify(simulation)}`);

  return request({
    api: `/schedulingControl/refreshSession`,
    params,
    useVirtualRequest: true,
    virtualNeedAuthorize: false,
    virtualSuccessResponse: {
      data: simulation,
      list: [],
      extra: {},
    },
  });
}

export async function checkTicketValidityData(params) {
  const simulation = {
    needRefresh: true,
    nextCheckLoginUnixTime: Math.round(addMinute(getNow(), 30) / 1000),
  };

  recordInfo(
    `info simulation ticket validity data: ${JSON.stringify(simulation)}`,
  );

  return request({
    api: `/schedulingControl/checkTicketValidity`,
    params,
    useVirtualRequest: true,
    virtualNeedAuthorize: false,
    virtualSuccessResponse: {
      data: simulation,
      list: [],
      extra: {},
    },
  });
}

export async function exchangePhoneData(params) {
  const simulation = {
    key: getGuid(),
  };

  recordInfo(`info simulation phone key data: ${JSON.stringify(simulation)}`);

  return request({
    api: `/schedulingControl/exchangePhone`,
    params,
    useVirtualRequest: true,
    virtualNeedAuthorize: false,
    virtualSuccessResponse: {
      data: simulation,
      list: [],
      extra: {},
    },
  });
}

export async function signInSilentData(params) {
  const verifySignInResult = getVerifySignInResult();

  const simulation = {
    signInResult: verifySignInResult.success,
    token: getGuid(),
    openId: getGuid(),
    sessionEffective: true,
    needSyncInfo: false,
  };

  recordInfo(
    `info simulation sign in silent data: ${JSON.stringify(simulation)}`,
  );

  return request({
    api: `/schedulingControl/signInSilent`,
    params,
    useVirtualRequest: true,
    virtualNeedAuthorize: false,
    virtualSuccessResponse: {
      data: simulation,
      list: [],
      extra: {},
    },
  });
}

export async function registerWithWeChatData(params) {
  const verifySignInResult = getVerifySignInResult();

  const simulation = {
    signInResult: verifySignInResult.success,
    token: getGuid(),
    openId: getGuid(),
    sessionEffective: true,
    needSyncInfo: false,
  };

  recordInfo(
    `info simulation sign in silent data: ${JSON.stringify(simulation)}`,
  );

  return request({
    api: `/schedulingControl/registerWithWeChat`,
    params,
    useVirtualRequest: true,
    virtualNeedAuthorize: false,
    virtualSuccessResponse: {
      data: simulation,
      list: [],
      extra: {},
    },
  });
}

export async function registerData(params) {
  const verifySignInResult = getVerifySignInResult();

  const simulation = {
    signInResult: verifySignInResult.success,
    token: getGuid(),
    openId: getGuid(),
    sessionEffective: true,
    needSyncInfo: false,
  };

  recordInfo(
    `info simulation sign in silent data: ${JSON.stringify(simulation)}`,
  );

  return request({
    api: `/schedulingControl/register`,
    params,
    useVirtualRequest: true,
    virtualNeedAuthorize: false,
    virtualSuccessResponse: {
      data: simulation,
      list: [],
      extra: {},
    },
  });
}

export async function getMetaDataData(params) {
  const simulation = {
    time: formatDatetime(getNow, datetimeFormat.monthDayHourMinuteSecond),
  };

  recordInfo(
    `info simulation meta data silent data: ${JSON.stringify(simulation)}`,
  );

  return request({
    api: `/schedulingControl/getMetaData`,
    params,
    useVirtualRequest: true,
    virtualNeedAuthorize: false,
    virtualSuccessResponse: {
      data: simulation,
      list: [],
      extra: {},
    },
  });
}

export async function getCustomerData(params) {
  const simulation = {};

  recordInfo(
    `info simulation customer silent data: ${JSON.stringify(simulation)}`,
  );

  return request({
    api: `/schedulingControl/getCustomer`,
    params,
    useVirtualRequest: true,
    virtualNeedAuthorize: false,
    virtualSuccessResponse: {
      data: simulation,
      list: [],
      extra: {},
    },
  });
}

export async function getAdministrativeDivisionFullData(params) {
  const simulation = [];

  recordInfo(
    `info simulation administrative division full data silent data: ${JSON.stringify(
      simulation,
    )}`,
  );

  return request({
    api: `/schedulingControl/getAdministrativeDivisionFullData`,
    params,
    useVirtualRequest: true,
    virtualNeedAuthorize: false,
    virtualSuccessResponse: {
      data: {},
      list: simulation,
      extra: {},
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
