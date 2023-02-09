import { underlyingExtensionState } from 'easy-soft-utility';

import { getDerivedStateFromPropertiesForUrlParametersCore } from 'taro-fast-common';

import { Base } from '../Base';

class Core extends Base {
  loadRemoteRequestAfterMount = true;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      ...underlyingExtensionState,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParametersCore(
      nextProperties,
      previousState,
    );
  }

  // eslint-disable-next-line no-unused-vars
  checkNeedUpdate = (preProperties, preState, snapshot) => false;
}

export { Core };
