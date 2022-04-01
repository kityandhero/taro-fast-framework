import { create } from 'dva-core';
import createLoading from 'dva-loading';

import { recordError } from 'taro-fast-common/es/utils/tools';

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

export default {
  createApp,
  getDispatchWrapper() {
    return app.dispatch;
  },
};
