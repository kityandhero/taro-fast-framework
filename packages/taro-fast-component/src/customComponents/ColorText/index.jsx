import { View, Text } from '@tarojs/components';

import {
  stringIsNullOrWhiteSpace,
  copyToClipboard,
  getRandomColor,
  transformSize,
} from 'taro-fast-common/es/utils/tools';
import { isFunction, isNumber } from 'taro-fast-common/es/utils/typeCheck';

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
  extra: null,
  extraStyle: {},
  copySuccessCallback: null,
  onClick: null,
};

class ColorText extends BaseComponent {
  triggerClick = () => {
    const { canCopy, copySuccessCallback, text, onClick } = this.props;

    if (canCopy && !stringIsNullOrWhiteSpace(text)) {
      copyToClipboard({
        text,
        successCallback: copySuccessCallback,
      });
    }

    if (isFunction(onClick)) {
      onClick();
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

  buildRight = () => {
    const { textPrefix, text, separator, extra, extraStyle } = this.props;

    const textPrefixStyle = this.buildTextPrefixStyle();

    const separatorStyle = this.buildSeparatorStyle();

    const textStyle = this.buildTextStyle();

    const textPart = (
      <VerticalBox style={{ lineHeight: '1' }}>
        {stringIsNullOrWhiteSpace(textPrefix) ? null : (
          <>
            <Text style={textPrefixStyle || null} userSelect>
              {textPrefix}
            </Text>
            {stringIsNullOrWhiteSpace(separator) ? null : (
              <Text style={separatorStyle || null} userSelect>
                {separator}
              </Text>
            )}
          </>
        )}
        <Text style={textStyle} userSelect>
          {text}
        </Text>
      </VerticalBox>
    );

    if ((extra || null) == null) {
      return textPart;
    }

    return (
      <FlexBox
        flexAuto="left"
        left={text}
        leftStyle={textPart}
        rightStyle={{
          ...{
            ...{ marginLeft: transformSize(12) },
          },
          ...(extraStyle || {}),
        }}
        right={<VerticalBox>{extra}</VerticalBox>}
      />
    );
  };

  renderFurther() {
    const { style: styleSource, icon, iconContainerStyle } = this.props;

    const color = this.getColor();

    const style = {
      ...{ color },
      ...styleSource,
      ...{ display: 'inline-block' },
    };

    return (
      <View
        style={style}
        onClick={() => {
          this.triggerClick();
        }}
      >
        <FlexBox
          flexAuto="right"
          left={icon ? <VerticalBox>{icon}</VerticalBox> : null}
          leftStyle={
            icon
              ? {
                  ...{ marginRight: transformSize(10) },
                  ...iconContainerStyle,
                }
              : {}
          }
          right={this.buildRight()}
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
