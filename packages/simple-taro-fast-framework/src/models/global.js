import {
  getTacitlyState,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-dva';
import {
  modelGlobalCollection,
  pretreatmentRemoteSingleData,
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
          type: reducerNameCollection.reducerData,
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
          type: reducerNameCollection.reducerData,
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
