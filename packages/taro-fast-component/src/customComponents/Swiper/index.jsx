import classNames from 'classnames';
import { View } from '@tarojs/components';

import { getGuid } from 'taro-fast-common/es/utils/tools';
import { isArray, getRect } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';

import SwiperItem from './SwiperItem';
import SwiperIndicator from './SwiperIndicator';

import './index.less';

const classPrefix = `tfc-swiper`;

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
};

class Swiper extends BaseComponent {
  swiperId = '';

  swiperWidth = 0;

  swiperHeight = 0;

  timer = null;

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
      className,
      style,
      itemStyle,
      direction,
      list,
      itemBuilder,
      indicatorStyle,
    } = this.props;
    const { current } = this.state;

    if (hidden) {
      return null;
    }

    const verticalMode = direction === 'vertical';

    const trackStyle = {
      ...{
        transform: `translateX(${-1 * current * this.swiperWidth}px)`,
      },
    };

    const listData = isArray(list) ? list : [];

    return (
      <View
        id={this.swiperId}
        className={classNames(classPrefix, className)}
        style={style}
      >
        <View
          className={classNames(`${classPrefix}__track`, {
            [`classPrefix}__track--vertical`]: verticalMode,
          })}
          // catchMove
          // onTouchStart={onTouchStart}
          // onTouchMove={onTouchMove}
          // onTouchEnd={onTouchEnd}
          // onTouchCancel={onTouchEnd}
          style={trackStyle}
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
