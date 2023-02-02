import classNames from 'classnames';
import { View } from '@tarojs/components';

import { isFunction } from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';

import BaseComponent from '../BaseComponent';
import ImageBox from '../ImageBox';

import { defaultProps } from './config';

const prefixClass = 'tfc-icon';

class Icon extends BaseComponent {
  handleClick = () => {
    const { onClick } = this.props;

    if (isFunction(onClick)) {
      onClick();
    }
  };

  renderFurther() {
    const { style, className, value, size, color, imageMode } = this.props;

    if (imageMode) {
      return (
        <View
          className={classNames(className)}
          style={{
            ...style,
            ...{
              width: transformSize(size),
            },
          }}
          onClick={this.handleClick}
        >
          <ImageBox src={value} />
        </View>
      );
    } else {
      const rootStyle = {
        fontSize: transformSize(size),
        color,
      };

      const iconName = value ? `${prefixClass}-${value}` : '';

      return (
        <View
          className={classNames(prefixClass, iconName, className)}
          style={{ ...rootStyle, ...style }}
          onClick={this.handleClick}
        />
      );
    }
  }
}

Icon.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default Icon;
