// import createLoading from 'dva-loading';
import { recordError } from 'taro-fast-common/es/utils/tools';
import { create } from 'taro-fast-dva/es/dva-core';
import { createLoading } from 'taro-fast-dva/es/dva-loading';

import { defaultSettingsLayoutCustom } from './defaultSettingsSpecial';
import {
  handleCommonDataAssist,
  handleListDataAssist,
  handlePageListDataAssist,
} from './requestAssistor';

let app;
let store;
let dispatch;
let registered;

function createApp(opt) {
  app = create(opt);
  app.use(createLoading({}));

  if (!registered) opt.models.forEach(model => app.model(model));
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

export const reducerCommonNameCollection = {
  handleCommonData: 'handleCommonData',
  handleListData: 'handleListData',
  handlePageListData: 'handlePageListData',
};

export const reducerCommonCollection = {
  handleCommonData(state, action) {
    return handleCommonDataAssist(state, action);
  },
  handleListData(state, action) {
    return handleListDataAssist(state, action);
  },
  handlePageListData(state, action) {
    return handlePageListDataAssist(state, action);
  },
};

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

export default {
  createApp,
  getDispatchWrapper() {
    return app.dispatch;
  },
};
