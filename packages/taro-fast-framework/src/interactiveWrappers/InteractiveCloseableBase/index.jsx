import { isFunction } from 'easy-soft-utility';

import { emptyLogic } from 'taro-fast-common';

import { switchControlAssist } from '../../utils';
import { buildPrimaryCallName } from '../definition';
import { InteractiveBase } from '../InteractiveBase';

const primaryCallName = buildPrimaryCallName('InteractiveCloseableBase');

class InteractiveCloseableBase extends InteractiveBase {
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

  handleClose = () => {
    this.logCallTrack({}, primaryCallName, 'handleClose');

    switchControlAssist.close(this.getVisibleFlag());

    const { afterClose } = this.props;

    if (isFunction(afterClose)) {
      this.logFunctionCallTrace(
        {},
        primaryCallName,
        'handleCancel',
        'afterClose',
      );

      afterClose();
    } else {
      this.logEmptyCallTrace(
        {},
        primaryCallName,
        'handleCancel',
        'afterClose',
        emptyLogic,
      );
    }
  };
}

export { InteractiveCloseableBase };
