import dva from './dva';

export function getStore(models) {
  const dvaApp = dva.createApp({
    initialState: {},
    models: models,
  });

  const store = dvaApp.getStore();

  return store;
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
