import {
  checkWhetherDevelopmentEnvironment,
  getApplicationMergeConfig,
  setApplicationExternalConfigList,
  setApplicationInitialConfig,
  setLoggerDisplaySwitch,
  setRuntimeDataStorage,
} from 'easy-soft-utility';

import { appInitDefault } from './constants';
import { setLocalStorageHandler } from './localStorageAssist';
import { setMessageDisplayMonitor } from './messageAssist';
import { getTaroGlobalData } from './meta';
import { setNavigationHandler } from './navigationAssist';

function getShowLogInConsole() {
  const { showLogInConsole } = {
    ...{ showLogInConsole: false },
    ...(getApplicationMergeConfig() || {}),
  };

  return showLogInConsole || false;
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
    ...{
      showLogInConsole: checkWhetherDevelopmentEnvironment(),
    },
  });

  setApplicationExternalConfigList(externalConfigs);

  setLoggerDisplaySwitch(getShowLogInConsole());

  setMessageDisplayMonitor();
}
