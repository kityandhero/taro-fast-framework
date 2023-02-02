import {
  getTacitlyState,
  reducerCollection,
  reducerDefaultParams,
  reducerNameCollection,
} from 'easy-soft-dva';
import {
  pretreatmentRemotePageListData,
  pretreatmentRemoteSingleData,
} from 'easy-soft-utility';

import { getData, pageListData } from '../services/article';

export function buildArticle() {
  return {
    namespace: 'article',

    state: {
      ...getTacitlyState(),
    },

    effects: {
      *pageList({ payload, alias }, { call, put }) {
        const response = yield call(pageListData, payload);

        const dataAdjust = pretreatmentRemotePageListData({ source: response });

        yield put({
          type: reducerNameCollection.reducerData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParams,
        });

        return dataAdjust;
      },
      *get({ payload, alias }, { call, put }) {
        const response = yield call(getData, payload);

        const dataAdjust = pretreatmentRemoteSingleData({ source: response });

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
