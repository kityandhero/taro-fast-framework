import {
  checkStringIsNullOrWhiteSpace,
  isFunction,
  mergeArrowText,
} from 'easy-soft-utility';

import { emptyLogic } from 'taro-fast-common';
import { BaseComponent } from 'taro-fast-component';

import { switchControlAssist } from '../../utils';

const primaryCallName = 'framework::InteractiveBase';

class InteractiveBase extends BaseComponent {
  /**
   * 可见性标记，通过构造函数赋值，请务必不要使用其他渠道赋值。
   * @member {string}
   */
  visibleFlag = '';

  /**
   * 构造函数
   * @param {Object} properties 属性值集合。
   */
  constructor(properties, visibleFlag = '') {
    super(properties);

    if (checkStringIsNullOrWhiteSpace(visibleFlag || '')) {
      throw new Error(
        mergeArrowText(
          this.componentName,
          'constructor(properties, visibleFlag)',
          `visibleFlag disallow empty`,
        ),
      );
    }

    this.visibleFlag = visibleFlag;
  }

  /**
   * get derived state from props。
   * @static
   * @param {Object} nextProperties 即将更改的属性值
   * @param {Object} previousState 之前的 state 值
   * @returns {Object} 更新后的 state 值
   */
  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProperties, previousState) {
    const { externalData } = nextProperties;

    return { externalData };
  }

  getVisibleFlag() {
    this.logCallTrack({}, primaryCallName, 'getVisibleFlag');

    const { flag } = {
      flag: '',
      ...this.props,
    };

    return flag || this.visibleFlag;
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

export { InteractiveBase };
