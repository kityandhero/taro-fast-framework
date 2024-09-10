import {
  navigateTo as navigateToCore,
  redirectTo as redirectToCore,
} from '@tarojs/taro';

import {
  isObject,
  isString,
  logDevelop,
  setNavigator,
  setRedirector,
} from 'easy-soft-utility';

import { buildPromptModuleInfoText } from './definition';

/**
 * Module Name.
 */
const moduleName = 'navigationAssist';

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
  logDevelop(
    {},
    buildPromptModuleInfoText(
      moduleName,
      'setNavigationHandler',
      'fill implementation with easy-soft-utility',
    ),
  );

  setNavigator(navigateTo);
  setRedirector(redirectTo);
}
