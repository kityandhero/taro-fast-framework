import { ENV_TYPE, getEnv as getEnvCore } from '@tarojs/taro';

import {
  buildPromptModuleInfo,
  checkStringIsNullOrWhiteSpace,
  checkWhetherDevelopmentEnvironment,
  displayTextMessage,
  envCollection,
  getCache,
  logColorCollection,
  setCache,
} from 'easy-soft-utility';

import { modulePackageName } from './definition';

/**
 * Module Name.
 */
const moduleName = 'envAssist';

function buildPromptModuleInfoText(text) {
  return buildPromptModuleInfo(modulePackageName, text, moduleName);
}

const cacheKeyCollection = {
  currentEnv: 'currentEnv',
};

export function checkEnv() {
  getEnv();
}

export function getEnv() {
  let v = '';

  try {
    v = getCache({
      key: cacheKeyCollection.currentEnv,
    });
  } catch {
    if (checkWhetherDevelopmentEnvironment()) {
      displayTextMessage({
        text: buildPromptModuleInfoText('call cache fail with getCache'),
        color: logColorCollection.warn,
        dataDescription: 'warn',
        ancillaryInformation: '',
      });
    }
  }

  if (checkStringIsNullOrWhiteSpace(v)) {
    v = setEnvCache();
  }

  return v;
}

function setEnvCache() {
  let v = envCollection.UNKNOWN;

  const env = getEnvCore();

  switch (env) {
    case ENV_TYPE.WEAPP: {
      v = envCollection.WEAPP;

      break;
    }

    case ENV_TYPE.WEB: {
      v = envCollection.WEB;

      break;
    }

    case ENV_TYPE.RN: {
      v = envCollection.RN;

      break;
    }

    case ENV_TYPE.SWAN: {
      v = envCollection.SWAN;

      break;
    }

    case ENV_TYPE.ALIPAY: {
      v = envCollection.ALIPAY;

      break;
    }

    case ENV_TYPE.TT: {
      v = envCollection.TT;

      break;
    }

    case ENV_TYPE.QQ: {
      v = envCollection.QQ;

      break;
    }

    case ENV_TYPE.JD: {
      v = envCollection.JD;

      break;
    }

    default: {
      v = envCollection.UNKNOWN;

      break;
    }
  }

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

export function checkWeAppEnv() {
  const v = getEnv();

  return v === envCollection.WEAPP;
}

export function checkWebEnv() {
  const v = getEnv();

  return v === envCollection.WEB;
}
