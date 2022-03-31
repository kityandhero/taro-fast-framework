import {
  getDerivedStateFromPropsForUrlParamsCore,
  showRuntimeError,
} from 'taro-fast-common/es/utils/tools';
import { underlyingExtensionState } from 'taro-fast-common/es/utils/constants';

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

  getGlobal = () => {
    const { global } = this.props;

    if ((global || null) == null) {
      const text =
        'global is null, please set it to props or override function getGlobal. ';

      showRuntimeError({
        message: text,
      });

      throw new Error(text);
    }

    return global;
  };

  getDispatch = () => {
    const { dispatch } = this.props;

    if ((dispatch || null) == null) {
      const text =
        'dispatch is null, please set it to props or override function getDispatch. ';

      showRuntimeError({
        message: text,
      });

      throw new Error(text);
    }

    return dispatch;
  };
}

export default Core;
