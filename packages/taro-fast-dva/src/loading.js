const SHOW = '@@DVA_LOADING/SHOW';
const HIDE = '@@DVA_LOADING/HIDE';
const NAMESPACE = 'loading';

function createLoading(opts = {}) {
  const namespace = opts.namespace || NAMESPACE;

  const { only = [], except = [] } = opts;
  if (only.length > 0 && except.length > 0) {
    throw Error(
      'It is ambiguous to configurate `only` and `except` items at the same time.',
    );
  }

  const initialState = {
    global: false,
    models: {},
    effects: {},
  };

  const extraReducers = {
    [namespace](state = initialState, { type, payload }) {
      const { namespace: ns, actionType } = payload || {};

      let ret;

      switch (type) {
        case SHOW:
          ret = {
            ...state,
            global: true,
            models: { ...state.models, [ns]: true },
            effects: { ...state.effects, [actionType]: true },
          };
          break;
        case HIDE: {
          const effects = { ...state.effects, [actionType]: false };
          const models = {
            ...state.models,
            [ns]: Object.keys(effects).some(at => {
              const _namespace = at.split('/')[0];
              if (_namespace !== ns) return false;
              return effects[at];
            }),
          };
          const global = Object.keys(models).some(n => {
            return models[n];
          });
          ret = {
            ...state,
            global,
            models,
            effects,
          };
          break;
        }
        default:
          ret = state;
          break;
      }
      return ret;
    },
  };

  function onEffect(effect, { put }, model, actionType) {
    const { namespace: ns } = model;
    if (
      (only.length === 0 && except.length === 0) ||
      (only.length > 0 && only.indexOf(actionType) !== -1) ||
      (except.length > 0 && except.indexOf(actionType) === -1)
    ) {
      return function*(...args) {
        yield put({ type: SHOW, payload: { namespace: ns, actionType } });
        yield effect(...args);
        yield put({ type: HIDE, payload: { namespace: ns, actionType } });
      };
    } else {
      return effect;
    }
  }

  return {
    extraReducers,
    onEffect,
  };
}

export default createLoading;
