import {
  getTacitlyState,
  reducerCollection,
  reducerDefaultParams,
  reducerNameCollection,
} from 'easy-soft-dva';

import { pretreatmentRemoteSingleData } from 'taro-fast-framework/es/utils/requestAssistor';

import { getCustomerData } from '../services/customer';

export function buildCustomer() {
  return {
    namespace: 'customer',

    state: {
      ...getTacitlyState(),
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
}
