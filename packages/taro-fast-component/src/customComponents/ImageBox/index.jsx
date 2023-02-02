import classNames from 'classnames';
import { Image, View } from '@tarojs/components';

import { errorImage, isFunction } from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';

import { ActivityIndicator } from '../ActivityIndicator';
import { BaseComponent } from '../BaseComponent';
import { HorizontalCenterBox } from '../HorizontalCenterBox';
import { ScaleBox } from '../ScaleBox';
import { VerticalBox } from '../VerticalBox';

import './index.less';

const classPrefix = `tfc-image-box`;

const defaultProps = {
  src: '',
  padding: 0,
  lazyLoad: false,
  aspectRatio: 1,
  imageBoxStyle: {},
  borderRadius: true,
  imageMode: 'scaleToFill',
  showMode: 'box',
  circle: false,
  backgroundColor: '',
  showOverlay: false,
  overlayText: '',
  loadingEffect: false,
  decoration: null,
  skeletonMode: false,
  errorImage: '',
};

class ImageBox extends BaseComponent {
  constructor(props) {
    super(props);

    const { src } = props;

    this.state = {
      ...this.state,
      ...{
        srcFlag: src,
        srcStage: src,
        hide: false,
        loading: true,
        loadSuccess: false,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { src: srcNext } = nextProps;
    const { srcFlag: srcPrev } = prevState;

    if (srcNext !== srcPrev) {
      return {
        srcFlag: srcNext,
        srcStage: srcNext,
      };
    }

    return {};
  }

  /**
   * onImageLoadSuccess
   */
  onImageLoadSuccess() {
    this.setState({
      loading: false,
      loadSuccess: true,
    });
  }

  /**
   * onImageError
   */
  onImageError() {
    const { hideWhenLoadError, errorImage: errorImageSource } = this.props;

    if (hideWhenLoadError) {
      this.setState({
        hide: true,
        loading: false,
        loadSuccess: false,
        srcStage: errorImageSource || errorImage,
      });
    } else {
      this.setState({
        loading: false,
        loadSuccess: false,
        srcStage: errorImageSource || errorImage,
      });
    }
  }

  onImageClick() {
    const { clickAction } = this.props;

    if (isFunction(clickAction)) {
      clickAction();
    }
  }

  /**
   * 构建上层装饰器
   */
  buildDecoration = () => {
    const { decoration, decorationBuilder } = this.props;

    let decorationComponent = null;

    if (isFunction(decorationBuilder)) {
      decorationComponent = decorationBuilder();
    } else {
      if ((decoration || null) != null) {
        const { style, text } = decoration;

        decorationComponent = <View style={style || {}}>{text || ''}</View>;
      }
    }

    if ((decorationComponent || null) == null) {
      return null;
    }

    return (
      <View
        className={classNames(`${classPrefix}-decoration-box`)}
        onClick={this.onImageClick}
      >
        <View className={classNames(`${classPrefix}-decoration-box-inner`)}>
          {decorationComponent}
        </View>
      </View>
    );
  };

  renderFurther() {
    const {
      lazyLoad,
      padding,
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
      errorImage: errorImageSource,
      skeletonMode,
    } = {
      ...this.props,
    };
    const { srcStage } = this.state;

    const { hide, loading, loadSuccess } = this.state;

    const showOverlay = showOverlayValue || false;

    const loadingEffect = loadingEffectValue || false;

    const overlayText = overlayTextValue || '';

    const borderRadiusDefaultStyle = borderRadiusValue
      ? { borderRadius: transformSize(8) }
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

    if (showMode === 'loading' || showMode === 'box') {
      return (
        <ScaleBox
          style={imageBoxStyleValue}
          padding={padding}
          aspectRatio={aspectRatio}
          hide={hide}
          bodySkeletonMode={skeletonMode}
        >
          {showOverlay ? (
            <View
              className={classNames(
                `${classPrefix}-overlay-box`,
                `${classPrefix}-overlay-text`,
              )}
              onClick={this.onImageClick}
            >
              <HorizontalCenterBox fillHeight>
                <VerticalBox>
                  <View
                    className={classNames(`${classPrefix}-overlay-box-text`)}
                  >
                    {overlayText}
                  </View>
                </VerticalBox>
              </HorizontalCenterBox>
            </View>
          ) : null}

          {showMode == 'loading' ? <ActivityIndicator mode="center" /> : null}

          {loadingEffect && loading && !showOverlay && lazyLoad ? (
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

          {this.buildDecoration()}

          {showMode == 'box' ? (
            <Image
              className={classNames(
                `${classPrefix}-image-item`,
                loadingEffect && !showOverlay
                  ? loading
                    ? `${classPrefix}-image-load-animation-init`
                    : `${classPrefix}-image-load-animation`
                  : null,
              )}
              style={{
                ...borderRadiusDefaultStyle,
                ...backgroundColor,
              }}
              src={
                !loading && !loadSuccess
                  ? errorImageSource || errorImage
                  : srcStage
              }
              lazyLoad={lazyLoad || false}
              mode={imageMode || null}
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
        </ScaleBox>
      );
    }

    if (showMode === 'pure') {
      return (
        <View style={{ ...imageBoxStyleValue }} onClick={this.onImageClick}>
          <Image
            className={classNames(`${classPrefix}-pure`)}
            src={
              !loading && !loadSuccess
                ? errorImageSource || errorImage
                : srcStage
            }
            lazyLoad={lazyLoad || false}
            mode="widthFix"
            onLoad={() => {
              this.onImageLoadSuccess();
            }}
            onError={this.onImageError}
          />
        </View>
      );
    }

    return null;
  }
}

ImageBox.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { ImageBox };
