import {
  reducerCollection,
  reducerDefaultParams,
  reducerNameCollection,
  tacitlyState,
} from 'taro-fast-framework/es/utils/dva';
import { pretreatmentRemoteListData } from 'taro-fast-framework/es/utils/requestAssistor';

import { singeListData } from '../services/administrativeDivision';

export default {
  namespace: 'administrativeDivision',

  state: {
    ...tacitlyState,
  },

  effects: {
    *singeList({ payload, alias }, { call, put }) {
      const response = yield call(singeListData, payload);

      const dataAdjust = pretreatmentRemoteListData({ source: response });

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
