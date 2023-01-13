import { ENV_TYPE, getEnv as getEnvCore } from '@tarojs/taro';

import { getCache, setCache } from './cacheAssist';
import { envCollection } from './constants';
import { recordExecute, recordInfo } from './log';

const cacheKeyCollection = {
  currentEnv: 'currentEnv',
};

export function checkEnv() {
  recordExecute('checkEnv');

  getEnv();
}

export function getEnv() {
  let v = getCache({
    key: cacheKeyCollection.currentEnv,
  });

  if ((v || null) == null) {
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

  setCache({
    key: cacheKeyCollection.currentEnv,
    value: v,
  });

  recordInfo(`current env -> ${v}`);

  return v;
}
