import classNames from 'classnames';
import { View } from '@tarojs/components';

import {
  getGuid,
  getRect,
  inCollection,
  stringIsNullOrWhiteSpace,
} from 'taro-fast-common/es/utils/tools';
import { isArray } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';

import SwiperItem from './SwiperItem';
import SwiperIndicator from './SwiperIndicator';

import './index.less';

const classPrefix = `tfc-swiper`;

const transformCollection = ['slide'];

const defaultProps = {
  autoplay: false,
  hidden: false,
  className: '',
  itemStyle: {},
  style: {},
  itemStyle: {},
  indicatorStyle: {},
  data: null,
  direction: '',
  list: [],
  itemBuilder: null,
  pauseTime: 1500,
  transform: 'slide',
  duration: '300ms',
};

class Swiper extends BaseComponent {
  swiperId = '';

  swiperWidth = 0;

  swiperHeight = 0;

  timer = null;

  adjustTimer = null;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        current: 0,
        play: false,
      },
    };

    this.swiperId = getGuid();
  }

  doWorkAdjustDidMount = () => {
    const that = this;

    this.adjustTimer = setTimeout(() => {
      that.adjustView();

      clearTimeout(that.adjustTimer);
    }, 200);
  };

  adjustView = () => {
    const { autoplay } = this.props;

    const that = this;

    getRect(`#${this.swiperId}`).then((rect) => {
      if (rect != null) {
        const { width: swiperWidth, height: swiperHeight } = rect;

        that.swiperWidth = swiperWidth;
        that.swiperHeight = swiperHeight;

        if (autoplay) {
          that.timer = setTimeout(() => {
            that.play();
          });
        }
      }
    });
  };

  play = () => {
    const { pauseTime } = this.props;

    const that = this;
    console.log({
      pauseTime,
    });
    that.timer = setTimeout(() => {
      that.slide();
      that.play();
    }, pauseTime || defaultProps.pauseTime);
  };

  slide = () => {
    const { list } = this.props;
    const { current } = this.state;

    if (current < 0) {
      this.setState({ current: 0 });

      return;
    }

    const listData = isArray(list) ? list : [];

    if (current >= listData.length - 1) {
      this.setState({ current: 0 });

      return;
    }

    return this.setState({ current: current + 1 });
  };

  getTransform = () => {
    const { transform } = this.props;

    return inCollection(transformCollection, transform)
      ? transform
      : defaultProps.transform;
  };

  renderFurther() {
    const {
      hidden,
      className,
      style,
      itemStyle,
      direction,
      list,
      itemBuilder,
      indicatorStyle,
      duration,
    } = this.props;
    const { current } = this.state;

    if (hidden) {
      return null;
    }

    const listData = isArray(list) ? list : [];

    const verticalMode = direction === 'vertical';

    const transform = this.getTransform();

    const trackStyleOne = {
      ...{
        transform: `translateX(${
          -1 * (current + listData.length) * this.swiperWidth
        }px)`,
      },
    };

    const trackStyleTwo = {
      ...{
        transform: `translateX(${
          -1 * (current + listData.length) * this.swiperWidth
        }px)`,
      },
    };

    const trackStyleThree = {
      ...{
        transform: `translateX(${
          -1 * (current + listData.length) * this.swiperWidth
        }px)`,
      },
    };

    return (
      <View
        id={this.swiperId}
        className={classNames(classPrefix, className)}
        style={{
          ...style,
          ...(stringIsNullOrWhiteSpace(duration)
            ? {}
            : {
                '--track-translate-duration': duration,
              }),
        }}
      >
        <View
          className={classNames(`${classPrefix}__track`, {
            [`${classPrefix}__track--vertical`]: verticalMode,
            [`${classPrefix}__track--translate`]: transform === 'slide',
          })}
          // catchMove
          // onTouchStart={onTouchStart}
          // onTouchMove={onTouchMove}
          // onTouchEnd={onTouchEnd}
          // onTouchCancel={onTouchEnd}
          style={trackStyleOne}
        >
          {listData.map((item, index) => {
            const key = `swiper_item_${this.keyPrefix}_${index}`;

            return (
              <SwiperItem
                key={key}
                style={itemStyle}
                data={item}
                itemBuilder={itemBuilder}
              />
            );
          })}
        </View>

        <View
          className={classNames(`${classPrefix}__track--`, {
            [`${classPrefix}__track--vertical`]: verticalMode,
            [`${classPrefix}__track--translate`]: transform === 'slide',
          })}
          // catchMove
          // onTouchStart={onTouchStart}
          // onTouchMove={onTouchMove}
          // onTouchEnd={onTouchEnd}
          // onTouchCancel={onTouchEnd}
          style={trackStyleTwo}
        >
          {listData.map((item, index) => {
            const key = `swiper_item_${this.keyPrefix}_${index}`;

            return (
              <SwiperItem
                key={key}
                style={itemStyle}
                data={item}
                itemBuilder={itemBuilder}
              />
            );
          })}
        </View>

        <View
          className={classNames(`${classPrefix}__track--`, {
            [`${classPrefix}__track--vertical`]: verticalMode,
            [`${classPrefix}__track--translate`]: transform === 'slide',
          })}
          // catchMove
          // onTouchStart={onTouchStart}
          // onTouchMove={onTouchMove}
          // onTouchEnd={onTouchEnd}
          // onTouchCancel={onTouchEnd}
          style={trackStyleThree}
        >
          {listData.map((item, index) => {
            const key = `swiper_item_${this.keyPrefix}_${index}`;

            return (
              <SwiperItem
                key={key}
                style={itemStyle}
                data={item}
                itemBuilder={itemBuilder}
              />
            );
          })}
        </View>

        <SwiperIndicator
          indicator={current}
          list={list}
          style={indicatorStyle}
          direction={direction}
        />
      </View>
    );
  }
}

Swiper.defaultProps = {
  ...defaultProps,
};

export default Swiper;
