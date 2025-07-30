import {
  getCheckTicketValidityAliasName,
  getMetaDataAliasName,
  getRefreshSessionAliasName,
  getSignInSilentAliasName,
} from 'taro-fast-common';
import { getVerifySignInResult } from 'taro-fast-framework';

import {
  clearLocalDataWhenSimulationModeChanged,
  getSimulationMode,
  setSimulationMode,
} from '../../utils';
import { PageWrapperCore } from '../PageWrapperCore';

class PageWrapperRemote extends PageWrapperCore {
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

  getRefreshSessionApiEffect = (data) => {
    return {
      type: 'session/refreshSession',
      payload: data,
      alias: getRefreshSessionAliasName(),
    };
  };

  getMetaDataApiEffect = (data) => {
    return {
      type: 'global/getMetaData',
      payload: data,
      alias: getMetaDataAliasName(),
    };
  };

  getCheckTicketValidityApiEffect = (data) => {
    return {
      type: 'entrance/checkTicketValidity',
      payload: data,
      alias: getCheckTicketValidityAliasName(),
    };
  };

  getSignInSilentApiEffect = (data) => {
    return {
      type: 'entrance/signInSilent',
      payload: data,
      alias: getSignInSilentAliasName(),
    };
  };

  getGetCurrentOperatorApiEffect = (data = {}) => {
    return {
      type: 'customer/getCustomer',
      payload: data,
    };
  };

  getExchangePhoneApiEffect = (data = {}) => {
    return {
      type: 'session/exchangePhone',
      payload: data,
    };
  };

  getRegisterWithWeChatApiEffect = (data = {}) => {
    return {
      type: 'entrance/registerWithWeChat',
      payload: data,
    };
  };

  getRegisterApiEffect = (data = {}) => {
    return {
      type: 'entrance/register',
      payload: data,
    };
  };
}

export { PageWrapperRemote };
