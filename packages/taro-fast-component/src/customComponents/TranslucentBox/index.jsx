import { View } from '@tarojs/components';

import {
  stringIsNullOrWhiteSpace,
  colorHexToRGB,
} from 'taro-fast-common/es/utils/tools';
import { toNumber } from 'taro-fast-common/es/utils/typeConvert';
import { isFunction, isNumber } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';

const defaultProps = {
  style: {},
  backgroundColor: 'transparent',
  alpha: 0.5,
  onClick: null,
};

class TranslucentBox extends BaseComponent {
  buildStyle = () => {
    const { style, backgroundColor, alpha } = this.props;

    let transparency =
      isNumber(alpha) && toNumber(alpha) > 0 ? toNumber(alpha) : 0;

    transparency = transparency > 1 ? 1 : transparency;

    return {
      ...style,
      ...(stringIsNullOrWhiteSpace(backgroundColor)
        ? {}
        : {
            backgroundColor:
              backgroundColor === 'transparent'
                ? 'transparent'
                : `rgba(${colorHexToRGB(
                    backgroundColor,
                    '',
                  )}, ${transparency})`,
          }),
    };
  };

  triggerClick = (value, e) => {
    const { onClick } = this.props;

    if (isFunction(onClick)) {
      onClick(value, e);
    }
  };

  renderFurther() {
    const { children } = this.props;

    const style = this.buildStyle();

    return (
      <View style={{ ...style }} onClick={this.triggerClick}>
        {children}
      </View>
    );
  }
}

TranslucentBox.defaultProps = {
  ...defaultProps,
};

export default TranslucentBox;
