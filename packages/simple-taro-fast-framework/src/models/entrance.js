import {
  reducerCommonCollection,
  reducerCommonNameCollection,
  tacitlyState,
} from 'taro-fast-framework/es/utils/dva';

import {
  checkTicketValidityData,
  registerData,
  registerWithWeChatData,
  signInData,
  signInSilentData,
} from '../services/entrance';

export default {
  namespace: 'entrance',

  state: {
    ...tacitlyState,
  },

  effects: {
    *signIn({ payload }, { call, put }) {
      const response = yield call(signInData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
      });
    },
    *signInSilent({ payload }, { call, put }) {
      const response = yield call(signInSilentData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
      });
    },
    *register({ payload }, { call, put }) {
      const response = yield call(registerData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
      });
    },
    *registerWithWeChat({ payload }, { call, put }) {
      const response = yield call(registerWithWeChatData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
      });
    },
    *checkTicketValidity({ payload }, { call, put }) {
      const response = yield call(checkTicketValidityData, payload);

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
