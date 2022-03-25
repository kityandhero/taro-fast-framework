import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';

import Transition from '../Transition';

import BaseComponent from '../BaseComponent';

const defaultProps = {
  show: true,
  top: null,
  right: null,
  bottom: null,
  left: null,
  width: 'auto',
  height: 'auto',
  style: {},
  center: false,
  useTransition: false,
  zIndex: 0,
};

class FixedBox extends BaseComponent {
  renderFurther() {
    const {
      show,
      top,
      left,
      right,
      bottom,
      width,
      height,
      style,
      center,
      useTransition,
      zIndex,
      children,
    } = this.props;

    const styleAdjust = {
      ...(top == null && right == null && bottom == null && left == null
        ? {
            top: '0',
            left: '0',
          }
        : {}),
      ...(top != null ? { top: transformSize(top) } : {}),
      ...(right != null ? { right: transformSize(right) } : {}),
      ...(bottom != null ? { bottom: transformSize(bottom) } : {}),
      ...(left != null ? { left: transformSize(left) } : {}),
      ...(width != 'auto' ? { width: transformSize(width) } : {}),
      ...(height != 'auto' ? { height: transformSize(height) } : {}),
      ...style,
      ...{
        display: 'block',
        position: 'fixed',
        zIndex: zIndex,
      },
      ...(center
        ? { margin: 'auto', left: '0', right: '0', top: '0', bottom: '0' }
        : {}),
    };

    if (!useTransition) {
      return <View style={styleAdjust}>{children}</View>;
    }

    return (
      <Transition show={show} name="fade" style={styleAdjust}>
        {children}
      </Transition>
    );
  }
}

FixedBox.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default FixedBox;
