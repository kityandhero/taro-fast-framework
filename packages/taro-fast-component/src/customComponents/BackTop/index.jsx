import classNames from 'classnames';
import { View } from '@tarojs/components';

import {
  stringIsNullOrWhiteSpace,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import { isFunction } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';
import CenterBox from '../CenterBox';
import Icon from '../Icon';
import Transition from '../Transition';

import './index.less';

const classPrefix = `tfc-back-top`;

const { IconChevronUp } = Icon;

const defaultProps = {
  visible: false,
  bodyStyle: {},
  borderRadius: 16,
  opacity: 0.8,
  icon: '',
  iconSize: 40,
  iconColor: '',
  size: 80,
  transparent: false,
  zIndex: 9999,
  bottom: 160,
  right: 28,
  backgroundColor: 'var(--tfc-color-light)',
  circle: true,
  content: null,
  onClick: null,
};

class BackTop extends BaseComponent {
  getStyle = () => {
    const {
      size,
      transparent,
      zIndex,
      bottom,
      right,
      backgroundColor,
      circle,
      opacity,
      borderRadius,
    } = this.props;

    return {
      ...(circle
        ? { '--border-radius': '50%' }
        : {
            '--border-radius':
              borderRadius > 0
                ? transformSize(borderRadius)
                : transformSize(16),
          }),
      ...(transparent
        ? { '--background-color': 'transparent' }
        : { '--background-color': backgroundColor }),
      ...{
        width: size > 0 ? transformSize(size) : transformSize(80),
        height: size > 0 ? transformSize(size) : transformSize(80),
      },
      ...(zIndex > 0
        ? {
            '--z-index': `${zIndex}`,
          }
        : {}),
      ...{
        '--bottom': bottom > 0 ? transformSize(bottom) : transformSize(160),
      },
      ...{
        '--right': right > 0 ? transformSize(right) : transformSize(28),
      },
      ...(opacity >= 0 && opacity <= 1
        ? {
            '--opacity': `${opacity}`,
          }
        : {}),
    };
  };

  buildContent = () => {
    const { icon, iconSize, iconColor, content } = this.props;

    return content || stringIsNullOrWhiteSpace(icon) ? (
      <IconChevronUp size={iconSize} color={iconColor} />
    ) : (
      <Icon value={icon} size={iconSize} color={iconColor} />
    );
  };

  triggerClick = () => {
    const { onClick } = this.props;

    if (isFunction(onClick)) {
      onClick();
    }
  };

  renderFurther() {
    const { visible, bodyStyle } = this.props;

    const style = this.getStyle();

    return (
      <Transition
        show={visible}
        name="fade"
        className={classNames(classPrefix)}
        style={style}
        onClick={this.triggerClick}
      >
        <View className={classNames(`${classPrefix}__body`)} style={bodyStyle}>
          <CenterBox>{this.buildContent()}</CenterBox>
        </View>
      </Transition>
    );
  }
}

BackTop.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default BackTop;
