import classNames from 'classnames';
import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  isArray,
  isNumber,
  isString,
  toNumber,
} from 'easy-soft-utility';
import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';

import BaseComponent from '../BaseComponent';

import './index.less';

const classPrefix = `tfc-line`;

const directionCollection = ['horizontal', 'vertical'];

const defaultProps = {
  direction: 'horizontal',
  margin: '',
  color: '',
  width: 0,
  height: 0,
  transparent: false,
  borderRadius: 0,
};

class Line extends BaseComponent {
  getDirection = () => {
    const { direction: directionSource } = this.props;

    const direction = checkInCollection(directionCollection, directionSource)
      ? directionSource
      : 'horizontal';

    return direction;
  };

  getColor = () => {
    const { color, transparent } = this.props;

    if (transparent) {
      return {
        '--background-color': 'transparent',
      };
    }

    if (isString(color)) {
      if (checkStringIsNullOrWhiteSpace(color)) {
        return {};
      }

      return {
        '--background-color': color,
        '--background-image': 'null',
      };
    }

    if (isArray(color)) {
      const a = color.filter(
        (o) => isString(o) && !checkStringIsNullOrWhiteSpace(o),
      );

      if (a.length > 0) {
        return {
          '--background-color': 'null',
          '--background-image': `linear-gradient(45deg, ${a.join()})`,
        };
      }
    }

    return {};
  };

  getStyle = () => {
    const { margin, width, height, borderRadius } = this.props;

    const direction = this.getDirection();

    let sizeStyle = {};
    let marginStyle = {};
    let colorStyle = this.getColor();

    switch (direction) {
      case 'horizontal':
        sizeStyle = {
          ...(isNumber(width) && toNumber(width) > 0
            ? { '--width': transformSize(width) }
            : { '--width': '100%' }),
          ...(isNumber(height) && toNumber(height) > 0
            ? { '--height': transformSize(height) }
            : { '--height': transformSize(1) }),
        };
        break;

      default:
        sizeStyle = {
          ...(isNumber(width) && toNumber(width) > 0
            ? { '--width': transformSize(width) }
            : { '--width': transformSize(1) }),
          ...(isNumber(height) && toNumber(height) > 0
            ? { '--height': transformSize(height) }
            : { '--height': '100%' }),
        };
        break;
    }

    if (!checkStringIsNullOrWhiteSpace(margin)) {
      marginStyle = {
        '--margin': isNumber(margin) ? transformSize(margin) : margin,
      };
    }

    return {
      ...sizeStyle,
      ...(borderRadius > 0
        ? { '--border-radius': transformSize(borderRadius) }
        : {}),
      ...marginStyle,
      ...colorStyle,
    };
  };

  renderFurther() {
    const direction = this.getDirection();
    const style = this.getStyle();

    return (
      <View
        className={classNames(classPrefix, {
          [`${classPrefix}__horizontal`]: direction === 'horizontal',
          [`${classPrefix}__vertical`]: direction === 'vertical',
        })}
        style={style}
      />
    );
  }
}

Line.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default Line;
