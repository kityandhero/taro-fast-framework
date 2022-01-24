import classNames from 'classnames';
import { View } from '@tarojs/components';

import { isFunction } from 'taro-fast-common/es/utils/typeCheck';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

const defaultProps = {
  onClick: null,
};

class ActionSheetFooter extends ComponentBase {
  triggerClick = (...args) => {
    const { onClick } = this.props;

    if (isFunction(onClick)) {
      onClick(...args);
    }
  };

  renderFurther() {
    const { className, style, children } = this.props;

    const rootClass = classNames('tfc-action-sheet__footer', className);

    return (
      <View className={rootClass} style={style} onClick={this.triggerClick}>
        {children}
      </View>
    );
  }
}

ActionSheetFooter.defaultProps = {
  ...defaultProps,
};

export default ActionSheetFooter;
