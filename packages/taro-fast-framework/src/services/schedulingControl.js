import { datetimeFormat } from 'taro-fast-common/es/utils/constants';
import {
  addMinute,
  formatDatetime,
  getGuid,
  getNow,
  recordDebug,
  stringIsNullOrWhiteSpace,
} from 'taro-fast-common/es/utils/tools';

import { defaultSettingsLayoutCustom } from '../utils/defaultSettingsSpecial';
import { request } from '../utils/requestAssistor';
import { getVerifySignInResult } from '../utils/tools';

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

  recordDebug(
    `refreshSessionData simulation session data: ${JSON.stringify(simulation)}`,
  );

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

  recordDebug(
    `checkTicketValidityData simulation ticket validity data: ${JSON.stringify(
      simulation,
    )}`,
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

  recordDebug(
    `exchangePhoneData simulation phone key data: ${JSON.stringify(
      simulation,
    )}`,
  );

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

  recordDebug(
    `signInSilentData simulation sign in silent data: ${JSON.stringify(
      simulation,
    )}`,
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

  recordDebug(
    `registerWithWeChatData simulation sign in silent data: ${JSON.stringify(
      simulation,
    )}`,
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

  recordDebug(
    `registerData simulation sign in silent data: ${JSON.stringify(
      simulation,
    )}`,
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
    time: formatDatetime(getNow(), datetimeFormat.monthDayHourMinuteSecond),
  };

  recordDebug(
    `getMetaDataData simulation meta data silent data: ${JSON.stringify(
      simulation,
    )}`,
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

  recordDebug(
    `getCustomerData simulation customer silent data: ${JSON.stringify(
      simulation,
    )}`,
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

  recordDebug(
    `getAdministrativeDivisionFullData simulation administrative division full data silent data: ${JSON.stringify(
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
