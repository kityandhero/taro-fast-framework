import {
  reducerCommonCollection,
  tacitlyState,
} from 'taro-fast-framework/es/utils/dva';
import { modelCollection } from 'taro-fast-framework/es/utils/globalModel';

import { getData, exchangeShareData } from '@/services/global';

export default {
  namespace: 'global',

  state: {
    ...(modelCollection || {}),
    ...{
      needSyncUserInfo: false,
      globalQuery: { path: '', query: {}, scene: 0 },
    },
    ...tacitlyState,
  },

  effects: {
    *getMetaData({ payload }, { call, put }) {
      const response = yield call(getData, payload);

      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *exchangeShare({ payload }, { call, put }) {
      const response = yield call(exchangeShareData, payload);

      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
  },

  reducers: {
    ...reducerCommonCollection,
  },
};
