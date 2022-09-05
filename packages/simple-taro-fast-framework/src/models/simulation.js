import {
  handleDefaultParams,
  reducerCommonCollection,
  reducerCommonNameCollection,
  tacitlyState,
} from 'taro-fast-framework/es/utils/dva';

import {
  getData,
  getOverviewData,
  pageListData,
  pageListEmptyData,
  singleListData,
  singleListEmptyData,
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
        ...handleDefaultParams,
      });
    },
    *pageListEmpty({ payload }, { call, put }) {
      const response = yield call(pageListEmptyData, payload);

      yield put({
        type: reducerCommonNameCollection.handlePageListData,
        payload: response,
        ...handleDefaultParams,
      });
    },
    *singleList({ payload }, { call, put }) {
      const response = yield call(singleListData, payload);

      yield put({
        type: reducerCommonNameCollection.handleListData,
        payload: response,
        ...handleDefaultParams,
      });
    },
    *singleListEmpty({ payload }, { call, put }) {
      const response = yield call(singleListEmptyData, payload);

      yield put({
        type: reducerCommonNameCollection.handleListData,
        payload: response,
        ...handleDefaultParams,
      });
    },
    *getOverview({ payload }, { call, put }) {
      const response = yield call(getOverviewData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
        ...handleDefaultParams,
      });
    },
    *get({ payload }, { call, put }) {
      const response = yield call(getData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
        ...handleDefaultParams,
      });
    },
    *switchStatus({ payload }, { call, put }) {
      const response = yield call(switchStatusData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
        ...handleDefaultParams,
      });
    },
  },

  reducers: {
    ...reducerCommonCollection,
  },
};
