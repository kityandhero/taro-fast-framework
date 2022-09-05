import {
  handleDefaultParams,
  reducerCommonCollection,
  reducerCommonNameCollection,
  tacitlyState,
} from 'taro-fast-framework/es/utils/dva';

import { getOverviewData } from '../services/news';

export default {
  namespace: 'news',

  state: {
    ...tacitlyState,
  },

  effects: {
    *getOverview({ payload }, { call, put }) {
      const response = yield call(getOverviewData, payload);
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
