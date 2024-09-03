import { PureComponent } from 'react';
import { View } from '@tarojs/components';

import { checkStringIsNullOrWhiteSpace } from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';

class EverySpace extends PureComponent {
  render() {
    const { size, direction, backgroundColor } = this.props;

    if (size <= 0) {
      return <View />;
    }

    if (direction !== 'vertical' && direction !== 'horizontal') {
      return <View />;
    }

    const customStyle = {
      ...(checkStringIsNullOrWhiteSpace(backgroundColor || '')
        ? {}
        : { backgroundColor: backgroundColor }),
    };

    if (direction === 'horizontal') {
      return (
        <View
          style={{
            height: transformSize(size),
            ...customStyle,
          }}
        />
      );
    }

    if (direction === 'vertical') {
      return (
        <View
          style={{
            height: `100%`,
            width: transformSize(size),
            ...customStyle,
          }}
        />
      );
    }

    return <View />;
  }
}

EverySpace.defaultProps = {
  size: 10,
  direction: 'vertical',
  backgroundColor: 'transparent',
};

export { EverySpace };
