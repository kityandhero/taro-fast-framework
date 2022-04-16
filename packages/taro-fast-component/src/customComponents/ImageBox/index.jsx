import classNames from 'classnames';
import { View, Image } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import { isFunction } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';

import ActivityIndicator from '../ActivityIndicator';
import HorizontalCenterBox from '../HorizontalCenterBox';
import VerticalBox from '../VerticalBox';
import ScaleBox from '../ScaleBox';

import './index.less';

const classPrefix = `tfc-image-box`;

/**
 * 加载错误时候的替换图片
 */
const errorImage =
  'data:image/png;base64,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';

const defaultProps = {
  src: '',
  padding: 0,
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

class ImageBox extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        hide: false,
        loading: false,
        loadSuccess: false,
      },
    };
  }

  onImageLoadSuccess() {
    const { showOverlay: showOverlayValue, loadingEffect: loadingEffectValue } =
      this.props;

    const showOverlay = showOverlayValue || false;

    const loadingEffect = loadingEffectValue || false;

    if (loadingEffect && !showOverlay) {
      this.setState({
        loading: false,
        loadSuccess: true,
      });
    }
  }

  onImageError() {
    const { hideWhenLoadError } = this.props;

    if (hideWhenLoadError) {
      this.setState({
        hide: true,
        loading: false,
        loadSuccess: false,
      });
    } else {
      this.setState({
        loading: false,
        loadSuccess: false,
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
      src,
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
    } = {
      ...this.props,
    };

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

          {loadingEffect && !loading && !showOverlay && !lazyLoad ? (
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
                  ? !loading
                    ? `${classPrefix}-image-load-animation-init`
                    : `${classPrefix}-image-load-animation`
                  : null,
              )}
              style={{
                ...borderRadiusDefaultStyle,
                ...backgroundColor,
              }}
              src={!loading && !loadSuccess ? errorImage : src}
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
        <View style={{ ...imageBoxStyleValue }}>
          <Image
            className={classNames(`${classPrefix}-pure`)}
            src={!loading && !loadSuccess ? errorImage : src}
            lazyLoad={lazyLoad || false}
            mode="widthFix"
            onLoad={() => {
              this.onImageLoadSuccess();
            }}
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
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default ImageBox;
