import {
  handleCommonDataAssist,
  handleListDataAssist,
  handlePageListDataAssist,
} from 'taro-fast-framework/es/utils/requestAssistor';

import { pageListData, getOverviewData } from '../services/news';

export default {
  namespace: 'news',

  state: {},

  effects: {
    *pageList({ payload }, { call, put }) {
      const response = yield call(pageListData, payload);

      yield put({
        type: 'handlePageListData',
        payload: response,
      });
    },
    *getOverview({ payload }, { call, put }) {
      const response = yield call(getOverviewData, payload);

      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
  },

  reducers: {
    handleCommonData(state, action) {
      return handleCommonDataAssist(state, action);
    },
    handleListData(state, action) {
      return handleListDataAssist(state, action);
    },
    handlePageListData(state, action) {
      return handlePageListDataAssist(state, action);
    },
  },
};
