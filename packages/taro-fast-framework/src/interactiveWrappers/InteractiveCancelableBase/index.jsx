import { isFunction } from 'easy-soft-utility';

import { emptyLogic } from 'taro-fast-common';

import { switchControlAssist } from '../../utils';
import { InteractiveBase } from '../InteractiveBase';

const primaryCallName =
  'framework::interactiveWrappers::InteractiveCancelableBase';

class InteractiveCancelableBase extends InteractiveBase {
  /**
   * 构造函数
   * @param {Object} properties 属性值集合。
   */
  constructor(properties, visibleFlag = '') {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
    };
  }

  handleCancel = () => {
    this.logCallTrack({}, primaryCallName, 'handleCancel');

    switchControlAssist.close(this.getVisibleFlag());

    const { afterCancel } = this.props;

    if (isFunction(afterCancel)) {
      this.logFunctionCallTrace(
        {},
        primaryCallName,
        'handleCancel',
        'afterCancel',
      );

      afterCancel();
    } else {
      this.logEmptyCallTrace(
        {},
        primaryCallName,
        'handleCancel',
        'afterCancel',
        emptyLogic,
      );
    }
  };
}

export { InteractiveCancelableBase };
