import { View } from '@tarojs/components';

import {
  canToNumber,
  checkStringIsNullOrWhiteSpace,
  getGuid,
  toNumber,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';

import { BaseComponent } from '../BaseComponent';

const defaultProperties = {
  zIndex: 10,
  image: '',
  backgroundSize: 240,
};

class Watermark extends BaseComponent {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      show: true,
    };

    this.id = getGuid();
    this.canvasId = getGuid();
  }

  getProperties = () => {
    return {
      ...defaultProperties,
      ...this.props,
    };
  };

  renderFurther() {
    const { zIndex, image, backgroundSize, children } = this.getProperties();

    if (checkStringIsNullOrWhiteSpace(image)) {
      return children;
    }

    const backgroundSizeAdjust = canToNumber(backgroundSize)
      ? toNumber(backgroundSize)
      : defaultProperties.backgroundSize;

    return (
      <View
        style={{
          position: 'relative',
          height: '100%',
          width: '100%',
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: zIndex,
            width: '100%',
            height: '100%',
            backgroundRepeat: 'repeat',
            backgroundPosition: '0 0',
            backgroundImage: `url(${image})`,
            backgroundSize: transformSize(backgroundSizeAdjust),
          }}
        ></View>

        {children}
      </View>
    );
  }
}

Watermark.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProperties,
};

export { Watermark };
