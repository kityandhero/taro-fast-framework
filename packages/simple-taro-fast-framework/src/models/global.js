import {
  getTacitlyState,
  modelGlobalCollection,
  pretreatmentRemoteSingleData,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-utility';

import { exchangeShareData, getData } from '../services/global';

export function buildGlobal() {
  return {
    namespace: 'global',

    state: {
      ...modelGlobalCollection,
      ...getTacitlyState(),
    },

    effects: {
      *getMetaData({ payload, alias }, { call, put }) {
        const response = yield call(getData, payload);

        const dataAdjust = pretreatmentRemoteSingleData({ source: response });

        yield put({
          type: reducerNameCollection.reducerRemoteData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
      *exchangeShare({ payload, alias }, { call, put }) {
        const response = yield call(exchangeShareData, payload);

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
