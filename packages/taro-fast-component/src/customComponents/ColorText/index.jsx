import { View, Text } from '@tarojs/components';

import {
  stringIsNullOrWhiteSpace,
  copyToClipboard,
  getRandomColor,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import { isNumber } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';

import FlexBox from '../FlexBox';
import VerticalBox from '../VerticalBox';

const defaultProps = {
  style: {},
  fontSize: 28,
  randomSeed: 0,
  seedOffset: 0,
  randomColor: false,
  color: '',
  icon: null,
  iconContainerStyle: {},
  textPrefix: null,
  textPrefixStyle: {},
  text: '',
  textStyle: {},
  separator: ': ',
  separatorStyle: {},
  canCopy: false,
  copySuccessCallback: null,
};

class ColorText extends BaseComponent {
  copyText = () => {
    const { canCopy, copySuccessCallback, text } = this.props;

    if (canCopy && !stringIsNullOrWhiteSpace(text)) {
      copyToClipboard({
        text,
        successCallback: copySuccessCallback,
      });
    }
  };

  getColor = () => {
    const { color, randomSeed, seedOffset, randomColor } = this.props;

    let colorValue = color || 'rgba(0, 0, 0, 0.85)';

    if (randomColor) {
      colorValue = getRandomColor({
        seed: randomSeed + (isNumber(seedOffset) ? Math.abs(seedOffset) : 0),
      });
    }

    return colorValue;
  };

  buildTextPrefixStyle = () => {
    const { textPrefixStyle, fontSize } = this.props;

    const color = this.getColor();

    return {
      ...(!stringIsNullOrWhiteSpace(color) ? { color } : {}),
      ...(fontSize > 0
        ? {
            fontSize: transformSize(fontSize),
          }
        : {}),
      ...textPrefixStyle,
    };
  };

  buildSeparatorStyle = () => {
    const { separatorStyle, fontSize } = this.props;

    const color = this.getColor();

    return {
      ...(!stringIsNullOrWhiteSpace(color) ? { color } : {}),
      ...(fontSize > 0
        ? {
            fontSize: transformSize(fontSize),
          }
        : {}),
      ...separatorStyle,
    };
  };

  buildTextStyle = () => {
    const { textStyle, fontSize } = this.props;

    const color = this.getColor();

    return {
      ...(!stringIsNullOrWhiteSpace(color) ? { color } : {}),
      ...(fontSize > 0
        ? {
            fontSize: transformSize(fontSize),
          }
        : {}),
      ...textStyle,
    };
  };

  renderFurther() {
    const {
      style: styleSource,
      icon,
      iconContainerStyle,
      textPrefix,
      text,
      separator,
    } = this.props;

    const color = this.getColor();

    const style = {
      ...{ color },
      ...styleSource,
      ...{ display: 'inline-block' },
    };

    const textPrefixStyle = this.buildTextPrefixStyle();

    const separatorStyle = this.buildSeparatorStyle();

    const textStyle = this.buildTextStyle();

    return (
      <View
        style={style}
        onClick={() => {
          this.copyText();
        }}
      >
        <FlexBox
          flexAuto="right"
          left={icon ? <VerticalBox>{icon}</VerticalBox> : null}
          leftStyle={
            icon
              ? {
                  ...{ paddingRight: transformSize(10) },
                  ...iconContainerStyle,
                }
              : {}
          }
          right={
            <VerticalBox style={{ lineHeight: '1' }}>
              {stringIsNullOrWhiteSpace(textPrefix) ? null : (
                <>
                  <Text style={textPrefixStyle || null}>{textPrefix}</Text>
                  {stringIsNullOrWhiteSpace(separator) ? null : (
                    <Text style={separatorStyle || null}>{separator}</Text>
                  )}
                </>
              )}
              <Text style={textStyle}>{text}</Text>
            </VerticalBox>
          }
        />
      </View>
    );
  }
}

ColorText.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default ColorText;
