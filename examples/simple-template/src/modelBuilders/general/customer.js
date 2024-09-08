import {
  getTacitlyState,
  pretreatmentRemoteSingleData,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-utility';

import { getCurrentInfoData } from '../../services/customer';

export const customerTypeCollection = {
  getCurrentInfo: 'customer/getCurrentInfo',
};

export function buildModel() {
  return {
    namespace: 'customer',

    state: {
      ...getTacitlyState(),
    },

    effects: {
      *getCurrentInfo(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(getCurrentInfoData, payload);

        const dataAdjust = pretreatmentRemoteSingleData({
          source: response,
          successCallback: pretreatmentSuccessCallback || null,
          failCallback: pretreatmentFailCallback || null,
        });

        yield put({
          type: reducerNameCollection.reducerRemoteData,
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
