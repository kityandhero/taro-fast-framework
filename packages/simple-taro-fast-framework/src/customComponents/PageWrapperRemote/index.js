import { clearLocalStorage } from 'taro-fast-common/es/utils/tools';
import { getVerifySignInResult } from 'taro-fast-framework/es/utils/tools';
import { getApiDataCore } from 'taro-fast-framework/es/utils/actionAssist';

import {
  getSimulationMode,
  setSimulationMode,
} from '../../utils/storageAssist';

import PageWrapperCore from '../PageWrapperCore';

export default class PageWrapperRemote extends PageWrapperCore {
  initializeInternalData = () => {
    const simulationMode = getSimulationMode();
    const verifySignInResult = getVerifySignInResult();

    if (simulationMode) {
      this.setSignInResult({
        data: verifySignInResult.unknown,
      });

      clearLocalStorage();
    }

    setSimulationMode(false);
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

  parseTokenFromSignInSilentApiData = (remoteData) => {
    const { token } = remoteData;

    return token || '';
  };
}