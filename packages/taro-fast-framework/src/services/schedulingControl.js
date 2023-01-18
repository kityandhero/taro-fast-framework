import {
  addMinute,
  checkStringIsNullOrWhiteSpace,
  datetimeFormat,
  formatDatetime,
  getGuid,
  getNow,
  logDebug,
} from 'easy-soft-utility';

import { defaultSettingsLayoutCustom } from '../utils/defaultSettingsSpecial';
import { request } from '../utils/requestAssistor';
import { getVerifySignInResult } from '../utils/tools';

export async function getWeatherData(params) {
  const weatherApi = defaultSettingsLayoutCustom.getWeatherApi();

  if (checkStringIsNullOrWhiteSpace(weatherApi)) {
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

  logDebug(
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

  logDebug(
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

  logDebug(
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

  logDebug(
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

  logDebug(
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

  logDebug(
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

  logDebug(
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

  logDebug(
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

  logDebug(
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
