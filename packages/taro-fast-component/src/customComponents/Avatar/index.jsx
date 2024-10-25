import classNames from 'classnames';
import { Image, View } from '@tarojs/components';

import { canToNumber, toNumber } from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';

import { BaseComponent } from '../BaseComponent';
import { CenterBox } from '../CenterBox';

import './index.less';

const avatarSizeCollection = {
  large: 'large',
  normal: 'normal',
  small: 'small',
};

const defaultProps = {
  size: 'normal',
  circle: false,
  text: '',
  image: '',
  style: {},
  backgroundColor: '#e5e5e5',
  color: '#fff',
  className: '',
};

class Avatar extends BaseComponent {
  getSize = () => {
    const { size } = this.props;

    let sizeValue = 100;

    if (canToNumber(size)) {
      sizeValue = toNumber(size);

      return sizeValue;
    }

    switch (size) {
      case avatarSizeCollection.large: {
        sizeValue = 120;
        break;
      }

      case avatarSizeCollection.normal: {
        sizeValue = 100;
        break;
      }

      case avatarSizeCollection.small: {
        sizeValue = 80;
        break;
      }

      default: {
        sizeValue = 100;
        break;
      }
    }

    return sizeValue;
  };

  getBoxStyle = () => {
    const { style, backgroundColor, circle, color } = this.props;

    const size = this.getSize();

    return {
      ...style,
      borderRadius: circle ? '50%' : transformSize(toNumber(size * 0.08)),
      boxShadow: `0 0 ${transformSize(toNumber(size * 0.5))} 0 rgb(0 0 0 / 5%)`,
      backgroundColor,
      color,
      width: transformSize(size),
      height: transformSize(size),
    };
  };

  getFontStyle = () => {
    const { color } = this.props;

    const size = this.getSize();

    return {
      fontSize: transformSize(toNumber(size * 0.4)),
      color,
    };
  };

  renderFurther() {
    const { size, circle, image, text } = this.props;
    const rootClassName = ['tfc-avatar'];
    const iconSize = avatarSizeCollection[size || 'normal'];
    const classObject = {
      [`tfc-avatar--${iconSize}`]: iconSize,
      'tfc-avatar--circle': circle,
    };

    const boxStyle = this.getBoxStyle();

    const fontStyle = this.getFontStyle();

    let letter = '';

    if (text) letter = text[0];

    let element;

    element = image ? (
      <Image className="tfc-avatar__img" src={image} />
    ) : (
      <View className="tfc-avatar__text" style={fontStyle} userSelect>
        <CenterBox>{letter}</CenterBox>
      </View>
    );

    return (
      <View
        className={classNames(rootClassName, classObject, this.props.className)}
        style={boxStyle}
      >
        {element}
      </View>
    );
  }
}

Avatar.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { Avatar, avatarSizeCollection };
