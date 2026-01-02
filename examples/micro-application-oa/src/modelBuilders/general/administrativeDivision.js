import {
  getTacitlyState,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-utility';

import { singleListTreeThreeLevelData } from '../../services/administrativeDivision';

export const administrativeDivisionTypeCollection = {
  singleListTreeThreeLevel: 'administrativeDivision/singleListTreeThreeLevel',
};

export function buildModel() {
  return {
    namespace: 'administrativeDivision',

    state: {
      ...getTacitlyState(),
    },

    effects: {
      *singleListTreeThreeLevel(
        {
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
        { call, put },
      ) {
        const response = yield call(singleListTreeThreeLevelData, payload);

        const dataAdjust = {
          source: response,
          successCallback: pretreatmentSuccessCallback || null,
          failCallback: pretreatmentFailCallback || null,
        };

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
