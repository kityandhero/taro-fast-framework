import classNames from 'classnames';
import { View } from '@tarojs/components';

import {
  inCollection,
  stringIsNullOrWhiteSpace,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import {
  isArray,
  isNumber,
  isString,
} from 'taro-fast-common/es/utils/typeCheck';
import { toNumber } from 'taro-fast-common/es/utils/typeConvert';

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
};

class Line extends BaseComponent {
  getDirection = () => {
    const { direction: directionSource } = this.props;

    const direction = inCollection(directionCollection, directionSource)
      ? directionSource
      : 'horizontal';

    return direction;
  };

  getColor = () => {
    const { color } = this.props;

    if (isString(color)) {
      if (stringIsNullOrWhiteSpace(color)) {
        return {};
      }

      return {
        '--background-color': color,
        '--background-image': 'null',
      };
    }

    if (isArray(color)) {
      const a = color.filter(
        (o) => isString(o) && !stringIsNullOrWhiteSpace(o),
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
    const { margin, width, height } = this.props;

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

    if (!stringIsNullOrWhiteSpace(margin)) {
      marginStyle = {
        '--margin': isNumber(margin) ? transformSize(margin) : margin,
      };
    }

    return { ...sizeStyle, ...marginStyle, ...colorStyle };
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
  ...defaultProps,
};

export default Line;
