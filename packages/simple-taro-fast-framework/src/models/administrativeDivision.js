import {
  getTacitlyState,
  reducerCollection,
  reducerDefaultParams,
  reducerNameCollection,
} from 'easy-soft-dva';
import { pretreatmentRemoteListData } from 'easy-soft-utility';

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
