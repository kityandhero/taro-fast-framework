import {
  recordError,
  redirectTo,
  showRuntimeError,
  showWarnMessage,
  stringIsNullOrWhiteSpace,
} from 'taro-fast-common/es/utils/tools';
import { isFunction } from 'taro-fast-common/es/utils/typeCheck';

import { defaultSettingsLayoutCustom } from './defaultSettingsSpecial';
import { getToken } from './globalStorageAssist';

/**
 * 是否使用模拟访问
 *
 * @export
 * @returns
 */
export function transferToVirtualAccess() {
  return defaultSettingsLayoutCustom.getUseVirtualRequest();
}

/**
 * 封装模拟的登录验证
 *
 * @returns
 */
function apiVirtualAuthorize() {
  const tokenValue = getToken;
  return (tokenValue || '') !== '';
}

/**
 * 封装模拟的错误返回
 */
export function apiVirtualFailData({
  remoteResponse,
  code,
  message: messageText,
  needAuthorize = true,
}) {
  if (needAuthorize) {
    if (apiVirtualAuthorize()) {
      showRuntimeError({
        message: messageText,
      });

      return {
        code,
        message: messageText,
        success: false,
        ...remoteResponse,
      };
    }

    return {
      code: defaultSettingsLayoutCustom.getAuthenticationFailCode(),
      message: '登录失效, 请重新登录',
      success: false,
    };
  }

  showRuntimeError({
    message: messageText,
  });

  return {
    code,
    message: messageText,
    success: false,
    ...remoteResponse,
  };
}

/**
 * 封装模拟的正确返回
 */
export function apiVirtualSuccessData({
  remoteResponse,
  needAuthorize = true,
}) {
  if (needAuthorize) {
    if (apiVirtualAuthorize()) {
      return {
        code: defaultSettingsLayoutCustom.getApiSuccessCode(),
        message: 'success',
        success: true,
        ...remoteResponse,
      };
    }

    return {
      code: defaultSettingsLayoutCustom.getAuthenticationFailCode(),
      message: '登录失效, 请重新登录',
      success: false,
    };
  }

  return {
    code: defaultSettingsLayoutCustom.getApiSuccessCode(),
    message: 'success',
    success: true,
    ...remoteResponse,
  };
}

/**
 * 封装正确的虚拟访问
 */
export async function apiVirtualSuccessAccess({
  remoteResponse,
  needAuthorize = true,
}) {
  let result = {};

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        apiVirtualSuccessData({
          remoteResponse,
          needAuthorize,
        }),
      );
    }, 300);
  })
    .then((data) => {
      result = data;

      return data;
    })
    .catch((res) => {
      recordError(res);
    });

  const { code } = result;

  if (code === defaultSettingsLayoutCustom.getAuthenticationFailCode()) {
    const signInPath = defaultSettingsLayoutCustom.getSignInPath();

    if (stringIsNullOrWhiteSpace(signInPath)) {
      throw new Error('缺少登录页面路径配置');
    }

    redirectTo(signInPath);
  }

  return result;
}

/**
 * 封装失败的虚拟访问
 */
export async function apiVirtualFailAccess({
  remoteResponse,
  needAuthorize = true,
}) {
  let result = {};

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(apiVirtualFailData(remoteResponse, needAuthorize));
    }, 300);
  })
    .then((data) => {
      result = data;

      return data;
    })
    .catch((res) => {
      recordError(res);
    });

  const { code, message: messageText } = result;

  if (code === defaultSettingsLayoutCustom.getAuthenticationFailCode()) {
    const signInPath = defaultSettingsLayoutCustom.getSignInPath();

    if (stringIsNullOrWhiteSpace(signInPath)) {
      throw new Error('缺少登录页面路径配置');
    }

    redirectTo(signInPath);
  } else if (code !== defaultSettingsLayoutCustom.getApiSuccessCode()) {
    showWarnMessage({
      message: messageText,
    });
  }

  return result;
}

/**
 * 封装模拟访问
 */
export async function apiVirtualAccess({
  virtualRequestDelay = 200,
  dataBuild,
}) {
  let result = {};

  await new Promise((resolve) => {
    if (isFunction(dataBuild)) {
      setTimeout(
        () => {
          dataBuild(resolve);
        },
        virtualRequestDelay > 0 ? virtualRequestDelay : 0,
      );
    }
  })
    .then((data) => {
      result = data;

      return data;
    })
    .catch((res) => {
      recordError(res);
    });

  const { code, message: messageText } = result;

  if (code !== defaultSettingsLayoutCustom.getApiSuccessCode()) {
    showWarnMessage({
      message: messageText,
    });
  }

  return result;
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
