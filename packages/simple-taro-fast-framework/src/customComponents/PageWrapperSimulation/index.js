import { getVerifySignInResult } from 'taro-fast-framework';

import {
  getSimulationMode,
  setSimulationMode,
} from '../../utils/storageAssist';
import { clearLocalDataWhenSimulationModeChanged } from '../../utils/tools';
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
