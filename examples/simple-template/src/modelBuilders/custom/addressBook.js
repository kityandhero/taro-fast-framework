import {
  getTacitlyState,
  pretreatmentRemoteListData,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-utility';

import {
  singleListDepartmentGroupData,
  singleListLetterGroupData,
} from '../../services/addressBook';

export const addressBookTypeCollection = {
  singleListLetterGroup: 'addressBook/singleListLetterGroup',
  singleListDepartmentGroup: 'addressBook/singleListDepartmentGroup',
};

export function buildModel() {
  return {
    namespace: 'addressBook',

    state: {
      ...getTacitlyState(),
    },

    effects: {
      *singleListLetterGroup(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(singleListLetterGroupData, payload);

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
      *singleListDepartmentGroup(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(singleListDepartmentGroupData, payload);

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
