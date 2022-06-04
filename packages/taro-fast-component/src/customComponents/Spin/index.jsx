import { View } from '@tarojs/components';

import Overlay from '../Overlay';
import Loading from '../Loading';

import './index.less';

const defaultSpinColor = '#13CE66';
const defaultSpinSize = 32;

export const Spin = (props) => {
  const {
    spin: spinValue,
    showLoading: showLoadingValue,
    fullscreen: fullscreenValue,
    spinColor: spinColorValue,
    spinSize: spinSizeValue,
    overlayBackgroundColor,
    duration,
    customerLoading,
  } = props;

  const spin = spinValue || false;
  const showLoading = showLoadingValue || false;
  const fullscreen = fullscreenValue || false;
  const spinColor = spinColorValue || defaultSpinColor;
  const spinSize = spinSizeValue || defaultSpinSize;

  return (
    <View className="tfc_spin_containor">
      <Overlay
        visible={spin}
        mode={fullscreen ? 'fullScreen' : 'fullParent'}
        color={overlayBackgroundColor}
        transparent
        duration={duration}
      >
        {showLoading ? (
          customerLoading ? (
            customerLoading
          ) : (
            <Loading color={spinColor} size={spinSize} />
          )
        ) : null}
      </Overlay>

      {props.children}
    </View>
  );
};

Spin.defaultProps = {
  spin: false,
  fullscreen: false,
  text: '',
  showLoading: true,
  spinColor: defaultSpinColor,
  spinSize: defaultSpinSize,
  overlayBackgroundColor: '#f5f5f5',
  duration: 300,
  customerLoading: null,
};
