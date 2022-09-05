import {
  handleDefaultParams,
  reducerCommonCollection,
  reducerCommonNameCollection,
  tacitlyState,
} from 'taro-fast-framework/es/utils/dva';

import { getData, pageListData } from '../services/article';

export default {
  namespace: 'article',

  state: {
    ...tacitlyState,
  },

  effects: {
    *pageList({ payload }, { call, put }) {
      const response = yield call(pageListData, payload);
      yield put({
        type: reducerCommonNameCollection.handlePageListData,
        payload: response,
        ...handleDefaultParams,
      });
    },
    *get({ payload }, { call, put }) {
      const response = yield call(getData, payload);
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
