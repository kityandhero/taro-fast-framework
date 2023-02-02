import { View } from '@tarojs/components';

import {
  buildRGBColorFromHexColor,
  checkStringIsNullOrWhiteSpace,
  isFunction,
  isNumber,
  toNumber,
} from 'easy-soft-utility';

import { BaseComponent } from '../BaseComponent';

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
      ...(checkStringIsNullOrWhiteSpace(backgroundColor)
        ? {}
        : {
            backgroundColor:
              backgroundColor === 'transparent'
                ? 'transparent'
                : `rgba(${buildRGBColorFromHexColor(
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
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { TranslucentBox };
