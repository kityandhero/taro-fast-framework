import {
  getTacitlyState,
  pretreatmentRemoteSingleData,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
} from 'easy-soft-utility';

import { getOverviewData } from '../services/news';

export function buildNews() {
  return {
    namespace: 'news',

    state: {
      ...getTacitlyState(),
    },

    effects: {
      *getOverview({ payload, alias }, { call, put }) {
        const response = yield call(getOverviewData, payload);

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
