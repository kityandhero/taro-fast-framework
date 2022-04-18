import {
  reducerCommonCollection,
  tacitlyState,
} from 'taro-fast-framework/es/utils/dva';

import { exchangePhoneData, refreshSessionData } from '../services/session';

export default {
  namespace: 'session',

  state: {
    ...tacitlyState,
  },

  effects: {
    *refreshSession({ payload }, { call, put }) {
      const response = yield call(refreshSessionData, payload);

      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *exchangePhone({ payload }, { call, put }) {
      const response = yield call(exchangePhoneData, payload);

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
