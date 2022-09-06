import {
  reducerCollection,
  reducerDefaultParams,
  reducerNameCollection,
  tacitlyState,
} from 'taro-fast-framework/es/utils/dva';
import { pretreatmentRemoteSingleData } from 'taro-fast-framework/es/utils/requestAssistor';

import { getCustomerData } from '../services/customer';

export default {
  namespace: 'customer',

  state: {
    ...tacitlyState,
  },

  effects: {
    *getCustomer({ payload, alias }, { call, put }) {
      const response = yield call(getCustomerData, payload);

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
