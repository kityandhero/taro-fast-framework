import { getVerifySignInResult } from 'taro-fast-framework/es/utils/tools';
import { getApiDataCore } from 'taro-fast-framework/es/utils/actionAssist';

import { clearLocalDataWhenSimulationModeChanged } from '../../utils/tools';
import {
  getSimulationMode,
  setSimulationMode,
} from '../../utils/storageAssist';

import PageWrapperCore from '../PageWrapperCore';

export default class PageWrapperRemote extends PageWrapperCore {
  viewStyle = {
    paddingLeft: 'var(--tfc-18)',
    paddingRight: 'var(--tfc-18)',
    backgroundColor: '#fff',
  };

  adjustInternalData = () => {
    const simulationMode = getSimulationMode();
    const verifySignInResult = getVerifySignInResult();

    if (simulationMode) {
      this.setSignInResult({
        data: verifySignInResult.unknown,
      });

      clearLocalDataWhenSimulationModeChanged();
    }

    setSimulationMode(false);
  };

  initializeInternalData = () => {
    this.adjustInternalData();
  };

  adjustInternalDataOnRepeatedShow = () => {
    clearLocalDataWhenSimulationModeChanged();
  };

  dispatchRefreshSession = (data) => {
    return this.dispatchApi({
      type: 'session/refreshSession',
      payload: data,
    });
  };

  getRefreshSessionApiData = () => {
    const data = getApiDataCore({
      props: this.props,
      modelName: 'session',
    });

    return data;
  };

  dispatchGetMetaData = (data) => {
    return this.dispatchApi({
      type: 'global/getMetaData',
      payload: data,
    });
  };

  getMetaDataApiData = () => {
    const data = getApiDataCore({
      props: this.props,
      modelName: 'global',
    });

    return data;
  };

  dispatchCheckTicketValidity = (data) => {
    return this.dispatchApi({
      type: 'entrance/checkTicketValidity',
      payload: data,
    });
  };

  getCheckTicketValidityApiData = () => {
    const data = getApiDataCore({
      props: this.props,
      modelName: 'entrance',
    });

    return data;
  };

  dispatchSignInSilent = (data) => {
    return this.dispatchApi({
      type: 'entrance/signInSilent',
      payload: data,
    });
  };

  getSignInSilentApiData = () => {
    return getApiDataCore({ props: this.props, modelName: 'entrance' });
  };

  dispatchGetCustomer = (data = {}) => {
    return this.dispatchApi({
      type: 'customer/getCustomer',
      payload: data,
    });
  };

  getCustomerApiData = () => {
    const data = getApiDataCore({
      props: this.props,
      modelName: 'customer',
    });

    return data;
  };

  dispatchExchangePhone = (data = {}) => {
    return this.dispatchApi({
      type: 'session/exchangePhone',
      payload: data,
    });
  };

  getExchangePhoneApiData = () => {
    return getApiDataCore({
      props: this.props,
      modelName: 'session',
    });
  };

  dispatchRegisterWithWeChat = (data = {}) => {
    return this.dispatchApi({
      type: 'entrance/registerWithWeChat',
      payload: data,
    });
  };

  getRegisterWithWeChatApiData = () => {
    return getApiDataCore({
      props: this.props,
      modelName: 'entrance',
    });
  };

  dispatchRegister = (data = {}) => {
    return this.dispatchApi({
      type: 'entrance/register',
      payload: data,
    });
  };

  getRegisterApiData = () => {
    return getApiDataCore({
      props: this.props,
      modelName: 'entrance',
    });
  };
}
