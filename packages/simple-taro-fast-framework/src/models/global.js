import {
  handleDefaultParams,
  reducerCommonCollection,
  reducerCommonNameCollection,
  tacitlyState,
} from 'taro-fast-framework/es/utils/dva';
import { modelCollection } from 'taro-fast-framework/es/utils/globalModel';

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

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
        alias,
        ...handleDefaultParams,
      });
    },
    *exchangeShare({ payload }, { call, put }) {
      const response = yield call(exchangeShareData, payload);

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
