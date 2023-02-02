import {
  getTacitlyState,
  reducerCollection,
  reducerDefaultParams,
  reducerNameCollection,
} from 'easy-soft-dva';
import { pretreatmentRemoteSingleData } from 'easy-soft-utility';

import { exchangePhoneData, refreshSessionData } from '../services/session';

export function buildSession() {
  return {
    namespace: 'session',

    state: {
      ...getTacitlyState(),
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
}
