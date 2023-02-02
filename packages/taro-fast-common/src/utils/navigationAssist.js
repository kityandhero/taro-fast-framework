import {
  navigateTo as navigateToCore,
  redirectTo as redirectToCore,
} from '@tarojs/taro';

import {
  isObject,
  isString,
  setNavigator,
  setRedirector,
} from 'easy-soft-utility';

function redirectTo(o) {
  if (isString(o)) {
    redirectToCore({
      url: o,
    });

    return;
  }

  if (isObject(o)) {
    redirectToCore(o);

    return;
  }
}

function navigateTo(o) {
  if (isString(o)) {
    navigateToCore({
      url: o,
    });

    return;
  }

  if (isObject(o)) {
    navigateToCore(o);

    return;
  }
}

/**
 * 设置 Navigation 处理器
 */
export function setNavigationHandler() {
  setNavigator(navigateTo);
  setRedirector(redirectTo);
}
