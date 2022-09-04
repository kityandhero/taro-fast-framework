import invariant from 'invariant';

import { isPlainObject } from './utils';

const hooks = [
  'onError',
  'onStateChange',
  'onAction',
  'onHmr',
  'onReducer',
  'onEffect',
  'extraReducers',
  'extraEnhancers',
  '_handleActions',
];

export function filterHooks(obj) {
  return Object.keys(obj).reduce((memo, key) => {
    if (hooks.indexOf(key) > -1) {
      memo[key] = obj[key];
    }
    return memo;
  }, {});
}

export default class Plugin {
  constructor() {
    this._handleActions = null;
    this.hooks = hooks.reduce((memo, key) => {
      memo[key] = [];
      return memo;
    }, {});
  }

  use(plugin) {
    invariant(
      isPlainObject(plugin),
      'plugin.use: plugin should be plain object',
    );
    const { hooks: hk } = this;
    for (const key in plugin) {
      if (Object.prototype.hasOwnProperty.call(plugin, key)) {
        invariant(hk[key], `plugin.use: unknown plugin property: ${key}`);
        if (key === '_handleActions') {
          this._handleActions = plugin[key];
        } else if (key === 'extraEnhancers') {
          hk[key] = plugin[key];
        } else {
          hk[key].push(plugin[key]);
        }
      }
    }
  }

  apply(key, defaultHandler) {
    const { hooks: hk } = this;
    const validApplyHooks = ['onError', 'onHmr'];
    invariant(
      validApplyHooks.indexOf(key) > -1,
      `plugin.apply: hook ${key} cannot be applied`,
    );
    const fns = hk[key];

    return (...args) => {
      if (fns.length) {
        for (const fn of fns) {
          fn(...args);
        }
      } else if (defaultHandler) {
        defaultHandler(...args);
      }
    };
  }

  get(key) {
    const { hooks: hk } = this;

    invariant(key in hk, `plugin.get: hook ${key} cannot be got`);

    if (key === 'extraReducers') {
      return getExtraReducers(hk[key]);
    } else if (key === 'onReducer') {
      return getOnReducer(hk[key]);
    } else {
      return hk[key];
    }
  }
}

function getExtraReducers(hook) {
  let ret = {};
  for (const reducerObj of hook) {
    ret = { ...ret, ...reducerObj };
  }
  return ret;
}

function getOnReducer(hook) {
  return function(reducer) {
    for (const reducerEnhancer of hook) {
      reducer = reducerEnhancer(reducer);
    }
    return reducer;
  };
}
