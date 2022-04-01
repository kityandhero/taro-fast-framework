import { create } from 'dva-core';
import createLoading from 'dva-loading';

import { recordError } from 'taro-fast-common/es/utils/tools';
import {
  handleCommonDataAssist,
  handleListDataAssist,
  handlePageListDataAssist,
} from 'taro-fast-framework/es/utils/requestAssistor';

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

export default {
  createApp,
  getDispatchWrapper() {
    return app.dispatch;
  },
};
