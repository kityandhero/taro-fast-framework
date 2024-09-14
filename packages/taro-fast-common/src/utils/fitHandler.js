import {
  checkStringIsNullOrWhiteSpace,
  checkWhetherDevelopmentEnvironment,
  getApplicationMergeConfig,
  logError,
  logExecute,
  logTrace,
  redirectTo,
  setApplicationExternalConfigList,
  setApplicationInitialConfig,
  setAuthenticationFailHandler,
  setLoggerDisplaySwitch,
  setRuntimeDataStorage,
} from 'easy-soft-utility';

import { appInitDefault } from './constants';
import { buildPromptModuleInfoText } from './definition';
import { setLocalStorageHandler } from './localStorageAssist';
import { setMessageDisplayMonitor } from './messageAssist';
import { getTaroGlobalData } from './meta';
import { setNavigationHandler } from './navigationAssist';
import { getSignInPath } from './settingsAssist';

function getShowLogInConsole() {
  const { showLogInConsole } = {
    showLogInConsole: false,
    ...getApplicationMergeConfig(),
  };

  return showLogInConsole || false;
}

function handleAuthenticationFail() {
  logExecute({}, buildPromptModuleInfoText('handleAuthenticationFail'));

  const signInPath = getSignInPath();

  if (checkStringIsNullOrWhiteSpace(signInPath)) {
    logError(
      'handleAuthenticationFail',
      'authenticationFailRedirectPath has not set yet, please set it in applicationConfig with key "authenticationFailRedirectPath"',
    );

    return;
  }

  setTimeout(() => {
    logTrace(
      buildPromptModuleInfoText(
        'handleAuthorizationFail',
        'redirectTo',
        `"${signInPath}" [get by getSignInPath()]`,
      ),
    );
    redirectTo(signInPath);
  }, 100);
}

/**
 * 设置 easy-soft-utility 处理器
 */
export function setEasySoftUtilityHandler(...externalConfigs) {
  setLocalStorageHandler();
  setNavigationHandler();

  setRuntimeDataStorage(getTaroGlobalData());

  setApplicationInitialConfig({
    ...appInitDefault,
    showLogInConsole: checkWhetherDevelopmentEnvironment(),
  });

  setApplicationExternalConfigList(externalConfigs);

  setLoggerDisplaySwitch(getShowLogInConsole());

  setMessageDisplayMonitor();

  setAuthenticationFailHandler(handleAuthenticationFail);
}
