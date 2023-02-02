import classNames from 'classnames';
import { Text, View } from '@tarojs/components';

import { isFunction, isString } from 'easy-soft-utility';

import BaseComponent from '../../../BaseComponent';
import CenterBox from '../../../CenterBox';

const defaultProps = {
  onClick: null,
};

class ActionSheetItem extends BaseComponent {
  triggerClick = (value, e) => {
    const { onClick } = this.props;

    if (isFunction(onClick)) {
      onClick(value, e);
    }
  };

  renderFurther() {
    const { className, style, value, children } = this.props;

    const rootClass = classNames('tfc-action-sheet__item', className);

    return (
      <View
        className={rootClass}
        hoverClass="tfc-action-sheet__item--hover"
        onClick={(e) => {
          this.triggerClick(value, e);
        }}
      >
        {isString(children) ? (
          <Text style={style} userSelect>
            {children}
          </Text>
        ) : (
          <CenterBox>{children}</CenterBox>
        )}
      </View>
    );
  }
}

ActionSheetItem.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default ActionSheetItem;
