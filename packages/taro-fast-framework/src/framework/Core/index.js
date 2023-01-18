import { underlyingExtensionState } from 'easy-soft-utility';

import { getDerivedStateFromPropsForUrlParamsCore } from 'taro-fast-common/es/utils/tools';

import Base from '../Base';

class Core extends Base {
  loadRemoteRequestAfterMount = true;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...underlyingExtensionState,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParamsCore(nextProps, prevState);
  }

  // eslint-disable-next-line no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => false;
}

export default Core;
