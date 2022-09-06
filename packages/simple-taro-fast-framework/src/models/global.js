import {
  reducerCollection,
  reducerDefaultParams,
  reducerNameCollection,
  tacitlyState,
} from 'taro-fast-framework/es/utils/dva';
import { modelCollection } from 'taro-fast-framework/es/utils/globalModel';
import { pretreatmentRemoteSingleData } from 'taro-fast-framework/es/utils/requestAssistor';

import { exchangeShareData, getData } from '@/services/global';

export default {
  namespace: 'global',

  state: {
    ...(modelCollection || {}),
    ...tacitlyState,
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
