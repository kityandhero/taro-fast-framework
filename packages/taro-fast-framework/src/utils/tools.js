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

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
