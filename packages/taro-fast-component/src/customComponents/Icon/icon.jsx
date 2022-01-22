import classNames from 'classnames';
import { View } from '@tarojs/components';

import { mergeStyle, transformSize } from 'taro-fast-common/es/utils/tools';
import { isFunction } from 'taro-fast-common/es/utils/typeCheck';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import { defaultProps } from './config';

const prefixClass = 'tfc-icon';

class Icon extends ComponentBase {
  handleClick = () => {
    const { onClick } = this.props;

    if (isFunction(onClick)) {
      onClick();
    }
  };

  renderFurther() {
    const { customStyle, className, value, size, color, hidden } = this.props;

    const rootStyle = {
      fontSize: transformSize(size),
      color,
    };

    const iconName = value ? `${prefixClass}-${value}` : '';

    if (!!hidden) {
      return null;
    }

    return (
      <View
        className={classNames(prefixClass, iconName, className)}
        style={mergeStyle(rootStyle, customStyle)}
        onClick={this.handleClick}
      />
    );
  }
}

Icon.defaultProps = {
  ...defaultProps,
};

export default Icon;
