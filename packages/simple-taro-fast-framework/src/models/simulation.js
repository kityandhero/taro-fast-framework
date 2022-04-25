import {
  reducerCommonCollection,
  reducerCommonNameCollection,
  tacitlyState,
} from 'taro-fast-framework/es/utils/dva';

import {
  pageListData,
  pageListEmptyData,
  singleListData,
  singleListEmptyData,
  getOverviewData,
  getData,
  switchStatusData,
} from '../services/simulation';

export default {
  namespace: 'simulation',

  state: {
    ...tacitlyState,
  },

  effects: {
    *pageList({ payload }, { call, put }) {
      const response = yield call(pageListData, payload);

      yield put({
        type: reducerCommonNameCollection.handlePageListData,
        payload: response,
      });
    },
    *pageListEmpty({ payload }, { call, put }) {
      const response = yield call(pageListEmptyData, payload);

      yield put({
        type: reducerCommonNameCollection.handlePageListData,
        payload: response,
      });
    },
    *singleList({ payload }, { call, put }) {
      const response = yield call(singleListData, payload);

      yield put({
        type: reducerCommonNameCollection.handleListData,
        payload: response,
      });
    },
    *singleListEmpty({ payload }, { call, put }) {
      const response = yield call(singleListEmptyData, payload);

      yield put({
        type: reducerCommonNameCollection.handleListData,
        payload: response,
      });
    },
    *getOverview({ payload }, { call, put }) {
      const response = yield call(getOverviewData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
      });
    },
    *get({ payload }, { call, put }) {
      const response = yield call(getData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
      });
    },
    *switchStatus({ payload }, { call, put }) {
      const response = yield call(switchStatusData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
      });
    },
  },

  reducers: {
    ...reducerCommonCollection,
  },
};
