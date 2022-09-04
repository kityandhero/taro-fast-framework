import invariant from 'invariant';
import { combineReducers } from 'redux';
import createSagaMiddleware, * as saga from 'redux-saga';

import checkModel from './checkModel';
import createPromiseMiddleware from './createPromiseMiddleware';
import createStore from './createStore';
import getReducer from './getReducer';
import getSaga from './getSaga';
import Plugin, { filterHooks } from './Plugin';
import prefixNamespace from './prefixNamespace';
import {
  run as runSubscription,
  unListen as unListenSubscription,
} from './subscription';
import * as utils from './utils';

const { noop, findIndex } = utils;

// Internal model to update global state when do unmodel
const dvaModel = {
  namespace: '@@dva',
  state: 0,
  reducers: {
    UPDATE(state) {
      return state + 1;
    },
  },
};

/**
 * Create dva-core instance.
 *
 * @param hooksAndOpts
 * @param createOpts
 */
export function create(hooksAndOpts = {}, createOpts = {}) {
  const { initialReducer, setupApp = noop } = createOpts;

  const plugin = new Plugin();
  plugin.use(filterHooks(hooksAndOpts));

  const app = {
    _models: [prefixNamespace({ ...dvaModel })],
    _store: null,
    _plugin: plugin,
    use: plugin.use.bind(plugin),
    model,
    start,
  };
  return app;

  /**
   * Register model before app is started.
   *
   * @param m {Object} model to register
   */
  function model(m) {
    if (process.env.NODE_ENV !== 'production') {
      checkModel(m, app._models);
    }
    const prefixedModel = prefixNamespace({ ...m });
    app._models.push(prefixedModel);
    return prefixedModel;
  }

  /**
   * Inject model after app is started.
   *
   * @param createReducer
   * @param onError
   * @param unListeners
   * @param m
   */
  function injectModel(createReducer, onError, unListeners, m) {
    m = model(m);

    const store = app._store;
    store.asyncReducers[m.namespace] = getReducer(
      m.reducers,
      m.state,
      plugin._handleActions,
    );
    store.replaceReducer(createReducer());
    if (m.effects) {
      store.runSaga(
        app._getSaga(
          m.effects,
          m,
          onError,
          plugin.get('onEffect'),
          hooksAndOpts,
        ),
      );
    }
    if (m.subscriptions) {
      unListeners[m.namespace] = runSubscription(
        m.subscriptions,
        m,
        app,
        onError,
      );
    }
  }

  /**
   * Unregister model.
   *
   * @param createReducer
   * @param reducers
   * @param unListeners
   * @param namespace
   *
   * Unexpected key warn problem:
   * https://github.com/reactjs/redux/issues/1636
   */
  function unModel(createReducer, reducers, unListeners, namespace) {
    const store = app._store;

    // Delete reducers
    delete store.asyncReducers[namespace];
    delete reducers[namespace];
    store.replaceReducer(createReducer());
    store.dispatch({ type: '@@dva/UPDATE' });

    // Cancel effects
    store.dispatch({ type: `${namespace}/@@CANCEL_EFFECTS` });

    // UnListen subscriptions
    unListenSubscription(unListeners, namespace);

    // Delete model from app._models
    app._models = app._models.filter(mo => mo.namespace !== namespace);
  }

  /**
   * Replace a model if it exists, if not, add it to app
   * Attention:
   * - Only available after dva.start gets called
   * - Will not check origin m is strict equal to the new one
   * Useful for HMR
   * @param createReducer
   * @param reducers
   * @param unListeners
   * @param onError
   * @param m
   */
  function replaceModel(createReducer, reducers, unListeners, onError, m) {
    const store = app._store;
    const { namespace } = m;
    const oldModelIdx = findIndex(
      app._models,
      mo => mo.namespace === namespace,
    );

    if (~oldModelIdx) {
      // Cancel effects
      store.dispatch({ type: `${namespace}/@@CANCEL_EFFECTS` });

      // Delete reducers
      delete store.asyncReducers[namespace];
      delete reducers[namespace];

      // UnListen subscriptions
      unListenSubscription(unListeners, namespace);

      // Delete model from app._models
      app._models.splice(oldModelIdx, 1);
    }

    // add new version model to store
    app.model(m);

    store.dispatch({ type: '@@dva/UPDATE' });
  }

  /**
   * Start the app.
   *
   * @returns void
   */
  function start() {
    // Global error handler
    const onError = (err, extension) => {
      if (err) {
        if (typeof err === 'string') err = new Error(err);
        err.preventDefault = () => {
          err._doNotReject = true;
        };
        plugin.apply('onError', e => {
          throw new Error(e.stack || e);
        })(err, app._store.dispatch, extension);
      }
    };

    const sagaMiddleware = createSagaMiddleware();
    const promiseMiddleware = createPromiseMiddleware(app);
    app._getSaga = getSaga.bind(null);

    const sagas = [];
    const reducers = { ...initialReducer };
    for (const m of app._models) {
      reducers[m.namespace] = getReducer(
        m.reducers,
        m.state,
        plugin._handleActions,
      );
      if (m.effects) {
        sagas.push(
          app._getSaga(
            m.effects,
            m,
            onError,
            plugin.get('onEffect'),
            hooksAndOpts,
          ),
        );
      }
    }
    const reducerEnhancer = plugin.get('onReducer');
    const extraReducers = plugin.get('extraReducers');
    invariant(
      Object.keys(extraReducers).every(key => !(key in reducers)),
      `[app.start] extraReducers is conflict with other reducers, reducers list: ${Object.keys(
        reducers,
      ).join(', ')}`,
    );

    // Create store
    app._store = createStore({
      reducers: createReducer(),
      initialState: hooksAndOpts.initialState || {},
      plugin,
      createOpts,
      sagaMiddleware,
      promiseMiddleware,
    });

    const store = app._store;

    // Extend store
    store.runSaga = sagaMiddleware.run;
    store.asyncReducers = {};

    // Execute listeners when state is changed
    const listeners = plugin.get('onStateChange');
    for (const listener of listeners) {
      store.subscribe(() => {
        listener(store.getState());
      });
    }

    // Run sagas
    sagas.forEach(sagaMiddleware.run);

    // Setup app
    setupApp(app);

    // Run subscriptions
    const unListeners = {};
    for (const item of this._models) {
      if (item.subscriptions) {
        unListeners[item.namespace] = runSubscription(
          item.subscriptions,
          item,
          app,
          onError,
        );
      }
    }

    // Setup app.model and app.unModel
    app.model = injectModel.bind(app, createReducer, onError, unListeners);
    app.unModel = unModel.bind(app, createReducer, reducers, unListeners);
    app.replaceModel = replaceModel.bind(
      app,
      createReducer,
      reducers,
      unListeners,
      onError,
    );

    /**
     * Create global reducer for redux.
     *
     * @returns {Object}
     */
    function createReducer() {
      return reducerEnhancer(
        combineReducers({
          ...reducers,
          ...extraReducers,
          ...(app._store ? app._store.asyncReducers : {}),
        }),
      );
    }
  }
}

export { saga };
export { utils };
