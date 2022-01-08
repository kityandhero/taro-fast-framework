import classNames from 'classnames';
import { View, Image } from '@tarojs/components';

import { isFunction } from 'taro-fast-common/es/utils/typeCheck';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import ActivityIndicator from '../ActivityIndicator';
import CenterBox from '../CenterBox';
import VerticalBox from '../VerticalBox';

import './index.less';

const classPrefix = `tfc-image-box`;

const defaultProps = {
  src: '',
  lazyLoad: false,
  aspectRatio: 1,
  imageBoxStyle: {},
  borderRadius: true,
  imageMode: '',
  showMode: 'box',
  circle: false,
  backgroundColor: '',
  showOverlay: false,
  overlayText: '',
  loadingEffect: true,
  decoration: null,
};

class ImageBox extends ComponentBase {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      hide: false,
      loadSuccess: false,
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  onImageLoadSuccess() {
    const { showOverlay: showOverlayValue, loadingEffect: loadingEffectValue } =
      this.props;

    const showOverlay = showOverlayValue || false;

    const loadingEffect = loadingEffectValue || false;

    if (loadingEffect && !showOverlay) {
      this.setState({
        loadSuccess: true,
      });
    }
  }

  onImageError() {
    const { hideWhenLoadError } = this.props;

    if (hideWhenLoadError) {
      this.setState({ hide: true });
    }
  }

  onImageClick() {
    const { clickAction } = this.props;

    if (isFunction(clickAction)) {
      clickAction();
    }
  }

  render() {
    const {
      lazyLoad,
      src,
      aspectRatio,
      imageBoxStyle,
      borderRadius: borderRadiusValue,
      imageMode,
      showMode: showModeValue,
      circle: circleValue,
      backgroundColor: backgroundColorValue,
      showOverlay: showOverlayValue,
      overlayText: overlayTextValue,
      loadingEffect: loadingEffectValue,
      decoration: decorationValue,
    } = {
      ...this.props,
    };

    const { hide, loadSuccess } = this.state;

    let aspectRatioVal = aspectRatio || 1;

    const showOverlay = showOverlayValue || false;

    const loadingEffect = loadingEffectValue || false;

    const overlayText = overlayTextValue || '';

    const decoration = decorationValue || null;

    aspectRatioVal = aspectRatioVal <= 0 ? 1 : aspectRatioVal;

    const borderRadiusDefaultStyle = borderRadiusValue
      ? { borderRadius: '8rpx' }
      : {};

    const circle = circleValue || false;

    if (circle) {
      borderRadiusDefaultStyle.borderRadius = '50%';
    }

    const imageBoxStyleValue = {
      ...imageBoxStyle,
      ...borderRadiusDefaultStyle,
    };

    const backgroundColor =
      (backgroundColorValue || null) == null
        ? {}
        : { backgroundColor: backgroundColorValue };

    const showMode = showModeValue || 'box';

    if (hide) {
      return null;
    }

    if (showMode === 'loading' || showMode === 'box') {
      return (
        <View
          className={classNames(classPrefix)}
          style={{ ...imageBoxStyleValue }}
        >
          {aspectRatioVal === 1 ? (
            <View className={classNames(`${classPrefix}-placeholder-box`)} />
          ) : null}

          {aspectRatioVal !== 1 ? (
            <View
              className={classNames(`${classPrefix}-placeholder-box`)}
              style={{ marginTop: `${aspectRatioVal * 100}%` }}
            />
          ) : null}

          {showOverlay ? (
            <View
              className={classNames(
                `${classPrefix}-overlay-box`,
                `${classPrefix}-overlay-text`,
              )}
              onClick={this.onImageClick}
            >
              <CenterBox fillHeight>
                <VerticalBox>
                  <View
                    className={classNames(`${classPrefix}-overlay-box-text`)}
                  >
                    {overlayText}
                  </View>
                </VerticalBox>
              </CenterBox>
            </View>
          ) : null}

          {showMode == 'loading' ? <ActivityIndicator mode="center" /> : null}

          {loadingEffect && !loadSuccess && !showOverlay && !lazyLoad ? (
            <View
              className={classNames(
                `${classPrefix}-overlay-box`,
                `${classPrefix}-overlay-loading`,
              )}
              onClick={this.onImageClick}
            >
              <View
                className={classNames(`${classPrefix}-overlay-loading-inner`)}
              >
                <ActivityIndicator mode="center" />
              </View>
            </View>
          ) : null}

          {(decoration || null) != null ? (
            <View
              className={classNames(`${classPrefix}-decoration-box`)}
              onClick={this.onImageClick}
            >
              <View
                className={classNames(`${classPrefix}-decoration-box-inner`)}
              >
                <View style={decoration.style}>{decoration.text}</View>
              </View>
            </View>
          ) : null}

          {showMode == 'box' ? (
            <Image
              className={classNames(
                `${classPrefix}-image-item`,
                loadingEffect && !showOverlay
                  ? !loadSuccess
                    ? `${classPrefix}-image-load-animation-init`
                    : `${classPrefix}-image-load-animation`
                  : null,
              )}
              style={{
                ...borderRadiusDefaultStyle,
                ...backgroundColor,
              }}
              src={src}
              lazyLoad={lazyLoad || false}
              mode={imageMode}
              onLoad={() => {
                this.onImageLoadSuccess();
              }}
              onError={() => {
                this.onImageError();
              }}
              onClick={() => {
                this.onImageClick();
              }}
            />
          ) : null}
        </View>
      );
    }
    if (showMode === 'content-image') {
      return (
        <View style={{ ...imageBoxStyleValue }}>
          <Image
            className={classNames(`${classPrefix}-content-image`)}
            src={src}
            lazyLoad={lazyLoad || false}
            mode="widthFix"
            onError={this.onImageError}
            onClick={this.onImageClick}
          />
        </View>
      );
    }

    return null;
  }
}

ImageBox.defaultProps = {
  ...defaultProps,
};

export default ImageBox;
