import {
  getTacitlyState,
  pretreatmentRemotePageListData,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-utility';

import { pageListUsableData } from '../../services/workflow';

export const workflowTypeCollection = {
  pageListUsable: 'workflow/pageListUsable',
};

export function buildModel() {
  return {
    namespace: 'workflow',

    state: {
      ...getTacitlyState(),
    },

    effects: {
      *pageListUsable(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(pageListUsableData, payload);

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
