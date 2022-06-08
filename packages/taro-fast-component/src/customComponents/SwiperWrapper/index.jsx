import { Swiper, SwiperItem, View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import { isFunction, isObject } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';
import ScaleBox from '../ScaleBox';

const defaultProps = {
  height: 300,
  style: {},
  scaleMode: false,
  aspectRatio: 0.5,
  swiperConfig: {},
  list: [],
  itemBuilder: null,
  indicatorBuilder: null,
  customIndicator: false,
  indicatorBoxStyle: {},
};

class SwiperWrapper extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        current: 0,
      },
    };
  }

  getStyle = () => {
    const { style, height, scaleMode } = this.props;

    return {
      ...(style || {}),
      ...(!scaleMode ? { height: transformSize(height) } : {}),
      ...{ position: 'relative' },
    };
  };

  triggerChange = (e) => {
    const { customIndicator, onChange } = this.props;

    if (!!customIndicator) {
      const {
        detail: { current },
      } = e;

      this.setState({ current });
    }

    if (isFunction(onChange)) {
      onChange(e);
    }
  };

  buildItem = (item, index) => {
    const { height, scaleMode, aspectRatio, itemBuilder } = this.props;
    const { current } = this.state;

    let inner = null;

    if (!isFunction(itemBuilder)) {
      inner = 'itemBuilder in props must be a function and return a component';
    } else {
      inner = itemBuilder({
        height,
        scaleMode,
        aspectRatio,
        item,
        active: current === index,
        current,
        index,
        keyPrefix: this.keyPrefix,
      });
    }

    return <SwiperItem key={`${this.keyPrefix}_${index}`}>{inner}</SwiperItem>;
  };

  buildIndicator = (item, index) => {
    const { height, scaleMode, aspectRatio, indicatorBuilder } = this.props;
    const { current } = this.state;

    if (isFunction(indicatorBuilder)) {
      return indicatorBuilder({
        height,
        scaleMode,
        aspectRatio,
        item,
        active: current === index,
        current,
        index,
        keyPrefix: this.keyPrefix,
      });
    }

    return null;
  };

  buildSwiper = () => {
    const {
      customIndicator,
      swiperConfig,
      list,
      onTransition,
      onAnimationFinish,
    } = this.props;

    const swiperConfigAdjust = isObject(swiperConfig || {}) ? swiperConfig : {};

    swiperConfigAdjust.style = { width: '100%', height: '100%' };
    (swiperConfigAdjust.indicatorDots = customIndicator
      ? false
      : swiperConfigAdjust.indicatorDots || false),
      (swiperConfigAdjust.onChange = this.triggerChange);
    swiperConfigAdjust.onTransition = onTransition;
    swiperConfigAdjust.onAnimationFinish = onAnimationFinish;

    return (
      <Swiper {...swiperConfig}>
        {list.map((o, i) => {
          return this.buildItem(o, i);
        })}
      </Swiper>
    );
  };

  buildIndicatorBox = () => {
    const { customIndicator, indicatorBoxStyle, list } = this.props;

    return !!customIndicator ? (
      <View
        style={{
          ...{
            width: '100%',
            bottom: transformSize(20),
            display: 'flex',
            alignItems: 'center',
            justifyItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
          },
          ...(indicatorBoxStyle || {}),
          ...{ position: 'absolute' },
        }}
      >
        {list.map((o, index) => {
          return this.buildIndicator(o, index);
        })}
      </View>
    ) : null;
  };

  renderFurther() {
    const { scaleMode, aspectRatio } = this.props;

    const style = this.getStyle();

    if (scaleMode) {
      return (
        <ScaleBox style={style} aspectRatio={aspectRatio}>
          {this.buildSwiper()}

          {this.buildIndicatorBox()}
        </ScaleBox>
      );
    }

    return (
      <View style={style}>
        {this.buildSwiper()}

        {this.buildIndicatorBox()}
      </View>
    );
  }
}

SwiperWrapper.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default SwiperWrapper;
