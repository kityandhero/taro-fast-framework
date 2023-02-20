import {
  getTacitlyState,
  pretreatmentRemoteSingleData,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-utility';

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
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
    },

    reducers: {
      ...reducerCollection,
    },
  };
}
