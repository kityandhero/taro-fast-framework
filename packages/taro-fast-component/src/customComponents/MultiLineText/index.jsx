import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common';

import { BaseComponent } from '../BaseComponent';
import { CenterBox } from '../CenterBox';

const defaultProps = {
  style: {},
  text: '',
  prefixStyle: {},
  prefix: null,
  suffixStyle: {},
  suffix: null,
  fontSize: 28,
  lineHeight: 32,
};

class MultiLineText extends BaseComponent {
  getStyle = () => {
    const { style, lineHeight, fontSize } = this.props;

    return {
      ...(style || {}),
      ...{
        lineHeight: transformSize(lineHeight),
        fontSize: transformSize(fontSize),
      },
    };
  };

  buildPrefix = () => {
    const { prefix, prefixStyle } = this.props;

    if (prefix == null) {
      return null;
    }

    return (
      <View
        style={{
          ...(prefixStyle || {}),
          ...{
            display: 'inline-block',
            verticalAlign: 'top',
          },
        }}
      >
        <CenterBox>{prefix}</CenterBox>
      </View>
    );
  };

  buildSuffix = () => {
    const { suffix, suffixStyle } = this.props;

    if (suffix == null) {
      return null;
    }

    return (
      <View
        style={{
          ...(suffixStyle || {}),
          ...{
            display: 'inline-block',
            verticalAlign: 'top',
          },
        }}
      >
        <CenterBox>{suffix}</CenterBox>
      </View>
    );
  };

  renderFurther() {
    const { text } = this.props;

    const style = this.getStyle();

    return (
      <View style={style}>
        {this.buildPrefix()}
        {text}
        {this.buildSuffix()}
      </View>
    );
  }
}

MultiLineText.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { MultiLineText };
