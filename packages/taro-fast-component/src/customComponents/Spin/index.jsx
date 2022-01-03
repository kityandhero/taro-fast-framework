import { View } from '@tarojs/components';

import Row from '../Flex/Row';
import Col from '../Flex/Col';
import VerticalBox from '../VerticalBox';
import ActivityIndicator from '../ActivityIndicator';

import './index.less';

const defaultSpinColor = '#13CE66';
const defaultSpinSize = 32;

function Spin(props) {
  const {
    spin: spinValue,
    text: textValue,
    showLoading: showLoadingValue,
    fullscreen: fullscreenValue,
    spinColor: spinColorValue,
    spinSize: spinSizeValue,
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
            width: fullscreen ? '100vw' : '100%',
            height: fullscreen ? '100vh' : '100%',
            transition: 'opacity 0.2s',
          }}
          onTouchMove={handleTouchMove}
        >
          <View style={{ height: '100%' }}>
            <Row align="center" style={{ height: '100%' }}>
              <Col size={1} style={{ height: '100%' }} />
              <Col size={10} style={{ height: '120rpx' }}>
                <View>
                  <VerticalBox
                    style={{ height: '100rpx' }}
                    alignJustify="center"
                  >
                    {showLoading ? (
                      <ActivityIndicator
                        isOpened={spin}
                        content={text}
                        color={spinColor}
                        size={spinSize}
                      ></ActivityIndicator>
                    ) : (
                      <View className="tfc_content_box">{text}</View>
                    )}
                  </VerticalBox>
                </View>
              </Col>
              <Col size={1} style={{ height: '100%' }} />
            </Row>
          </View>
        </View>
      </View>

      {props.children}
    </View>
  );
}

Spin.defaultProps = {
  spin: false,
  fullscreen: false,
  text: '',
  showLoading: true,
  spinColor: defaultSpinColor,
  spinSize: defaultSpinSize,
};

export default Spin;
