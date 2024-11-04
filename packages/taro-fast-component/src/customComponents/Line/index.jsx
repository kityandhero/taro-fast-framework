import classNames from 'classnames';
import { View } from '@tarojs/components';

import {
  canToNumber,
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  isArray,
  isString,
  toNumber,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';

import { BaseComponent } from '../BaseComponent';

import './index.less';

const classPrefix = `tfc-line`;

const lineDirectionCollection = {
  horizontal: 'horizontal',
  vertical: 'vertical',
};

const defaultProps = {
  direction: 'horizontal',
  margin: '',
  color: '',
  width: '',
  height: '',
  transparent: false,
  borderRadius: 0,
};

class Line extends BaseComponent {
  getDirection = () => {
    const { direction: directionSource } = this.props;

    const direction = checkInCollection(
      [lineDirectionCollection.horizontal, lineDirectionCollection.vertical],
      directionSource,
    )
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
          '--background-image': `linear-gradient(45deg, ${a.join(',')})`,
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
      case 'horizontal': {
        sizeStyle = {
          ...(canToNumber(width) && toNumber(width) > 0
            ? { '--width': transformSize(width) }
            : { '--width': '100%' }),
          ...(canToNumber(height) && toNumber(height) > 0
            ? { '--height': transformSize(height) }
            : { '--height': transformSize(1) }),
        };
        break;
      }

      default: {
        sizeStyle = {
          ...(canToNumber(width) && toNumber(width) > 0
            ? { '--width': transformSize(width) }
            : { '--width': transformSize(1) }),
          ...(canToNumber(height) && toNumber(height) > 0
            ? { '--height': transformSize(height) }
            : { '--height': '100%' }),
        };
        break;
      }
    }

    if (!checkStringIsNullOrWhiteSpace(margin)) {
      marginStyle = {
        '--margin': canToNumber(margin) ? transformSize(margin) : margin,
      };
    }

    return {
      ...sizeStyle,
      ...(canToNumber(borderRadius) && toNumber(borderRadius) > 0
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

export { Line, lineDirectionCollection };
