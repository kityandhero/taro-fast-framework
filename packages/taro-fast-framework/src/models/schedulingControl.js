import {
  getWeather,
  setLocationMode,
  setModelNameList,
  setWeather,
} from 'src/utils/globalStorageAssist';

import { locateResult } from 'taro-fast-common/es/utils/constants';
import { recordLog, recordObject } from 'taro-fast-common/es/utils/tools';

import {
  checkTicketValidityData,
  exchangePhoneData,
  getAdministrativeDivisionFullData,
  getCustomerData,
  getMetaDataData,
  getWeatherData,
  refreshSessionData,
  registerData,
  registerWithWeChatData,
  signInSilentData,
} from '../services/schedulingControl';
import { defaultSettingsLayoutCustom } from '../utils/defaultSettingsSpecial';
import {
  handleDefaultParams,
  reducerCommonCollection,
  reducerCommonNameCollection,
  tacitlyState,
} from '../utils/dva';

export default {
  namespace: 'schedulingControl',

  state: {
    ...{
      initialLocationModeComplete: false,
      appInitCustomVisible: false,
      modelNameListVisible: false,
      locationResult: {
        locationGet: false,
        locationAuth: locateResult.unknown,
      },
      signInResult: defaultSettingsLayoutCustom.getSignInUnknownFlag(),
      ticketValidityProcessDetection: false,
      signInProcessDetection: false,
    },
    ...tacitlyState,
  },

  effects: {
    *refreshSession({ payload, alias }, { call, put }) {
      const response = yield call(refreshSessionData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
        alias,
        ...handleDefaultParams,
      });
    },
    *checkTicketValidity({ payload, alias }, { call, put }) {
      const response = yield call(checkTicketValidityData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
        alias,
        ...handleDefaultParams,
      });
    },
    *exchangePhone({ payload, alias }, { call, put }) {
      const response = yield call(exchangePhoneData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
        alias,
        ...handleDefaultParams,
      });
    },
    *signInSilent({ payload, alias }, { call, put }) {
      const response = yield call(signInSilentData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
        alias,
        ...handleDefaultParams,
      });
    },
    *getMetaData({ payload, alias }, { call, put }) {
      const response = yield call(getMetaDataData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
        alias,
        ...handleDefaultParams,
      });
    },
    *getCustomer({ payload, alias }, { call, put }) {
      const response = yield call(getCustomerData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
        alias,
        ...handleDefaultParams,
      });
    },
    *getFullAdministrativeDivisionData({ payload, alias }, { call, put }) {
      const response = yield call(getAdministrativeDivisionFullData, payload);

      yield put({
        type: reducerCommonNameCollection.handleListData,
        payload: response,
        alias,
        ...handleDefaultParams,
      });
    },
    *registerWithWeChat({ payload, alias }, { call, put }) {
      const response = yield call(registerWithWeChatData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
        alias,
        ...handleDefaultParams,
      });
    },
    *register({ payload, alias }, { call, put }) {
      const response = yield call(registerData, payload);

      yield put({
        type: reducerCommonNameCollection.handleCommonData,
        payload: response,
        alias,
        ...handleDefaultParams,
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

      if (!initialLocationModeComplete) {
        const { initialLocationMode } = payload;

        setLocationMode(initialLocationMode);
      }

      return {
        ...state,
        initialLocationModeComplete: true,
      };
    },
    changeAppInitCustomVisible(state, { payload }) {
      const { appInitCustomVisible } = state;

      if (!appInitCustomVisible) {
        const { config } = payload;

        recordObject(config);
      }

      return {
        ...state,
        appInitCustomVisible: true,
      };
    },
    changeModelNameListVisible(state, { payload }) {
      const { modelNameListVisible } = state;

      if (!modelNameListVisible) {
        const { modelNameList } = payload;

        recordLog(`all models: ${modelNameList}`);

        setModelNameList(modelNameList);
      }

      return {
        ...state,
        modelNameListVisible: true,
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
