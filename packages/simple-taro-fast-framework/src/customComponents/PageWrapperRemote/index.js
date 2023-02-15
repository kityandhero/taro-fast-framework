import {
  getCheckTicketValidityAliasName,
  getMetaDataAliasName,
  getRefreshSessionAliasName,
  getSignInSilentAliasName,
  getVerifySignInResult,
} from 'taro-fast-framework';

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

  dispatchRefreshSession = (data) => {
    return this.dispatchApi({
      type: 'session/refreshSession',
      payload: data,
      alias: getRefreshSessionAliasName(),
    });
  };

  dispatchGetMetaData = (data) => {
    return this.dispatchApi({
      type: 'global/getMetaData',
      payload: data,
      alias: getMetaDataAliasName(),
    });
  };

  dispatchCheckTicketValidity = (data) => {
    return this.dispatchApi({
      type: 'entrance/checkTicketValidity',
      payload: data,
      alias: getCheckTicketValidityAliasName(),
    });
  };

  dispatchSignInSilent = (data) => {
    return this.dispatchApi({
      type: 'entrance/signInSilent',
      payload: data,
      alias: getSignInSilentAliasName(),
    });
  };

  dispatchGetCustomer = (data = {}) => {
    return this.dispatchApi({
      type: 'customer/getCustomer',
      payload: data,
    });
  };

  dispatchExchangePhone = (data = {}) => {
    return this.dispatchApi({
      type: 'session/exchangePhone',
      payload: data,
    });
  };

  dispatchRegisterWithWeChat = (data = {}) => {
    return this.dispatchApi({
      type: 'entrance/registerWithWeChat',
      payload: data,
    });
  };

  dispatchRegister = (data = {}) => {
    return this.dispatchApi({
      type: 'entrance/register',
      payload: data,
    });
  };
}

export { PageWrapperRemote };
