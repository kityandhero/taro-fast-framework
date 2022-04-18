import { getVerifySignInResult } from 'taro-fast-framework/es/utils/tools';

import { clearLocalDataWhenSimulationModeChanged } from '../../utils/tools';
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

      clearLocalDataWhenSimulationModeChanged();
    }

    setSimulationMode(true);
  };

  initializeInternalData = () => {
    clearLocalDataWhenSimulationModeChanged();
  };

  adjustInternalDataOnRepeatedShow = () => {
    this.adjustInternalData();
  };
}
