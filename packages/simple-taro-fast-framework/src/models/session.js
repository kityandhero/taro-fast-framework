import {
  reducerCollection,
  reducerDefaultParams,
  reducerNameCollection,
  tacitlyState,
} from 'taro-fast-framework/es/utils/dva';
import { pretreatmentRemoteSingleData } from 'taro-fast-framework/es/utils/requestAssistor';

import { exchangePhoneData, refreshSessionData } from '../services/session';

export default {
  namespace: 'session',

  state: {
    ...tacitlyState,
  },

  effects: {
    *refreshSession({ payload, alias }, { call, put }) {
      const response = yield call(refreshSessionData, payload);

      const dataAdjust = pretreatmentRemoteSingleData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *exchangePhone({ payload, alias }, { call, put }) {
      const response = yield call(exchangePhoneData, payload);

      const dataAdjust = pretreatmentRemoteSingleData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
  },

  reducers: {
    ...reducerCollection,
  },
};
