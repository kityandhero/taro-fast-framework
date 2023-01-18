import { setStateDefaultCode } from 'easy-soft-dva';
import {
  buildPromptModuleInfo,
  logDebug,
  setCacheMount,
  setLoggerDisplaySwitch,
  setStorageFlusher,
  setStorageGetter,
  setStorageRemover,
  setStorageSetter,
} from 'easy-soft-utility';

import {
  clearStorageSync,
  getStorageSync,
  getTaroGlobalData,
  removeStorageSync,
  setStorageSync,
} from 'taro-fast-common/es/utils/tools';

import { defaultSettingsLayoutCustom } from './defaultSettingsSpecial';
import { modulePackageName } from './definition';

let configEnvironmentComplete = false;

/**
 * Module Name.
 */
const moduleName = 'configAssist';

export function configEnvironment() {
  if (configEnvironmentComplete) {
    return;
  }

  setLoggerDisplaySwitch(defaultSettingsLayoutCustom.getShowLogInConsole());

  setStorageGetter(getStorageSync);
  setStorageSetter(setStorageSync);
  setStorageRemover(removeStorageSync);
  setStorageFlusher(clearStorageSync);

  setStateDefaultCode(defaultSettingsLayoutCustom.getApiSuccessCode());

  setCacheMount(getTaroGlobalData());

  logDebug(
    buildPromptModuleInfo(
      modulePackageName,
      'configEnvironment -> config complete',
      moduleName,
    ),
  );
}
