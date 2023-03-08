import {
  getTacitlyState,
  pretreatmentRemoteSingleData,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-utility';

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
          type: reducerNameCollection.reducerRemoteData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
      *exchangePhone({ payload, alias }, { call, put }) {
        const response = yield call(exchangePhoneData, payload);

        const dataAdjust = pretreatmentRemoteSingleData({ source: response });

        yield put({
          type: reducerNameCollection.reducerRemoteData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
    },

    reducers: {
      ...reducerCollection,
    },
  };
}
