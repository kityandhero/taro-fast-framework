import { View } from '@tarojs/components';

import { stringIsNullOrWhiteSpace } from 'taro-fast-common/es/utils/tools';

import Row from '../Flex/Row';
import Col from '../Flex/Col';
import VerticalBox from '../VerticalBox';
import ActivityIndicator from '../ActivityIndicator';

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
            ...(stringIsNullOrWhiteSpace(overlayBackgroundColor)
              ? {}
              : { backgroundColor: overlayBackgroundColor }),
          }}
          catchMove
          onTouchMove={handleTouchMove}
        >
          <View style={{ height: '100%' }}>
            <Row align="center" style={{ height: '100%' }}>
              <Col size={1} style={{ height: '100%' }} />
              <Col size={10} style={{ height: '100%' }}>
                <VerticalBox alignJustify="center">
                  {showLoading ? (
                    <ActivityIndicator
                      visible={spin}
                      content={text}
                      color={spinColor}
                      type={spinType}
                      size={spinSize}
                    ></ActivityIndicator>
                  ) : (
                    <View className="tfc_content_box">{text}</View>
                  )}
                </VerticalBox>
              </Col>
              <Col size={1} style={{ height: '100%' }} />
            </Row>
          </View>
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
};
