import invariant from 'invariant';

function identify(value) {
  return value;
}

function handleAction(actionType, reducer = identify, namespace) {
  return (state, action) => {
    const { type } = action;
    invariant(type, 'dispatch: action should be a plain Object with type');
    if (actionType === type) {
      return reducer(state, action, namespace);
    }
    return state;
  };
}

function reduceReducers(...reducers) {
  return (previous, current) =>
    reducers.reduce((p, r) => r(p, current), previous);
}

function handleActions(handlers, defaultState, namespace) {
  const reducers = Object.keys(handlers).map(type =>
    handleAction(type, handlers[type], namespace),
  );
  const reducer = reduceReducers(...reducers);
  return (state = defaultState, action) => reducer(state, action, namespace);
}

export default handleActions;
