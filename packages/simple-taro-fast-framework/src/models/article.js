import {
  reducerCollection,
  reducerDefaultParams,
  reducerNameCollection,
  tacitlyState,
} from 'taro-fast-framework/es/utils/dva';
import {
  pretreatmentRemotePageListData,
  pretreatmentRemoteSingleData,
} from 'taro-fast-framework/es/utils/requestAssistor';

import { getData, pageListData } from '../services/article';

export default {
  namespace: 'article',

  state: {
    ...tacitlyState,
  },

  effects: {
    *pageList({ payload, alias }, { call, put }) {
      const response = yield call(pageListData, payload);

      const dataAdjust = pretreatmentRemotePageListData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *get({ payload, alias }, { call, put }) {
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
  },

  reducers: {
    ...reducerCollection,
  },
};
