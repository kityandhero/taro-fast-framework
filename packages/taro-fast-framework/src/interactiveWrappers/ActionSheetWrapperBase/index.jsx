import { isFunction } from 'easy-soft-utility';

import { emptyLogic } from 'taro-fast-common';

import { ActionSheetExtra } from '../../components';
import { switchControlAssist } from '../../utils';
import { buildPrimaryCallName } from '../definition';
import { InteractiveCancelableBase } from '../InteractiveCancelableBase';

const primaryCallName = buildPrimaryCallName('ActionSheetWrapperBase');

class ActionSheetWrapperBase extends InteractiveCancelableBase {
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

  handleOption = (value, data, event) => {
    this.logCallTrack({}, primaryCallName, 'handleOption');

    switchControlAssist.close(this.getVisibleFlag());

    const { afterOption } = this.props;

    if (isFunction(afterOption)) {
      this.logFunctionCallTrace(
        {},
        primaryCallName,
        'handleOption',
        'afterOption',
      );

      afterOption(value, data, event);
    } else {
      this.logEmptyCallTrace(
        {},
        primaryCallName,
        'handleOption',
        'afterOption',
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
        headerStyle={{
          color: '#000',
        }}
        footerStyle={{
          color: '#828282',
        }}
        {...rest}
        title={this.buildTitle() || ''}
        flag={this.getVisibleFlag()}
        onOptionClick={this.handleOption}
        onCancel={this.handleCancel}
        afterVisibleChange={this.doOtherWhenChangeVisible}
      />
    );
  }
}

export { ActionSheetWrapperBase };
