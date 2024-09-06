import {
  initializeApplication,
  setApplicationInitialOption,
} from 'easy-soft-dva';
import {
  buildPromptModuleInfo,
  getApplicationExternalConfigList,
  getApplicationInitialConfig,
  getApplicationMergeConfig,
  logConfig,
  logDebug,
  logDevelop,
  setRequestHandler,
  setUrlGlobalPrefix,
} from 'easy-soft-utility';

import { setEasySoftUtilityHandler } from 'taro-fast-common';

import { buildPromptModuleInfoText, modulePackageName } from './definition';
import { Request as remoteRequest } from './request';
import { getApiVersion } from './settingsAssist';

let configEnvironmentComplete = false;

/**
 * Module Name.
 */
const moduleName = 'configAssist';

export function configEnvironment(externalConfigs) {
  if (configEnvironmentComplete) {
    return;
  }

  logDevelop(
    arguments[0],
    buildPromptModuleInfoText(moduleName, 'configEnvironment'),
  );

  logDevelop('--------config environment start--------');

  setEasySoftUtilityHandler(externalConfigs);

  setUrlGlobalPrefix(getApiVersion());

  setRequestHandler(remoteRequest.Execute);

  logDebug(
    buildPromptModuleInfo(
      modulePackageName,
      'configEnvironment -> config complete',
      moduleName,
    ),
  );

  logDevelop('--------config environment end--------');

  logConfig(getApplicationInitialConfig(), 'initialConfig');

  logConfig(
    { externalConfigs: getApplicationExternalConfigList() },
    'externalConfigs',
  );

  logConfig(getApplicationMergeConfig(), 'combinedConfig');

  logDevelop('--------------------------------------------');

  setApplicationInitialOption();

  initializeApplication();

  logDevelop('--------------------------------------------');
}
