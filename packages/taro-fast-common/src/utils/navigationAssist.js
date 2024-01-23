import {
  navigateTo as navigateToCore,
  redirectTo as redirectToCore,
} from '@tarojs/taro';

import {
  buildPromptModuleInfo,
  isObject,
  isString,
  logDevelop,
  mergeTextMessage,
  setNavigator,
  setRedirector,
} from 'easy-soft-utility';

import { modulePackageName } from './definition';

/**
 * Module Name.
 */
const moduleName = 'navigationAssist';

function buildPromptModuleInfoText(text, ancillaryInformation = '') {
  return buildPromptModuleInfo(
    modulePackageName,
    mergeTextMessage(text, ancillaryInformation),
    moduleName,
  );
}

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
      'setNavigationHandler',
      'fill implementation with easy-soft-utility',
    ),
  );

  setNavigator(navigateTo);
  setRedirector(redirectTo);
}
