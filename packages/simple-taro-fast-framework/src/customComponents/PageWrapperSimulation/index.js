import { clearLocalStorage } from 'taro-fast-common/es/utils/tools';

import {
  getSimulationMode,
  setSimulationMode,
} from '../../utils/storageAssist';

import PageWrapperCore from '../PageWrapperCore';

export default class PageWrapperSimulation extends PageWrapperCore {
  initializeInternalData = () => {
    const simulationMode = getSimulationMode();

    if (!simulationMode) {
      clearLocalStorage();

      setSimulationMode(true);
    }
  };
}
