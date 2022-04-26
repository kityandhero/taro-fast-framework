import {
  reducerCommonCollection,
  reducerCommonNameCollection,
  tacitlyState,
} from 'taro-fast-framework/es/utils/dva';

import { singeListData } from '../services/administrativeDivision';

export default {
  namespace: 'administrativeDivision',

  state: {
    ...tacitlyState,
  },

  effects: {
    *singeList({ payload }, { call, put }) {
      const response = yield call(singeListData, payload);
      yield put({
        type: reducerCommonNameCollection.handleListData,
        payload: response,
      });
    },
  },

  reducers: {
    ...reducerCommonCollection,
  },
};
