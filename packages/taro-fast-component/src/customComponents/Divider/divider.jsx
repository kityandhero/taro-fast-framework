import classNames from 'classnames';
import { View } from '@tarojs/components';

import {
  inCollection,
  stringIsNullOrWhiteSpace,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import { isNumber, isString } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';

const classPrefix = `tfc-divider`;

const contentPositionCollection = ['left', 'right', 'center'];

const defaultProps = {
  contentPosition: 'center',
  lineColor: '',
  lineStyle: 'solid',
  lineWidth: 2,
  color: '',
  padding: 32,
  height: 38,
};

class Divider extends BaseComponent {
  getContentPosition = () => {
    const { contentPosition: contentPositionSource } = this.props;

    return inCollection(contentPositionCollection, contentPositionSource)
      ? contentPositionSource
      : 'center';
  };

  getLineColor = () => {
    const { lineColor } = this.props;

    if (isString(lineColor)) {
      if (stringIsNullOrWhiteSpace(lineColor)) {
        return '';
      }

      return lineColor;
    }

    return '';
  };

  renderFurther() {
    const { height, color, lineStyle, lineWidth, padding, children } =
      this.props;

    const contentPosition = this.getContentPosition();
    const lineColor = this.getLineColor();

    return (
      <View
        className={classNames(classPrefix, {
          [`${classPrefix}__${contentPosition}`]: true,
        })}
        style={{
          ...(isString(color)
            ? {
                '--tfc-color-weak': color,
              }
            : {}),
          ...(isString(lineColor)
            ? {
                '--line-color': lineColor,
              }
            : {}),
          ...(isNumber(lineWidth)
            ? {
                '--line-width': transformSize(lineWidth),
              }
            : {}),
          ...(isString(lineStyle)
            ? {
                '--line-style': lineStyle,
              }
            : {}),
          ...{
            padding: isNumber(padding)
              ? `${transformSize(padding)} 0`
              : padding,
          },
          ...{
            height: transformSize(height > 0 ? height : 38),
          },
        }}
      >
        {children ? (
          <View className={`${classPrefix}__content`}>{children}</View>
        ) : null}
      </View>
    );
  }
}

Divider.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default Divider;
