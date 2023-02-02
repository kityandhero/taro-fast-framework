import {
  getTacitlyState,
  reducerCollection,
  reducerDefaultParams,
  reducerNameCollection,
} from 'easy-soft-dva';
import { pretreatmentRemoteSingleData } from 'easy-soft-utility';

import { modelCollection } from 'taro-fast-framework/es/utils/globalModel';

import { exchangeShareData, getData } from '../services/global';

export function buildGlobal() {
  return {
    namespace: 'global',

    state: {
      ...(modelCollection || {}),
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
          ...reducerDefaultParams,
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
