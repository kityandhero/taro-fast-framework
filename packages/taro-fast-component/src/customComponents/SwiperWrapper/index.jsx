import { Swiper, SwiperItem, View } from '@tarojs/components';

import { inCollection } from 'taro-fast-common/es/utils/tools';
import { isFunction, isObject } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';
import SwiperIndicator from './SwiperIndicator';

import './index.less';

const indicatorDirectionCollection = ['horizontal', 'vertical'];

const defaultProps = {
  height: 0,
  scaleMode: true,
  aspectRatio: 0.5,
  swiperConfig: {},
  list: [],
  indicatorBuilder: null,
  customIndicator: false,
  indicatorStyle: {},
  indicatorDirection: '',
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
    return {
      position: 'relative',
    };
  };

  getIndicatorDirection = () => {
    const { indicatorDirection } = this.props;

    const direction = inCollection(
      indicatorDirectionCollection,
      indicatorDirection,
    )
      ? indicatorDirection
      : 'horizontal';

    return direction;
  };

  triggerChange = (e) => {
    const { customIndicator, onChange } = this.props;

    if (!!customIndicator) {
      const { current } = e;

      this.setState({ current });
    }

    if (isFunction(onChange)) {
      onChange(e);
    }
  };

  buildItem = (item, index) => {
    const { itemBuilder } = this.props;

    let inner = null;

    if (!isFunction(itemBuilder)) {
      inner = 'itemBuilder in props must be a function and return a component';
    } else {
      inner = itemBuilder({ item, index });
    }

    return <SwiperItem key={`${this.keyPrefix}_${index}`}>{inner}</SwiperItem>;
  };

  renderFurther() {
    const {
      customIndicator,
      swiperConfig,
      list,
      indicatorBuilder,
      indicatorStyle,
      onTransition,
      onAnimationFinish,
    } = this.props;
    const { current } = this.state;

    const style = this.getStyle();
    const indicatorDirection = this.getIndicatorDirection();

    const swiperConfigAdjust = isObject(swiperConfig || {}) ? swiperConfig : {};

    swiperConfigAdjust.onChange = this.triggerChange;
    swiperConfigAdjust.onTransition = onTransition;
    swiperConfigAdjust.onAnimationFinish = onAnimationFinish;

    return (
      <View style={style}>
        <Swiper {...swiperConfig}>
          {list.map((o, i) => {
            return this.buildItem(o, i);
          })}
        </Swiper>

        {!!customIndicator ? (
          <SwiperIndicator
            indicator={current}
            indicatorBuilder={indicatorBuilder}
            list={list}
            style={indicatorStyle}
            direction={indicatorDirection}
          />
        ) : null}
      </View>
    );
  }
}

SwiperWrapper.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default SwiperWrapper;
