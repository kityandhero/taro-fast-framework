import { View } from '@tarojs/components';

import { checkInCollection, isFunction } from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';

import BaseComponent from '../BaseComponent';
import CenterBox from '../CenterBox';

const positionCollection = ['left', 'right'];

const defaultProps = {
  style: {},
  extraContainerStyle: {},
  extraWidth: 'auto',
  extra: null,
  extraPosition: 'right',
  onExtraClick: null,
};

class ExtraBox extends BaseComponent {
  getExtraPosition = () => {
    const { extraPosition } = this.props;

    return checkInCollection(positionCollection, extraPosition)
      ? extraPosition
      : defaultProps.extraPosition;
  };

  getStyle = () => {
    const { style } = this.props;

    return {
      ...style,
      ...{
        position: 'relative',
      },
    };
  };

  getExtraContainerStyle = () => {
    const { extraWidth, extraContainerStyle } = this.props;

    const extraPosition = this.getExtraPosition();

    return {
      ...extraContainerStyle,
      ...{
        position: 'absolute',
        height: '100%',
        top: '0',
        width: transformSize(extraWidth),
      },
      ...(extraPosition === 'right' ? { right: '0' } : { left: '0' }),
    };
  };

  triggerClick = () => {
    const { onExtraClick } = this.props;

    if (isFunction(onExtraClick)) {
      onExtraClick();
    }
  };

  renderFurther() {
    const { extra, children } = this.props;

    const style = this.getStyle();

    return (
      <View style={style}>
        {children}

        {extra == null ? null : (
          <View
            style={this.getExtraContainerStyle()}
            onClick={this.triggerClick}
          >
            <CenterBox>{extra}</CenterBox>
          </View>
        )}
      </View>
    );
  }
}

ExtraBox.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default ExtraBox;
