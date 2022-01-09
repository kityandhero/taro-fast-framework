import { Image, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classNames from 'classnames';

import { ComponentBase } from 'taro-fast-common/es/customComponents';

import './index.less';

const SIZE_CLASS = {
  large: 'large',
  normal: 'normal',
  small: 'small',
};

export default class Avatar extends ComponentBase {
  constructor(props) {
    super(props);

    this.state = {
      isWEAPP: Taro.getEnv() === Taro.ENV_TYPE.WEAPP,
    };
  }

  render() {
    const { size, circle, image, text, customStyle } = this.props;
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
        style={customStyle}
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
  customStyle: {},
  className: '',
};
