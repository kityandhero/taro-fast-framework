import classNames from 'classnames';
import { View } from '@tarojs/components';

import {
  getGuid,
  getRect,
  stringIsNullOrWhiteSpace,
} from 'taro-fast-common/es/utils/tools';
import { isArray } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';

import { classPrefix, checkTransform } from './tools';
import SwiperItemContainer from './SwiperItemContainer';
import SwiperIndicator from './SwiperIndicator';

import './index.less';

const defaultProps = {
  autoplay: false,
  hidden: false,
  circular: false,
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
  swiperItemContainerId = '';

  swiperItemContainerWidth = 0;

  swiperItemContainerHeight = 0;

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

    this.swiperItemContainerId = getGuid();
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

    getRect(`#${this.swiperItemContainerId}`).then((rect) => {
      if (rect != null) {
        const {
          width: swiperItemContainerWidth,
          height: swiperItemContainerHeight,
        } = rect;

        that.swiperItemContainerWidth = swiperItemContainerWidth;
        that.swiperItemContainerHeight = swiperItemContainerHeight;

        that.increaseCounter();

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

  renderFurther() {
    const {
      hidden,
      circular,
      transform: transformSource,
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

    const transform = checkTransform(transformSource);

    const trackStyle = {
      ...(circular
        ? {}
        : {
            transform: `translateX(${
              -1 * current * this.swiperItemContainerWidth
            }px)`,
          }),
    };

    return (
      <View
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
          style={trackStyle}
        >
          {listData.map((item, index) => {
            const key = `swiper__item-container_${this.keyPrefix}_${index}`;

            return (
              <SwiperItemContainer
                key={key}
                id={index === 0 ? this.swiperItemContainerId : null}
                sliderIndex={index}
                sliderCount={listData.length}
                duration={duration}
                transform={transform}
                transformDistance={this.swiperItemContainerWidth}
                circular={circular}
                indicator={circular ? current : 0}
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
