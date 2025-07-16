import { Swiper, SwiperItem } from '@tarojs/components';

import { isFunction, isObject } from 'easy-soft-utility';

import { BaseComponent } from '../../BaseComponent';

const defaultProps = {
  scaleMode: false,
  aspectRatio: 0.5,
  swiperConfig: {},
  list: [],
  itemBuilder: null,
  customIndicator: false,
  duration: 500,
  onChange: null,
  onTransition: null,
  onAnimationFinish: null,
};

class SwiperAdapter extends BaseComponent {
  triggerChange = (event) => {
    const { onChange } = this.props;

    if (isFunction(onChange)) {
      onChange(event);
    }
  };

  buildItem = (item, index) => {
    const { scaleMode, aspectRatio, itemBuilder } = this.props;

    let inner = null;

    inner = isFunction(itemBuilder)
      ? itemBuilder({
          scaleMode,
          aspectRatio,
          item,
          index,
          keyPrefix: this.keyPrefix,
        })
      : 'itemBuilder in props must be a function and return a component';

    return <SwiperItem key={`${this.keyPrefix}_${index}`}>{inner}</SwiperItem>;
  };

  renderFurther() {
    const {
      customIndicator,
      swiperConfig,
      list,
      duration,
      onTransition,
      onAnimationFinish,
    } = this.props;

    const swiperConfigAdjust = isObject(swiperConfig || {}) ? swiperConfig : {};

    swiperConfigAdjust.style = { width: '100%', height: '100%' };
    swiperConfigAdjust.duration = duration;
    ((swiperConfigAdjust.indicatorDots = customIndicator
      ? false
      : swiperConfigAdjust.indicatorDots || false),
      (swiperConfigAdjust.onChange = this.triggerChange));
    swiperConfigAdjust.onTransition = onTransition;
    swiperConfigAdjust.onAnimationFinish = onAnimationFinish;

    return (
      <Swiper {...swiperConfig}>
        {list.map((o, index) => {
          return this.buildItem(o, index);
        })}
      </Swiper>
    );
  }
}

SwiperAdapter.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { SwiperAdapter };
