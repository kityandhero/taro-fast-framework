import { Component } from 'react';
import { View } from '@tarojs/components';

import { pxTransform } from 'taro-fast-common/es/utils/tools';
import { toNumber, toString } from 'taro-fast-common/es/utils/typeConvert';

import './index.less';

class Loading extends Component {
  render() {
    const { color, size } = this.props;
    const loadingSize = typeof size === 'string' ? size : toString(size);
    const sizeStyle = {
      width: size ? `${pxTransform(toNumber(loadingSize))}` : '',
      height: size ? `${pxTransform(toNumber(loadingSize))}` : '',
    };
    const colorStyle = {
      border: color ? `1px solid ${color}` : '',
      borderColor: color ? `${color} transparent transparent transparent` : '',
    };
    const ringStyle = Object.assign({}, colorStyle, sizeStyle);

    return (
      <View className="tff_loading" style={sizeStyle}>
        <View className="tff_loading__ring" style={ringStyle}></View>
        <View className="tff_loading__ring" style={ringStyle}></View>
        <View className="tff_loading__ring" style={ringStyle}></View>
      </View>
    );
  }
}

Loading.defaultProps = {
  size: 0,
  color: '',
};

export default Loading;
