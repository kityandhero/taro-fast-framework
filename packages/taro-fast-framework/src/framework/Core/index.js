import {
  getDerivedStateFromPropsForUrlParamsCore,
  showRuntimeError,
} from "../../utils/tools";
import { underlyingExtensionState } from "../../utils/constants";

import Base from "../Base";

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => false;

  getGlobal = () => {
    const { global } = this.props;

    if ((global || null) == null) {
      const text = "global is null, function getGlobal need override. ";

      showRuntimeError({
        message: text,
      });

      throw new Error(text);
    }

    return global;
  };
}

export default Core;
