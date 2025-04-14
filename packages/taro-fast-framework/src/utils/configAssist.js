import {
  initializeApplication,
  setApplicationInitialOption,
} from 'easy-soft-dva';
import {
  appendApplicationExternalConfig,
  buildPromptModuleInfo,
  getApplicationExternalConfigList,
  getApplicationInitialConfig,
  getApplicationMergeConfig,
  isEmptyObject,
  isObject,
  logConfig,
  logDebug,
  logDevelop,
  setRequestHandler,
  setUrlGlobalPrefix,
} from 'easy-soft-utility';

import { getApiVersion, setEasySoftUtilityHandler } from 'taro-fast-common';

import { buildPromptModuleInfoText, modulePackageName } from './definition';
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
    {
      externalConfigs: getApplicationExternalConfigList(),
    },
    'externalConfigs',
  );

  const applicationMergeConfig = getApplicationMergeConfig();

  logConfig(applicationMergeConfig, 'combinedConfig');

  logDevelop('--------------------------------------------');

  setApplicationInitialOption(applicationMergeConfig);

  initializeApplication();

  logDevelop('--------------------------------------------');
}

export function appendConfigure(config) {
  if (!isObject(config) || isEmptyObject(config)) {
    return;
  }

  appendApplicationExternalConfig(config);

  const applicationMergeConfig = getApplicationMergeConfig();

  logConfig(applicationMergeConfig, 'combinedConfig after append');
}
