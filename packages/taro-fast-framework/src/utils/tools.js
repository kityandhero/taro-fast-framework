import { verifySignInResult } from 'taro-fast-common/es/utils/constants';
import { toString } from 'taro-fast-common/es/utils/typeConvert';

import { defaultSettingsLayoutCustom } from './defaultSettingsSpecial';

/**
 * 检测远程返回码是否代表登录失败
 * @param {*} code [number] remote response code
 * @returns
 */
export function checkWhetherAuthorizeFail(code) {
  const authenticationFailCode =
    defaultSettingsLayoutCustom.getAuthenticationFailCode();

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

  o.success = defaultSettingsLayoutCustom.getSignInSuccessFlag();
  o.fail = defaultSettingsLayoutCustom.getSignInFailFlag();
  o.unknown = defaultSettingsLayoutCustom.getSignInUnknownFlag();

  return o;
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
