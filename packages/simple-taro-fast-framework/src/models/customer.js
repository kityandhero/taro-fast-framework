import { reducerCommonCollection } from 'taro-fast-framework/es/utils/dva';

import { getCustomerData } from '../services/customer';

export default {
  namespace: 'customer',

  state: {},

  effects: {
    *getCustomer({ payload }, { call, put }) {
      const response = yield call(getCustomerData, payload);

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
