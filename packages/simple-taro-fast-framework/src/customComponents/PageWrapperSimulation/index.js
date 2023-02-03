import { getVerifySignInResult } from 'taro-fast-framework';

import {
  clearLocalDataWhenSimulationModeChanged,
  getSimulationMode,
  setSimulationMode,
} from '../../utils';
import { PageWrapperCore } from '../PageWrapperCore';

class PageWrapperSimulation extends PageWrapperCore {
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

export { PageWrapperSimulation };
