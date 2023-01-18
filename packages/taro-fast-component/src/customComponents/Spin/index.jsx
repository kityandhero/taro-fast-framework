import { checkStringIsNullOrWhiteSpace } from 'easy-soft-utility';
import { View } from '@tarojs/components';

import ActivityIndicator from '../ActivityIndicator';
import CenterBox from '../CenterBox';

import './index.less';

const defaultSpinColor = '#13CE66';
const defaultSpinSize = 32;

export const Spin = (props) => {
  const {
    spin: spinValue,
    text: textValue,
    showLoading: showLoadingValue,
    fullscreen: fullscreenValue,
    spinColor: spinColorValue,
    spinSize: spinSizeValue,
    spinType = '',
    overlayBackgroundColor,
    customLoading,
  } = props;

  const spin = spinValue || false;
  const text = textValue || '';
  const showLoading = showLoadingValue || false;
  const fullscreen = fullscreenValue || false;
  const spinColor = spinColorValue || defaultSpinColor;
  const spinSize = spinSizeValue || defaultSpinSize;

  const handleTouchMove = (e) => {
    if (fullscreen) {
      e.stopPropagation();
    }
  };

  return (
    <View className="tfc_spin_containor">
      <View
        className={`tfc_spin_overlay_box ${
          spin ? 'tfc_spin_overlay_box_show' : 'tfc_spin_overlay_box_hide'
        }`}
        style={{
          width: fullscreen ? '100vw' : '100%',
          height: fullscreen ? '100vh' : '100%',
          transition: spin ? null : 'z-index 0.01s ease 0.2s',
        }}
      >
        <View
          className={`tfc_spin_overlay ${
            spin ? 'tfc_spin_overlay_show' : 'tfc_spin_overlay_hide'
          }`}
          style={{
            ...{
              width: fullscreen ? '100vw' : '100%',
              height: fullscreen ? '100vh' : '100%',
              transition: 'opacity 0.2s',
            },
            ...(checkStringIsNullOrWhiteSpace(overlayBackgroundColor)
              ? {}
              : { backgroundColor: overlayBackgroundColor }),
          }}
          catchMove={fullscreen}
          onTouchMove={handleTouchMove}
        >
          <CenterBox>
            {showLoading ? (
              customLoading ? (
                customLoading
              ) : (
                <ActivityIndicator
                  visible={spin}
                  content={text}
                  color={spinColor}
                  type={spinType}
                  size={spinSize}
                />
              )
            ) : (
              <View className="tfc_content_box">{text}</View>
            )}
          </CenterBox>
        </View>
      </View>

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
  customLoading: null,
};
