import flatten from 'flatten';
import win from 'global/window';
import invariant from 'invariant';
import { applyMiddleware, compose } from 'redux';
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

  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, maxAge: 30 })
      : compose;

  const enhancers = [applyMiddleware(...middleWares), ...extraEnhancers];

  return configureStore({
    reducer: reducers,
    preloadedState: initialState,
    enhancers: composeEnhancers(...enhancers),
  });
}
