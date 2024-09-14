import {
  getTacitlyState,
  pretreatmentRemotePageListData,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-utility';

import {
  pageListLatestApproveData,
  pageListWaitApproveData,
} from '../../services/flowCase';

export const flowCaseTypeCollection = {
  pageListWaitApprove: 'flowCase/pageListWaitApprove',
  pageListLatestApprove: 'flowCase/pageListLatestApprove',
};

export function buildModel() {
  return {
    namespace: 'flowCase',

    state: {
      ...getTacitlyState(),
    },

    effects: {
      *pageListWaitApprove(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(pageListWaitApproveData, payload);

        const dataAdjust = pretreatmentRemotePageListData({
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
      *pageListLatestApprove(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(pageListLatestApproveData, payload);

        const dataAdjust = pretreatmentRemotePageListData({
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
