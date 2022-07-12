import classNames from 'classnames';
import { Image, Text, View } from '@tarojs/components';

import BaseComponent from '../BaseComponent';

import './index.less';

const SIZE_CLASS = {
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
  className: '',
};

class Avatar extends BaseComponent {
  renderFurther() {
    const { size, circle, image, text, style } = this.props;
    const rootClassName = ['tfc-avatar'];
    const iconSize = SIZE_CLASS[size || 'normal'];
    const classObject = {
      [`tfc-avatar--${iconSize}`]: iconSize,
      'tfc-avatar--circle': circle,
    };

    let letter = '';

    if (text) letter = text[0];

    let elem;

    if (image) {
      elem = <Image className="tfc-avatar__img" src={image} />;
    } else {
      elem = (
        <Text className="tfc-avatar__text" userSelect>
          {letter}
        </Text>
      );
    }

    return (
      <View
        className={classNames(rootClassName, classObject, this.props.className)}
        style={style}
      >
        {elem}
      </View>
    );
  }
}

Avatar.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default Avatar;
