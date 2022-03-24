import classNames from 'classnames';
import { View } from '@tarojs/components';

import BaseComponent from '../../BaseComponent';

const defaultProps = {};

class ActionSheetHeader extends BaseComponent {
  renderFurther() {
    const { className, style, children } = this.props;

    const rootClass = classNames('tfc-action-sheet__header', className);

    return (
      <View className={rootClass} style={style}>
        {children}
      </View>
    );
  }
}

ActionSheetHeader.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default ActionSheetHeader;
