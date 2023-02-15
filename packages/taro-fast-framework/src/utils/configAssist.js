import {
  buildPromptModuleInfo,
  getApplicationExternalConfigList,
  getApplicationInitialConfig,
  getApplicationMergeConfig,
  logConfig,
  logDebug,
  setRequestHandler,
  setStateDefaultCode,
  setUrlGlobalPrefix,
} from 'easy-soft-utility';

import { setEasySoftUtilityHandler } from 'taro-fast-common';

import { modulePackageName } from './definition';
import { Request as remoteRequest } from './request';
import { getApiSuccessCode, getApiVersion } from './settingsAssist';

let configEnvironmentComplete = false;

/**
 * Module Name.
 */
const moduleName = 'configAssist';

export function configEnvironment(externalConfigs) {
  if (configEnvironmentComplete) {
    return;
  }

  setEasySoftUtilityHandler(externalConfigs);

  setStateDefaultCode(getApiSuccessCode());

  setUrlGlobalPrefix(getApiVersion());

  setRequestHandler(remoteRequest.Execute);

  logDebug(
    buildPromptModuleInfo(
      modulePackageName,
      'configEnvironment -> config complete',
      moduleName,
    ),
  );

  logConfig(getApplicationInitialConfig(), 'initialConfig');

  logConfig(
    { externalConfigs: getApplicationExternalConfigList() },
    'externalConfigs',
  );

  logConfig(getApplicationMergeConfig(), 'combinedConfig');
}
