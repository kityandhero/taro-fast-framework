import { View, Text } from '@tarojs/components';

import {
  stringIsNullOrWhiteSpace,
  copyToClipboard,
  getRandomColor,
} from 'taro-fast-common/es/utils/tools';
import { isNumber } from 'taro-fast-common/es/utils/typeCheck';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

const defaultProps = {
  randomSeed: 0,
  seedOffset: 0,
  randomColor: false,
  color: '',
  textPrefix: null,
  textPrefixStyle: null,
  text: '',
  separator: ': ',
  separatorStyle: null,
  canCopy: false,
  copySuccessCallback: null,
};

class ColorText extends ComponentBase {
  copyText = () => {
    const { canCopy, copySuccessCallback, text } = this.props;

    if (canCopy && !stringIsNullOrWhiteSpace(text)) {
      copyToClipboard({
        text,
        successCallback: copySuccessCallback,
      });
    }
  };

  render() {
    const {
      textPrefix,
      textPrefixStyle,
      randomSeed,
      seedOffset,
      randomColor,
      color,
      text,
      canCopy,
      separator,
      separatorStyle,
    } = this.props;

    let colorValue = color || '';

    if (randomColor) {
      colorValue = getRandomColor({
        seed: randomSeed + (isNumber(seedOffset) ? Math.abs(seedOffset) : 0),
      });
    }

    const style = {
      ...{ color: 'rgba(0, 0, 0, 0.85)' },
      ...(canCopy ? { cursor: 'pointer' } : {}),
      ...{ display: 'inline-block' },
    };

    const textStyle = {
      ...(!stringIsNullOrWhiteSpace(colorValue) ? { color: colorValue } : {}),
    };

    console.log({
      randomColor,
      colorValue,
      seed: randomSeed + (isNumber(seedOffset) ? Math.abs(seedOffset) : 0),
    });

    return (
      <View
        style={style}
        onClick={() => {
          this.copyText();
        }}
      >
        {stringIsNullOrWhiteSpace(textPrefix) ? (
          ''
        ) : (
          <>
            <Text style={textPrefixStyle || null}>{textPrefix}</Text>
            {stringIsNullOrWhiteSpace(separator) ? null : (
              <Text style={separatorStyle || null}>{separator}</Text>
            )}
          </>
        )}
        <Text style={textStyle}>{text}</Text>
      </View>
    );
  }
}

ColorText.defaultProps = {
  ...defaultProps,
};

export default ColorText;
