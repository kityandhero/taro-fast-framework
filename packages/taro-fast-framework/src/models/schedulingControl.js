import {
  locateResult,
  verifySignInResult,
} from 'taro-fast-common/es/utils/constants';

import { reducerCommonCollection } from '../utils/dva';

export default {
  namespace: 'schedulingControl',

  state: {
    locationResult: {
      locationGet: false,
      locationAuth: locateResult.unknown,
    },
    signInResult: verifySignInResult.unknown,
    ticketValidityProcessDetection: false,
    signInProcessDetection: false,
  },

  effects: {
    *setLocationResult({ payload }, { put }) {
      yield put({
        type: 'changeLocationResult',
        payload,
      });
    },
    *setSignInResult({ payload }, { put }) {
      yield put({
        type: 'changeSignInResult',
        payload,
      });
    },
    *setTicketValidityProcessDetection({ payload }, { put }) {
      yield put({
        type: 'changeTicketValidityProcessDetection',
        payload,
      });
    },
    *setSignInProcessDetection({ payload }, { put }) {
      yield put({
        type: 'changeSignInProcessDetection',
        payload,
      });
    },
  },

  reducers: {
    changeLocationResult(state, { payload }) {
      return {
        ...state,
        locationResult: payload,
      };
    },
    changeSignInResult(state, { payload }) {
      return {
        ...state,
        signInResult: payload,
      };
    },
    changeTicketValidityProcessDetection(state, { payload }) {
      return {
        ...state,
        ticketValidityProcessDetection: payload,
      };
    },
    changeSignInProcessDetection(state, { payload }) {
      return {
        ...state,
        signInProcessDetection: payload,
      };
    },
    ...reducerCommonCollection,
  },
};
