import { reducerCommonCollection } from 'taro-fast-framework/es/utils/dva';

import {
  signInData,
  signInSilentData,
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
    *signInSilent({ payload }, { call, put }) {
      const response = yield call(signInSilentData, payload);

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
  },

  reducers: {
    ...reducerCommonCollection,
  },
};
