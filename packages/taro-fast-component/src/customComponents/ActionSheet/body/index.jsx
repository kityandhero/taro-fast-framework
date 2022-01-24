import classNames from 'classnames';
import { View } from '@tarojs/components';

import { ComponentBase } from 'taro-fast-common/es/customComponents';

const defaultProps = {};

class ActionSheetBody extends ComponentBase {
  renderFurther() {
    const { className, style, children } = this.props;

    const rootClass = classNames('tfc-action-sheet__body', className);
    return (
      <View className={rootClass} style={style}>
        {children}
      </View>
    );
  }
}

ActionSheetBody.defaultProps = {
  ...defaultProps,
};

export default ActionSheetBody;
