import { clearLocalStorage } from 'taro-fast-common/es/utils/tools';
import { getVerifySignInResult } from 'taro-fast-framework/es/utils/tools';
import {
  removeOpenId,
  removeSession,
  removeToken,
} from 'taro-fast-framework/es/utils/globalStorageAssist';

import {
  getSimulationMode,
  setSimulationMode,
} from '../../utils/storageAssist';

import PageWrapperCore from '../PageWrapperCore';

export default class PageWrapperSimulation extends PageWrapperCore {
  adjustInternalData = () => {
    const simulationMode = getSimulationMode();
    const verifySignInResult = getVerifySignInResult();

    if (simulationMode) {
      this.setSignInResult({
        data: verifySignInResult.unknown,
      });

      clearLocalStorage();
    }

    setSimulationMode(true);
  };

  initializeInternalData = () => {
    removeSession();
    removeOpenId();
    removeToken();
  };

  adjustInternalDataOnRepeatedShow = () => {
    this.adjustInternalData();
  };
}
