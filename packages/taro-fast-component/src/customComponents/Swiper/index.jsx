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
  current: 0,
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

    const { current } = props;

    this.state = {
      ...this.state,
      ...{
        currentFlag: current || 0,
        currentStage: current || 0,
        play: false,
      },
    };

    this.swiperItemContainerId = getGuid();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { current: currentNext } = nextProps;
    const { currentFlag: currentPrev } = prevState;

    if (currentNext !== currentPrev) {
      return {
        currentFlag: currentNext,
        currentStage: currentNext,
      };
    }

    return {};
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
    const { currentStage } = this.state;
    console.log({
      currentStage,
    });
    if (currentStage < 0) {
      this.setState({ currentStage: 0 });

      return;
    }

    const listData = isArray(list) ? list : [];

    if (currentStage >= listData.length - 1) {
      this.setState({ currentStage: 0 });

      return;
    }

    return this.setState({ currentStage: currentStage + 1 });
  };

  getItemCount = () => {
    const { list } = this.props;

    const listData = isArray(list) ? list : [];

    return listData.length;
  };

  getStyleTranslate = (index, count) => {
    const { circular } = this.props;
    const { currentStage } = this.state;

    if (!circular) {
      return {};
    }

    const itemCount = this.getItemCount();

    const halfCount = Math.floor(count / 2);

    let multiple =
      0 -
      currentStage +
      (currentStage === itemCount - 1 ? itemCount : 0) +
      index;

    if (multiple >= halfCount) {
      multiple = multiple - itemCount;
    }

    return {
      ...{
        // '--track-translate-duration':
        //   index !== currentStage + 1 ? '0' : duration,
        transform:
          index === currentStage
            ? 'none'
            : `translateX(${multiple * this.swiperItemContainerWidth}px)`,
      },
      ...(multiple > 0 ? { visibility: 'hidden' } : {}),
      ...(multiple > 0 ? { zIndex: '-100' } : {}),
      ...(index === 0
        ? {}
        : { left: `${-1 * index * this.swiperItemContainerWidth}px` }),
    };
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
    const { currentStage } = this.state;

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
              -1 * currentStage * this.swiperItemContainerWidth
            }px)`,
          }),
    };

    const itemCount = listData.length;

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
                itemIndex={index}
                itemCount={itemCount}
                duration={duration}
                transform={transform}
                transformDistance={this.swiperItemContainerWidth}
                circular={circular}
                indicator={circular ? currentStage : 0}
                style={{
                  ...itemStyle,
                  ...this.getStyleTranslate(index, itemCount),
                }}
                data={item}
                itemBuilder={itemBuilder}
              />
            );
          })}
        </View>

        <SwiperIndicator
          indicator={currentStage}
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
