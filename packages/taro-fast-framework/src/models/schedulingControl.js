import {
  getWeather,
  setLocationMode,
  setWeather,
} from 'src/utils/globalStorageAssist';
import {
  locateResult,
  verifySignInResult,
  whetherString,
} from 'taro-fast-common/es/utils/constants';
import { recordLog, recordObject } from 'taro-fast-common/es/utils/tools';

import { reducerCommonCollection } from '../utils/dva';

import {
  getWeatherData,
  checkTicketValidityData,
  refreshSessionData,
  signInSilentData,
} from '../services/schedulingControl';

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
    *signInSilent({ payload }, { call, put }) {
      const response = yield call(signInSilentData, payload);

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
    *refreshSession({ payload }, { call, put }) {
      const response = yield call(refreshSessionData, payload);

      yield put({
        type: 'handleCommonData',
        payload: response,
      });
    },
    *getWeather({ payload }, { call, put }) {
      let result = getWeather();

      let fromRemote = false;

      if ((result || null) == null) {
        fromRemote = true;
        result = {};
      }

      if (fromRemote) {
        const response = yield call(getWeatherData, {
          ...payload,
          ...{
            source: 'pc',
            weather_type:
              'observe|forecast_1h|forecast_24h|index|alarm|limit|tips|air|rise',
          },
        });

        const { data: metaData } = response;

        setWeather(metaData);

        result = metaData;
      }

      yield put({
        type: 'changeWeather',
        payload: {
          weather: result,
        },
      });
    },
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
    changeWeather(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
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
