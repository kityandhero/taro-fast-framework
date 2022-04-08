import { reducerCommonCollection } from 'taro-fast-framework/es/utils/dva';

import { getData } from '../services/weather';

export default {
  namespace: 'weather',

  state: {},

  effects: {
    *get({ payload }, { call, put }) {
      const response = yield call(getData, payload);

      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
  },

  reducers: {
    ...reducerCommonCollection,
  },
};
