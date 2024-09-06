import { logTrace, toString } from 'easy-soft-utility';

import { verifySignInResult } from 'taro-fast-common';

import { buildPromptModuleInfoText } from './definition';
import {
  getAuthenticationFailCode,
  getSignInFailFlag,
  getSignInSuccessFlag,
  getSignInUnknownFlag,
} from './settingsAssist';

/**
 * Module Name.
 * @private
 */
const moduleName = 'common';

/**
 * 检测远程返回码是否代表登录失败
 * @param {*} code [number] remote response code
 * @returns
 */
export function checkWhetherAuthorizeFail(code) {
  logTrace(
    { code },
    buildPromptModuleInfoText(moduleName, 'checkWhetherAuthorizeFail'),
  );

  const authenticationFailCode = getAuthenticationFailCode();

  return authenticationFailCode === code;
}

export function getSignInResultDescription(v) {
  logTrace(
    v,
    buildPromptModuleInfoText(moduleName, 'getSignInResultDescription'),
  );

  let result = '';

  const verifySignInResultData = getVerifySignInResult();

  for (const [key, value] of Object.entries(verifySignInResultData)) {
    if (toString(value) === toString(v)) {
      result = key;
    }
  }

  return result;
}

/**
 * 构建登录校验检测凭证
 */
export function getVerifySignInResult() {
  logTrace({}, buildPromptModuleInfoText(moduleName, 'getVerifySignInResult'));

  const o = verifySignInResult;

  o.success = getSignInSuccessFlag();
  o.fail = getSignInFailFlag();
  o.unknown = getSignInUnknownFlag();

  return o;
}
