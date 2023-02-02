import classNames from 'classnames';
import { View } from '@tarojs/components';

import { BaseComponent } from '../../BaseComponent';

const defaultProps = {};

class ActionSheetBody extends BaseComponent {
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
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { ActionSheetBody };
