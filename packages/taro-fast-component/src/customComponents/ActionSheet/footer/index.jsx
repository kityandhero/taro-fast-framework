import classNames from 'classnames';
import { isFunction } from 'easy-soft-utility';
import { View } from '@tarojs/components';

import BaseComponent from '../../BaseComponent';

const defaultProps = {
  onClick: null,
};

class ActionSheetFooter extends BaseComponent {
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
      <View
        className={rootClass}
        hoverClass="tfc-action-sheet__footer--hover"
        style={style}
        onClick={this.triggerClick}
      >
        {children}
      </View>
    );
  }
}

ActionSheetFooter.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default ActionSheetFooter;
