import {
  getTacitlyState,
  reducerCollection,
  reducerDefaultParams,
  reducerNameCollection,
} from 'easy-soft-dva';

import { pretreatmentRemoteSingleData } from 'taro-fast-framework/es/utils/requestAssistor';

import {
  checkTicketValidityData,
  registerData,
  registerWithWeChatData,
  signInData,
  signInSilentData,
} from '../services/entrance';

export function buildEntrance() {
  return {
    namespace: 'entrance',

    state: {
      ...getTacitlyState(),
    },

    effects: {
      *signIn({ payload, alias }, { call, put }) {
        const response = yield call(signInData, payload);

        const dataAdjust = pretreatmentRemoteSingleData({ source: response });

        yield put({
          type: reducerNameCollection.reducerData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParams,
        });

        return dataAdjust;
      },
      *signInSilent({ payload, alias }, { call, put }) {
        const response = yield call(signInSilentData, payload);

        const dataAdjust = pretreatmentRemoteSingleData({ source: response });

        yield put({
          type: reducerNameCollection.reducerData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParams,
        });

        return dataAdjust;
      },
      *register({ payload, alias }, { call, put }) {
        const response = yield call(registerData, payload);

        const dataAdjust = pretreatmentRemoteSingleData({ source: response });

        yield put({
          type: reducerNameCollection.reducerData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParams,
        });

        return dataAdjust;
      },
      *registerWithWeChat({ payload, alias }, { call, put }) {
        const response = yield call(registerWithWeChatData, payload);

        const dataAdjust = pretreatmentRemoteSingleData({ source: response });

        yield put({
          type: reducerNameCollection.reducerData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParams,
        });

        return dataAdjust;
      },
      *checkTicketValidity({ payload, alias }, { call, put }) {
        const response = yield call(checkTicketValidityData, payload);

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
