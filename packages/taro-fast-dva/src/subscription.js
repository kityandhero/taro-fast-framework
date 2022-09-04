import warning from 'warning';

import prefixedDispatch from './prefixedDispatch';
import { isFunction } from './utils';

export function run(subs, model, app, onError) {
  const funcs = [];
  const nonFuncs = [];
  for (const key in subs) {
    if (Object.prototype.hasOwnProperty.call(subs, key)) {
      const sub = subs[key];
      const unListener = sub(
        {
          dispatch: prefixedDispatch(app._store.dispatch, model),
          history: app._history,
        },
        onError,
      );
      if (isFunction(unListener)) {
        funcs.push(unListener);
      } else {
        nonFuncs.push(key);
      }
    }
  }
  return { funcs, nonFuncs };
}

export function unListen(unListeners, namespace) {
  if (!unListeners[namespace]) return;

  const { funcs, nonFuncs } = unListeners[namespace];
  warning(
    nonFuncs.length === 0,
    `[app.unModel] subscription should return unListener function, check these subscriptions ${nonFuncs.join(
      ', ',
    )}`,
  );
  for (const unListener of funcs) {
    unListener();
  }
  delete unListeners[namespace];
}
