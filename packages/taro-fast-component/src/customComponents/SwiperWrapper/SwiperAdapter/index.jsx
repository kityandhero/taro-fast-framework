import { Swiper, SwiperItem } from '@tarojs/components';

import { isFunction, isObject } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../../BaseComponent';

const defaultProps = {
  scaleMode: false,
  aspectRatio: 0.5,
  swiperConfig: {},
  list: [],
  itemBuilder: null,
  customIndicator: false,
  onChange: null,
  onTransition: null,
  onAnimationFinish: null,
};

class SwiperAdapter extends BaseComponent {
  triggerChange = (e) => {
    const { onChange } = this.props;

    if (isFunction(onChange)) {
      onChange(e);
    }
  };

  buildItem = (item, index) => {
    const { scaleMode, aspectRatio, itemBuilder } = this.props;

    let inner = null;

    if (!isFunction(itemBuilder)) {
      inner = 'itemBuilder in props must be a function and return a component';
    } else {
      inner = itemBuilder({
        scaleMode,
        aspectRatio,
        item,
        index,
        keyPrefix: this.keyPrefix,
      });
    }

    return <SwiperItem key={`${this.keyPrefix}_${index}`}>{inner}</SwiperItem>;
  };

  renderFurther() {
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
  }
}

SwiperAdapter.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default SwiperAdapter;
