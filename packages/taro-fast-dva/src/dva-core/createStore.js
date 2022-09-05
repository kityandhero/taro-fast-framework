import flatten from 'flatten';
import invariant from 'invariant';
import { configureStore } from '@reduxjs/toolkit';

import { isArray, returnSelf } from './utils';

export default function({
  reducers,
  initialState,
  plugin,
  sagaMiddleware,
  promiseMiddleware,
  createOpts: { setupMiddleWares = returnSelf },
}) {
  // extra enhancers
  const extraEnhancers = plugin.get('extraEnhancers');
  invariant(
    isArray(extraEnhancers),
    `[app.start] extraEnhancers should be array, but got ${typeof extraEnhancers}`,
  );

  const extraMiddleWares = plugin.get('onAction');
  const middleWares = setupMiddleWares([
    promiseMiddleware,
    sagaMiddleware,
    ...flatten(extraMiddleWares),
  ]);

  return configureStore({
    reducer: reducers,
    preloadedState: initialState,
    middleware: middleWares,
    enhancers: extraEnhancers,
  });
}
