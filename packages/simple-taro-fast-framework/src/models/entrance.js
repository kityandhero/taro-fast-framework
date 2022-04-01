import {
  handleCommonDataAssist,
  handleListDataAssist,
  handlePageListDataAssist,
} from 'taro-fast-framework/es/utils/requestAssistor';

import {
  signInData,
  registerData,
  checkTicketValidityData,
} from '../services/entrance';

export default {
  namespace: 'entrance',

  state: {},

  effects: {
    *signIn({ payload }, { call, put }) {
      const response = yield call(signInData, payload);

      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *register({ payload }, { call, put }) {
      const response = yield call(registerData, payload);

      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *checkTicketValidity({ payload }, { call, put }) {
      const response = yield call(checkTicketValidityData, payload);

      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *setSignInProcessDetection({ payload }, { put }) {
      yield put({
        type: 'setSignInProcessDetection',
        payload,
      });
    },
  },

  reducers: {
    setSignInProcessDetection(state, { payload }) {
      return {
        ...state,
        signInProcessDetection: payload,
      };
    },
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
