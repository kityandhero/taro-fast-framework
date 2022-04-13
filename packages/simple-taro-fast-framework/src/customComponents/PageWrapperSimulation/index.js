import { clearLocalStorage } from 'taro-fast-common/es/utils/tools';

import { getSimulationMode } from '../../utils/storageAssist';

import PageWrapperCore from '../PageWrapperCore';

export default class PageWrapper extends PageWrapperCore {
  initializeInternalData = () => {
    const simulationMode = getSimulationMode();

    if (!simulationMode) {
      clearLocalStorage();
    }
  };
}
