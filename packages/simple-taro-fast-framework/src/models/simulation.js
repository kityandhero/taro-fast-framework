import {
  getTacitlyState,
  reducerCollection,
  reducerDefaultParams,
  reducerNameCollection,
} from 'easy-soft-dva';

import {
  pretreatmentRemoteListData,
  pretreatmentRemotePageListData,
  pretreatmentRemoteSingleData,
} from 'taro-fast-framework/es/utils/requestAssistor';

import {
  getData,
  getOverviewData,
  pageListData,
  pageListEmptyData,
  singleListData,
  singleListEmptyData,
  switchStatusData,
} from '../services/simulation';

export function buildSimulation() {
  return {
    namespace: 'simulation',

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
      *pageListEmpty({ payload, alias }, { call, put }) {
        const response = yield call(pageListEmptyData, payload);

        const dataAdjust = pretreatmentRemotePageListData({ source: response });

        yield put({
          type: reducerNameCollection.reducerData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParams,
        });

        return dataAdjust;
      },
      *singleList({ payload, alias }, { call, put }) {
        const response = yield call(singleListData, payload);

        const dataAdjust = pretreatmentRemoteListData({ source: response });

        yield put({
          type: reducerNameCollection.reducerData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParams,
        });

        return dataAdjust;
      },
      *singleListEmpty({ payload, alias }, { call, put }) {
        const response = yield call(singleListEmptyData, payload);

        const dataAdjust = pretreatmentRemoteListData({ source: response });

        yield put({
          type: reducerNameCollection.reducerData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParams,
        });

        return dataAdjust;
      },
      *getOverview({ payload, alias }, { call, put }) {
        const response = yield call(getOverviewData, payload);

        const dataAdjust = pretreatmentRemoteSingleData({ source: response });

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
      *switchStatus({ payload, alias }, { call, put }) {
        const response = yield call(switchStatusData, payload);

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
