import classNames from 'classnames';
import { View } from '@tarojs/components';

import { pxTransform, mergeStyle } from 'taro-fast-common/es/utils/tools';
import { isFunction } from 'taro-fast-common/es/utils/typeCheck';
import { toNumber, toString } from 'taro-fast-common/es/utils/typeConvert';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import { defaultProps } from './config';

class Icon extends ComponentBase {
  handleClick = () => {
    const { onClick } = this.props;

    if (isFunction(onClick)) {
      onClick();
    }
  };

  render() {
    const { customStyle, className, prefixClass, value, size, color, hidden } =
      this.props;

    const rootStyle = {
      fontSize: `${pxTransform(toNumber(toString(size)) * 2)}`,
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
