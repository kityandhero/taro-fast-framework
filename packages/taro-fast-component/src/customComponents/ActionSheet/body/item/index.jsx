import classNames from 'classnames';
import { View, Text } from '@tarojs/components';

import { isFunction, isString } from 'taro-fast-common/es/utils/typeCheck';

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
          <Text style={style}>{children}</Text>
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
