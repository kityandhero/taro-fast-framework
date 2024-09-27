import { isFunction } from 'easy-soft-utility';

import { emptyLogic } from 'taro-fast-common';

import { ModalExtra } from '../../components';
import { switchControlAssist } from '../../utils';
import { buildPrimaryCallName } from '../definition';
import { InteractiveCancelableBase } from '../InteractiveCancelableBase';

const primaryCallName = buildPrimaryCallName('ModalWrapperBase');

class ModalWrapperBase extends InteractiveCancelableBase {
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

  handleOk = () => {
    this.logCallTrack({}, primaryCallName, 'handleOk');

    switchControlAssist.close(this.getVisibleFlag());

    const { afterOk } = this.props;

    if (isFunction(afterOk)) {
      this.logFunctionCallTrace({}, primaryCallName, 'handleCancel', 'afterOk');

      afterOk();
    } else {
      this.logEmptyCallTrace(
        {},
        primaryCallName,
        'handleCancel',
        'afterOk',
        emptyLogic,
      );
    }
  };

  buildTitle = () => '';

  buildContent = () => '';

  renderFurther() {
    this.logRenderCallTrack({}, primaryCallName, 'renderFurther');

    const { ...rest } = this.props;

    return (
      <ModalExtra
        {...rest}
        title={this.buildTitle()}
        flag={this.getVisibleFlag()}
        onConfirm={this.handleOk}
        onClose={this.handleCancel}
      >
        {this.buildContent()}
      </ModalExtra>
    );
  }
}

export { ModalWrapperBase };
