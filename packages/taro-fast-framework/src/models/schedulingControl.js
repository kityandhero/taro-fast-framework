import { setLocationMode } from 'src/utils/globalStorageAssist';
import {
  locateResult,
  verifySignInResult,
  whetherString,
} from 'taro-fast-common/es/utils/constants';
import { recordLog, recordObject } from 'taro-fast-common/es/utils/tools';

import { reducerCommonCollection } from '../utils/dva';

export default {
  namespace: 'schedulingControl',

  state: {
    initialLocationModeComplete: whetherString.no,
    appInitCustomVisible: whetherString.no,
    modelNameListVisible: whetherString.no,
    locationResult: {
      locationGet: false,
      locationAuth: locateResult.unknown,
    },
    signInResult: verifySignInResult.unknown,
    ticketValidityProcessDetection: false,
    signInProcessDetection: false,
  },

  effects: {
    *initialLocationMode({ payload }, { put }) {
      yield put({
        type: 'changeInitialLocationModeComplete',
        payload,
      });
    },
    *showAppInitCustom({ payload }, { put }) {
      yield put({
        type: 'changeAppInitCustomVisible',
        payload,
      });
    },
    *showModelNameList({ payload }, { put }) {
      yield put({
        type: 'changeModelNameListVisible',
        payload,
      });
    },
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
    changeInitialLocationModeComplete(state, { payload }) {
      const { initialLocationModeComplete } = state;

      if (initialLocationModeComplete !== whetherString.yes) {
        const { initialLocationMode } = payload;

        setLocationMode(initialLocationMode);
      }

      return {
        ...state,
        initialLocationModeComplete: whetherString.yes,
      };
    },
    changeAppInitCustomVisible(state, { payload }) {
      const { appInitCustomVisible } = state;

      if (appInitCustomVisible !== whetherString.yes) {
        const { config } = payload;

        recordObject(config);
      }

      return {
        ...state,
        appInitCustomVisible: whetherString.yes,
      };
    },
    changeModelNameListVisible(state, { payload }) {
      const { modelNameListVisible } = state;

      if (modelNameListVisible !== whetherString.yes) {
        const { modelNameList } = payload;

        recordLog(modelNameList);
      }

      return {
        ...state,
        modelNameListVisible: whetherString.yes,
      };
    },
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
