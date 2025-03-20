import { isFunction } from 'easy-soft-utility';

import { emptyLogic } from 'taro-fast-common';

import { ActionSheetExtra } from '../../components';
import { switchControlAssist } from '../../utils';
import { buildPrimaryCallName } from '../definition';
import { InteractiveCancelableBase } from '../InteractiveCancelableBase';

const primaryCallName = buildPrimaryCallName('ActionSheetConfirmWrapperBase');

class ActionSheetConfirmWrapperBase extends InteractiveCancelableBase {
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

  handleOk = (value, data, event) => {
    this.logCallTrack({}, primaryCallName, 'handleOk');

    switchControlAssist.close(this.getVisibleFlag());

    const { afterOk } = this.props;

    if (isFunction(afterOk)) {
      this.logFunctionCallTrace(
        {},
        primaryCallName,
        'handleOk',
        'trigger',
        'afterOk',
      );

      afterOk(value, data, event);
    } else {
      this.logEmptyCallTrace(
        {},
        primaryCallName,
        'handleOk',
        'trigger',
        'afterOk',
        emptyLogic,
      );
    }
  };

  buildTitle = () => '';

  renderFurther() {
    this.logRenderCallTrack({}, primaryCallName, 'renderFurther');

    const { ...rest } = this.props;

    return (
      <ActionSheetExtra
        {...rest}
        title={this.buildTitle() || ''}
        flag={this.getVisibleFlag()}
        options={[
          {
            value: 'ok',
            content: '确定',
          },
        ]}
        onOptionClick={this.handleOk}
        onCancel={this.handleCancel}
      />
    );
  }
}

export { ActionSheetConfirmWrapperBase };
