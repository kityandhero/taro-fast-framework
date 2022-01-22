import { View } from '@tarojs/components';

import { toNumber, toString } from 'taro-fast-common/es/utils/typeConvert';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import './index.less';

class Loading extends ComponentBase {
  renderFurther() {
    const { color, size } = this.props;
    const loadingSize = typeof size === 'string' ? size : toString(size);
    const sizeStyle = {
      width: size ? `val(--tfc-${toNumber(loadingSize)})` : '',
      width: size ? `val(--tfc-${toNumber(loadingSize)})` : '',
    };
    const colorStyle = {
      border: color ? `1px solid ${color}` : '',
      borderColor: color ? `${color} transparent transparent transparent` : '',
    };
    const ringStyle = Object.assign({}, colorStyle, sizeStyle);

    return (
      <View className="tfc_loading" style={sizeStyle}>
        <View className="tfc_loading__ring" style={ringStyle}></View>
        <View className="tfc_loading__ring" style={ringStyle}></View>
        <View className="tfc_loading__ring" style={ringStyle}></View>
      </View>
    );
  }
}

Loading.defaultProps = {
  size: 0,
  color: '',
};

export default Loading;
