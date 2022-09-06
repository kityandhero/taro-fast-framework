import {
  reducerCollection,
  reducerDefaultParams,
  reducerNameCollection,
  tacitlyState,
} from 'taro-fast-framework/es/utils/dva';
import { pretreatmentRemotePageListData } from 'taro-fast-framework/es/utils/requestAssistor';

import { getOverviewData } from '../services/news';

export default {
  namespace: 'news',

  state: {
    ...tacitlyState,
  },

  effects: {
    *getOverview({ payload, alias }, { call, put }) {
      const response = yield call(getOverviewData, payload);

      const dataAdjust = pretreatmentRemotePageListData({ source: response });

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
