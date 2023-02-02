import { toString } from 'easy-soft-utility';

import { verifySignInResult } from 'taro-fast-common';

import { getSettingsAgency } from './defaultSettingsSpecial';

/**
 * 检测远程返回码是否代表登录失败
 * @param {*} code [number] remote response code
 * @returns
 */
export function checkWhetherAuthorizeFail(code) {
  const authenticationFailCode =
    getSettingsAgency().getAuthenticationFailCode();

  return authenticationFailCode === code;
}

export function getSignInResultDescription(v) {
  let result = '';

  const verifySignInResultData = getVerifySignInResult();

  Object.entries(verifySignInResultData).forEach(([key, value]) => {
    if (toString(value) === toString(v)) {
      result = key;
    }
  });

  return result;
}

/**
 * 构建登录校验检测凭证
 */
export function getVerifySignInResult() {
  const o = verifySignInResult;

  o.success = getSettingsAgency().getSignInSuccessFlag();
  o.fail = getSettingsAgency().getSignInFailFlag();
  o.unknown = getSettingsAgency().getSignInUnknownFlag();

  return o;
}
