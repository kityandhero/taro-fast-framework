import { isFunction } from 'easy-soft-utility';

import { emptyLogic } from 'taro-fast-common';

import { ModalExtra } from '../../components';
import { switchControlAssist } from '../../utils';
import { InteractiveBase } from '../InteractiveBase';

const primaryCallName = 'framework::ModalBase';

class ModalBase extends InteractiveBase {
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
        onCancel={this.handleCancel}
      >
        {this.buildContent()}
      </ModalExtra>
    );
  }
}

export { ModalBase };
