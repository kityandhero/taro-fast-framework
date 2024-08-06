import {
  getTacitlyState,
  pretreatmentRemoteListData,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-utility';

import { singeListData } from '../services/administrativeDivision';

export function buildAdministrativeDivision() {
  return {
    namespace: 'administrativeDivision',

    state: {
      ...getTacitlyState(),
    },

    effects: {
      *singeList({ payload, alias }, { call, put }) {
        const response = yield call(singeListData, payload);

        const dataAdjust = pretreatmentRemoteListData({ source: response });

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
