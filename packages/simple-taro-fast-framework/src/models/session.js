import {
  handleDefaultParams,
  reducerCommonCollection,
  reducerCommonNameCollection,
  tacitlyState,
} from 'taro-fast-framework/es/utils/dva';

import { exchangePhoneData, refreshSessionData } from '../services/session';

export default {
  namespace: 'session',

  state: {
    ...tacitlyState,
  },

  effects: {
    *refreshSession({ payload, alias }, { call, put }) {
      const response = yield call(refreshSessionData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
        alias,
        ...handleDefaultParams,
      });
    },
    *exchangePhone({ payload }, { call, put }) {
      const response = yield call(exchangePhoneData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
        ...handleDefaultParams,
      });
    },
  },

  reducers: {
    ...reducerCommonCollection,
  },
};
