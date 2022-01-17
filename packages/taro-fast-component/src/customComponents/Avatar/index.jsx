import { Image, Text, View } from '@tarojs/components';
import classNames from 'classnames';

import { ComponentBase } from 'taro-fast-common/es/customComponents';

import './index.less';

const SIZE_CLASS = {
  large: 'large',
  normal: 'normal',
  small: 'small',
};

export default class Avatar extends ComponentBase {
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
      elem = <Text className="tfc-avatar__text">{letter}</Text>;
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
  size: 'normal',
  circle: false,
  text: '',
  image: '',
  style: {},
  className: '',
};
