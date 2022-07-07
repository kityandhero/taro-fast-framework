import { CustomWrapper } from '@tarojs/components';

import { ComponentBase } from 'taro-fast-common/es/customComponents';

const defaultProps = {
  customWrapper: true,
};

class BaseComponent extends ComponentBase {
  renderView() {
    const { customWrapper } = this.props;

    if (customWrapper) {
      return <CustomWrapper>{this.renderFurther()}</CustomWrapper>;
    }

    return this.renderFurther();
  }
}

BaseComponent.defaultProps = {
  ...ComponentBase.defaultProps,
  ...defaultProps,
};

export default BaseComponent;
