// import createLoading from 'dva-loading';
import { setCache } from 'taro-fast-common/es/utils/cacheAssist';
import { recordDebug, recordError } from 'taro-fast-common/es/utils/tools';
import { isString, isUndefined } from 'taro-fast-common/es/utils/typeCheck';
import { create } from 'taro-fast-dva/es/dva-core';
import { createLoading } from 'taro-fast-dva/es/dva-loading';

import { defaultSettingsLayoutCustom } from './defaultSettingsSpecial';

let app;
let store;
let dispatch;
let registered;

function createApp(opt) {
  app = create(opt);
  app.use(createLoading({}));

  if (!registered) opt.models.forEach((model) => app.model(model));
  registered = true;
  app.start();

  store = app._store;
  app.getStore = () => store;
  app.use({
    onError(err) {
      recordError(err);
    },
  });

  dispatch = store.dispatch;

  app.dispatch = dispatch;

  return app;
}

export const reducerNameCollection = {
  reducerData: 'reducerData',
};

export const reducerCollection = {
  reducerData(state, action, namespace) {
    return reducerDataAssist(state, action, namespace);
  },
};

function reducerDataAssist(state, action, namespace) {
  const {
    payload: v,
    alias,
    cacheData: cacheData,
  } = {
    ...{
      callback: null,
      pretreatment: null,
      alias: null,
      cacheData: false,
    },
    ...action,
  };

  let result = null;

  if (isUndefined(alias) || !isString(alias)) {
    result = {
      ...state,
      data: v,
      fromRemote: true,
    };
  } else {
    result = {
      ...state,
      fromRemote: true,
    };

    result[alias] = v;
  }

  if (cacheData) {
    const key = `${namespace}_${alias || 'data'}`;

    const cacheResult = setCache({
      key,
      value: v,
    });

    recordDebug(
      `modal ${namespace} cache data, key is ${namespace}_${alias || 'data'}, ${
        cacheResult ? 'cache success' : 'cache fail'
      }.`,
    );
  }

  return result;
}

/**
 * 初始化state
 */
export const tacitlyState = {
  data: {
    code: defaultSettingsLayoutCustom.getApiSuccessCode(),
    message: 'success',
    dataSuccess: true,
    data: {},
    list: [],
    extra: {},
  },
};

export const reducerDefaultParams = {
  cacheData: false,
};

export const handleDefaultParams = {
  callback: null,
  pretreatment: null,
};

export default {
  createApp,
  getDispatchWrapper() {
    return app.dispatch;
  },
};
