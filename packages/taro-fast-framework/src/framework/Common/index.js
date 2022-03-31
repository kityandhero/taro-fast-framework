import { isFunction } from 'taro-fast-common/es/utils/typeCheck';
import { locateResult } from 'taro-fast-common/es/utils/constants';

import Core from '../Core';

const defaultDispatchLocationResultData = {
  locationGet: false,
  locationAuth: locateResult.unknown,
};

class Common extends Core {
  reloadRemoteMetaData = () => {};

  // eslint-disable-next-line no-unused-vars
  reverseGeocoder = ({ location, success, fail }) => {};

  // eslint-disable-next-line no-unused-vars
  dispatchLocationResult = (data = defaultDispatchLocationResultData) => {
    throw new Error(
      'dispatchLocationResult need override, dispatchLocationResult must return a promise',
    );
  };

  getLocationResult() {
    const {
      global: { locationResult },
    } = this.props;

    return locationResult;
  }

  setLocationResult({ data, callback = null }) {
    this.dispatchLocationResult(data).then((d) => {
      if (isFunction(callback)) {
        callback(d);
      }
    });
  }
}

export default Common;
