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

import { getSettingsAgency } from './defaultSettingsSpecial';
import { modulePackageName } from './definition';
import { Request as remoteRequest } from './request';

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

  setStateDefaultCode(getSettingsAgency().getApiSuccessCode());

  setUrlGlobalPrefix(getSettingsAgency().getApiVersion());

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
