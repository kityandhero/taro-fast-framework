import { ENV_TYPE, getEnv as getEnvironmentCore } from '@tarojs/taro';

import {
  checkStringIsNullOrWhiteSpace,
  checkWhetherDevelopmentEnvironment,
  displayTextMessage,
  environmentCollection,
  existCachePool,
  getCache,
  logColorCollection,
  setCache,
} from 'easy-soft-utility';

import { buildPromptModuleInfoText } from './definition';

/**
 * Module Name.
 */
const moduleName = 'envAssist';

const cacheKeyCollection = {
  currentEnv: 'currentEnv',
};

export function checkEnvironment() {
  getEnvironment();
}

export function getEnvironmentPure() {
  let v = environmentCollection.UNKNOWN;

  const environment = getEnvironmentCore();

  switch (environment) {
    case ENV_TYPE.WEAPP: {
      v = environmentCollection.WEAPP;

      break;
    }

    case ENV_TYPE.WEB: {
      v = environmentCollection.WEB;

      break;
    }

    case ENV_TYPE.RN: {
      v = environmentCollection.RN;

      break;
    }

    case ENV_TYPE.SWAN: {
      v = environmentCollection.SWAN;

      break;
    }

    case ENV_TYPE.ALIPAY: {
      v = environmentCollection.ALIPAY;

      break;
    }

    case ENV_TYPE.TT: {
      v = environmentCollection.TT;

      break;
    }

    case ENV_TYPE.QQ: {
      v = environmentCollection.QQ;

      break;
    }

    case ENV_TYPE.JD: {
      v = environmentCollection.JD;

      break;
    }

    default: {
      v = environmentCollection.UNKNOWN;

      break;
    }
  }

  return v;
}

export function getEnvironment() {
  let v = '';

  if (!existCachePool()) {
    return getEnvironmentPure();
  }

  try {
    v = getCache({
      key: cacheKeyCollection.currentEnv,
    });
  } catch (error) {
    console.log(error);

    if (checkWhetherDevelopmentEnvironment()) {
      displayTextMessage({
        text: buildPromptModuleInfoText(
          moduleName,
          'call cache fail with getCache',
        ),
        color: logColorCollection.warn,
        dataDescription: 'warn',
        ancillaryInformation: '',
      });
    }
  }

  if (checkStringIsNullOrWhiteSpace(v)) {
    v = setEnvironmentCache();
  }

  return v;
}

function setEnvironmentCache() {
  let v = getEnvironmentPure();

  try {
    setCache({
      key: cacheKeyCollection.currentEnv,
      value: v,
    });
  } catch {
    if (checkWhetherDevelopmentEnvironment()) {
      displayTextMessage({
        text: buildPromptModuleInfoText('call cache fail with setCache'),
        color: logColorCollection.warn,
        dataDescription: 'warn',
        ancillaryInformation: '',
      });
    }
  }

  if (checkWhetherDevelopmentEnvironment()) {
    displayTextMessage({
      text: buildPromptModuleInfoText(`current env -> ${v}`),
      color: logColorCollection.info,
      dataDescription: 'info',
      ancillaryInformation: '',
    });
  }

  return v;
}

export function checkWeAppEnvironment() {
  const v = getEnvironment();

  return v === environmentCollection.WEAPP;
}

export function checkWebEnvironment() {
  const v = getEnvironment();

  return v === environmentCollection.WEB;
}
