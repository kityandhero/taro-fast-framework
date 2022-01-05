import classNames from 'classnames';
import { View, Image } from '@tarojs/components';

import { isFunction } from 'taro-fast-common/es/utils/typeCheck';
import { ComponentBase } from 'taro-fast-common/es/customComponents';

import { defaultImg } from '../../utils/customConfig';
import ActivityIndicator from '../ActivityIndicator';

import './index.less';

const classPrefix = `tfc-space`;

const defaultProps = {
  defaultImg: '',
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
    } = this.props;

    const { hide, loadSuccess } = this.state;

    let aspectRatioVal = aspectRatio || 1;

    const showOverlay = showOverlayValue || false;

    const loadingEffect = loadingEffectValue || false;

    const overlayText = overlayTextValue || '';

    const decoration = decorationValue || null;

    aspectRatioVal = aspectRatioVal <= 0 ? 1 : aspectRatioVal;

    const borderRadiusDefaultStyle =
      borderRadiusValue && true ? { borderRadius: '8rpx' } : {};

    const circle = circleValue || false;

    if (circle) {
      borderRadiusDefaultStyle.borderRadius = '50%';
    }

    let defaultImage = defaultImg;

    if (src) {
      defaultImage = src;
    }

    const imageBoxStyleValue = {
      ...imageBoxStyle,
      ...borderRadiusDefaultStyle,
      // ...(hide ? { display: "none" } : {})
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
          {aspectRatioVal === 1 ? <View className="placeholderBox" /> : null}

          {aspectRatioVal !== 1 ? (
            <View
              className="placeholderBox"
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
              <View className="at-row at-row__align--center fullHeight">
                <View className="at-col" />
                <View className="at-col at-col-1 at-col--auto">
                  <View className="overlayText">{overlayText}</View>
                </View>
                <View className="at-col" />
              </View>
            </View>
          ) : null}

          {showMode == 'loading' ? <ActivityIndicator mode="center" /> : null}

          {loadingEffect && !loadSuccess && !showOverlay && !lazyLoad ? (
            <View
              className="overlayBox overlayLoading"
              onClick={this.onImageClick}
            >
              <View className="loadingBoxInner">
                <ActivityIndicator mode="center" />
              </View>
            </View>
          ) : null}

          {(decoration || null) != null ? (
            <View className="decorationBox" onClick={this.onImageClick}>
              <View className="decorationBoxInner">
                <View style={decoration.style}>{decoration.text}</View>
              </View>
            </View>
          ) : null}

          {showMode == 'box' ? (
            <Image
              className={`imageItem image${
                loadingEffect && !showOverlay
                  ? !loadSuccess
                    ? ' imageLoadAnimationInit'
                    : ' imageLoadAnimation'
                  : ''
              }`}
              style={{
                ...borderRadiusDefaultStyle,
                ...backgroundColor,
              }}
              src={defaultImage}
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
    if (showMode === 'contentImage') {
      return (
        <View style={{ ...imageBoxStyleValue }}>
          <Image
            className="contentImage"
            src={defaultImage}
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
