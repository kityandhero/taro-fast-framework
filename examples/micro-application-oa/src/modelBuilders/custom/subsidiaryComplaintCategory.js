import {
  getTacitlyState,
  pretreatmentRemoteListData,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-utility';

import { singleListData } from '../../services/subsidiaryComplaintCategory';

export const subsidiaryComplaintCategoryTypeCollection = {
  singleList: 'subsidiaryComplaintCategory/singleList',
};

export function buildModel() {
  return {
    namespace: 'subsidiaryComplaintCategory',

    state: {
      ...getTacitlyState(),
    },

    effects: {
      *singleList(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(singleListData, payload);

        const dataAdjust = pretreatmentRemoteListData({
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
