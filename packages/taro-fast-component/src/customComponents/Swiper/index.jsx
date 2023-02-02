import classNames from 'classnames';
import { View } from '@tarojs/components';

import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  getGuid,
  isArray,
  isFunction,
  isNumber,
  logException,
  showErrorMessage,
  toNumber,
} from 'easy-soft-utility';

import { getRect, transformSize } from 'taro-fast-common';

import BaseComponent from '../BaseComponent';
import CenterBox from '../CenterBox';
import Icon from '../Icon';
import ScaleBox from '../ScaleBox';

import SwiperIndicator from './SwiperIndicator';
import SwiperItemContainer from './SwiperItemContainer';
import { checkTransform, classPrefix } from './tools';

import './index.less';

const { IconChevronLeft, IconChevronRight } = Icon;

const defaultProps = {
  current: 0,
  enableTouch: false,
  autoplay: false,
  circular: false,
  vertical: false,
  className: '',
  itemStyle: {},
  style: {},
  itemStyle: {},
  indicator: false,
  indicatorBuilder: null,
  indicatorStyle: {},
  data: null,
  list: [],
  itemBuilder: null,
  interval: 5000,
  duration: 500,
  transform: 'slide',
  direction: 'left',
  controller: false,
  prevStyle: {},
  nextStyle: {},
  height: 0,
  scaleMode: true,
  aspectRatio: 0.5,
  enableTouchDistance: true,
  onChange: null,
};

function getArrayCount(list) {
  const listData = isArray(list) ? list : [];

  return listData.length;
}

function checkSequence({ sequence, list, automaticCorrection = true }) {
  if (!isNumber(sequence)) {
    if (!automaticCorrection) {
      return null;
    }

    return 0;
  }

  const itemCount = getArrayCount(list);

  if (!automaticCorrection) {
    if (sequence < 0) {
      return null;
    }

    if (sequence >= itemCount) {
      return null;
    }
  }

  let sequenceAdjust = toNumber(sequence);

  sequenceAdjust =
    sequenceAdjust < 0
      ? itemCount - 1
      : sequenceAdjust > itemCount - 1
      ? 0
      : sequenceAdjust;

  return sequenceAdjust;
}

function getRealDirection({ priorityDirection, direction }) {
  let directionAdjust = '';

  const directionCollection = ['left', 'right'];

  if (checkInCollection(directionCollection, priorityDirection)) {
    directionAdjust = priorityDirection;
  } else if (checkInCollection(directionCollection, direction)) {
    directionAdjust = direction;
  } else {
    directionAdjust = defaultProps.direction;
  }

  return directionAdjust;
}

function getNextSequence({
  circular,
  priorityDirection,
  direction = defaultProps.direction,
  sequence,
  step = 1,
  maxSequence,
}) {
  let directionAdjust = getRealDirection({
    priorityDirection,
    direction,
  });

  let sequenceAdjust = sequence;

  if (circular) {
    if (directionAdjust === 'left') {
      sequenceAdjust = sequence + step;
    } else {
      sequenceAdjust = sequence - step;
    }
  } else {
    if (sequence <= 0) {
      sequenceAdjust = 1;
    } else if (sequence >= maxSequence) {
      sequenceAdjust = maxSequence - 1;
    } else {
    }
  }

  return sequenceAdjust;
}

class Swiper extends BaseComponent {
  swiperItemContainerId = '';

  swiperItemContainerWidth = 0;

  swiperItemContainerHeight = 0;

  timer = null;

  adjustTimer = null;

  priorityDirection = '';

  tempDirection = '';

  playing = false;

  touching = false;

  touchStart = 0;

  touchEnd = 0;

  touchTotalStep = 5;

  touchCheckStartPosition = 0;

  touchStepDistance = 0;

  constructor(props) {
    super(props);

    const { current, direction, list } = props;

    const sequence =
      checkSequence({
        sequence: current,
        list,
        automaticCorrection: false,
      }) || 0;

    this.state = {
      ...this.state,
      ...{
        currentFlag: sequence,
        currentStage: sequence,
        play: false,
        offset: 0,
      },
    };

    this.swiperItemContainerId = getGuid();
    this.tempDirection = direction;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { current: currentNext, list } = nextProps;
    const { currentFlag: currentPrev } = prevState;

    if (currentNext !== currentPrev) {
      const sequence = checkSequence({
        sequence: currentNext,
        list,
        automaticCorrection: false,
      });

      if (sequence != null) {
        return {
          currentFlag: sequence || 0,
          currentStage: sequence || 0,
          offset: 0,
        };
      }
    }

    return {};
  }

  doWorkAdjustDidMount = () => {
    this.delayAdjustView();
  };

  // eslint-disable-next-line no-unused-vars
  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {
    const { direction: directionPrev, list: listPrev } = preProps;
    const { direction: directionNext, list: listNext } = this.props;

    if (directionPrev !== directionNext) {
      this.tempDirection = directionNext;
    }

    if (listPrev.length !== listNext.length) {
      this.delayAdjustView();
    }
  };

  delayAdjustView = () => {
    const that = this;

    this.adjustTimer = setTimeout(() => {
      that.adjustView();

      clearTimeout(that.adjustTimer);
    }, 200);
  };

  adjustView = () => {
    const { autoplay, vertical, enableTouchDistance, onChange } = this.props;
    const { currentStage } = this.state;

    const that = this;

    getRect(`#${this.swiperItemContainerId}`)
      .then((rect) => {
        if (rect != null) {
          const {
            width: swiperItemContainerWidth,
            height: swiperItemContainerHeight,
          } = rect;

          that.swiperItemContainerWidth = swiperItemContainerWidth;
          that.swiperItemContainerHeight = swiperItemContainerHeight;

          if (enableTouchDistance) {
            that.touchStepDistance = Math.round(
              vertical
                ? swiperItemContainerHeight / (2 * that.touchTotalStep)
                : swiperItemContainerWidth / (2 * that.touchTotalStep),
            );
          }

          that.increaseCounter();

          if (autoplay && !that.playing) {
            that.playing = true;

            that.autoPlay();
          }
        }

        return rect;
      })
      .catch((error) => {
        logException(error);
      });

    if (isFunction(onChange)) {
      onChange(currentStage);
    }
  };

  autoPlay = () => {
    if (!this.playing) {
      return;
    }

    const { circular, direction, list, interval } = this.props;

    const that = this;

    that.timer = setTimeout(() => {
      const { currentStage } = that.state;

      const itemCount = getArrayCount(list);

      let nextSequence = 0;
      let d = that.tempDirection;

      if (!circular) {
        if (d === 'right' && currentStage === 0) {
          d = 'left';

          that.tempDirection = d;
        }

        if (d === 'left' && currentStage === itemCount - 1) {
          d = 'right';

          that.tempDirection = d;
        }

        if (d === 'left') {
          nextSequence = currentStage + 1;
        }

        if (d === 'right') {
          nextSequence = currentStage - 1;
        }
      } else {
        nextSequence = getNextSequence({
          circular,
          priorityDirection: this.priorityDirection,
          direction: direction,
          sequence: currentStage,
          step: 1,
          maxSequence: itemCount - 1,
        });
      }

      that.slide(nextSequence, 0);

      that.autoPlay();
    }, interval || defaultProps.interval);
  };

  slide = (nextSequence, offset = 0) => {
    const { list, onChange } = this.props;

    const sequence = checkSequence({
      sequence: nextSequence,
      list,
      automaticCorrection: true,
    });

    if (isFunction(onChange)) {
      onChange(sequence);
    }

    this.setState(
      {
        currentStage: sequence,
        offset: offset || 0,
      },
      () => {
        this.priorityDirection = '';
      },
    );
  };

  /**
   * 往复展示模式样式构建,使用轨道进行往复运动
   */
  getStyleReciprocateTranslate = () => {
    const { circular, direction, currentStage, offset, list } = this.state;

    const itemCount = getArrayCount(list);

    let directionAdjust = getRealDirection({
      priorityDirection: this.priorityDirection,
      direction: circular ? direction : this.tempDirection,
    });

    const directionCoefficient = directionAdjust === 'left' ? 1 : -1;

    return {
      ...{
        transform: `translateX(${
          -1 * currentStage * this.swiperItemContainerWidth +
          directionCoefficient *
            (offset > this.swiperItemContainerWidth
              ? this.swiperItemContainerWidth
              : offset) *
            ((currentStage === 0 && this.priorityDirection === 'right') ||
            (currentStage === itemCount - 1 &&
              this.priorityDirection === 'left')
              ? 0
              : -1)
        }px)`,
      },
      ...(this.touching ? { transitionDuration: '0' } : {}),
    };
  };

  /**
   * 循环展示模式样式构建,使用内部项进行循环运动
   */
  getStyleCircularTranslate = (index, count) => {
    const { direction, list } = this.props;
    const { currentStage, offset } = this.state;

    const itemCount = getArrayCount(list);

    const halfCount = Math.floor(count / 2);

    let multiple =
      0 -
      currentStage +
      (currentStage === itemCount - 1 ? itemCount : 0) +
      index;

    if (multiple >= halfCount) {
      multiple = multiple - itemCount;
    }

    let directionAdjust = getRealDirection({
      priorityDirection: this.priorityDirection,
      direction: direction,
    });

    const directionCoefficient = directionAdjust === 'left' ? 1 : -1;

    return {
      ...{
        transform:
          index === currentStage
            ? offset === 0
              ? 'none'
              : `translateX(${
                  directionCoefficient *
                  (offset > this.swiperItemContainerWidth
                    ? this.swiperItemContainerWidth
                    : offset) *
                  -1
                }px)`
            : `translateX(${
                multiple * this.swiperItemContainerWidth +
                directionCoefficient *
                  (offset > this.swiperItemContainerWidth
                    ? this.swiperItemContainerWidth
                    : offset) *
                  -1
              }px)`,
      },
      ...(offset === 0 &&
      directionCoefficient * multiple > 0 &&
      Math.abs(currentStage - index) != 1 &&
      Math.abs(currentStage - index) != itemCount - 1
        ? { visibility: 'hidden' }
        : {}),
      ...(directionCoefficient * multiple > 0 ? { zIndex: '-100' } : {}),
      ...(index === 0
        ? {}
        : { left: `${-1 * index * this.swiperItemContainerWidth}px` }),
    };
  };

  onTouchStart = (e) => {
    const { autoplay, enableTouch, enableTouchDistance } = this.props;

    if (!enableTouch) {
      return;
    }

    this.touchStart = e.touches[0].pageX;

    this.touching = true;

    if (enableTouchDistance) {
      this.touchCheckStartPosition = this.touchStart;
    }

    if (autoplay) {
      this.playing = false;

      clearTimeout(this.timer);
    }
  };

  onTouchMove = (e) => {
    const { enableTouch, enableTouchDistance } = this.props;

    if (!enableTouch) {
      return;
    }

    if (this.touching) {
      const { pageX } = e.touches[0];

      this.touchEnd = pageX;

      if (enableTouchDistance) {
        const touchDistance = Math.abs(
          this.touchCheckStartPosition - this.touchEnd,
        );

        if (touchDistance < this.touchStepDistance) {
          return;
        }

        this.touchCheckStartPosition = this.touchEnd;
      }

      const { circular, list } = this.props;
      const { currentStage } = this.state;

      const itemCount = getArrayCount(list);

      if (this.touchStart > this.touchEnd) {
        this.priorityDirection = 'left';
      } else {
        this.priorityDirection = 'right';
      }

      if (circular) {
        this.slide(
          currentStage,
          Math.round(Math.abs(this.touchStart - this.touchEnd)),
        );
      } else {
        this.slide(
          currentStage,
          (currentStage === 0 && this.touchStart <= this.touchEnd) ||
            (currentStage === itemCount - 1 && this.touchStart >= this.touchEnd)
            ? 0
            : Math.round(Math.abs(this.touchStart - this.touchEnd)),
        );
      }
    }
  };

  onTouchEnd = () => {
    const { autoplay, enableTouch, circular, direction, list } = this.props;

    if (!enableTouch) {
      return;
    }

    if (this.touching) {
      const { currentStage } = this.state;
      const itemCount = getArrayCount(list);

      if (!circular) {
        if (
          (currentStage === 0 && this.touchStart <= this.touchEnd) ||
          (currentStage === itemCount - 1 && this.touchStart >= this.touchEnd)
        ) {
          this.slide(currentStage, 0);
        } else {
          if (
            Math.abs(this.touchStart - this.touchEnd) >=
            Math.floor(this.swiperItemContainerWidth / 2)
          ) {
            let nextSequence = currentStage;

            if (this.touchStart > this.touchEnd) {
              nextSequence = currentStage + 1;
            }

            if (this.touchStart < this.touchEnd) {
              nextSequence = currentStage - 1;
            }

            this.slide(nextSequence, 0);
          } else {
            this.slide(currentStage, 0);
          }
        }
      } else {
        if (
          Math.abs(this.touchStart - this.touchEnd) >=
          Math.floor(this.swiperItemContainerWidth / 2)
        ) {
          if (this.touchStart > this.touchEnd) {
            this.priorityDirection = 'left';
          } else {
            this.priorityDirection = 'right';
          }

          const nextSequence = getNextSequence({
            circular,
            priorityDirection: this.priorityDirection,
            direction: direction,
            sequence: currentStage,
            step: 1,
            maxSequence: itemCount - 1,
          });

          this.slide(nextSequence, 0);
        } else {
          this.slide(currentStage, 0);
        }
      }
    }

    this.touching = false;

    if (autoplay) {
      this.playing = true;

      this.autoPlay();
    } else {
      this.playing = false;
    }
  };

  goToPrev = () => {
    const { circular } = this.props;
    const { currentStage } = this.state;

    if (circular) {
      this.slide(currentStage - 1, 0);
    } else {
      if (currentStage > 0) {
        this.slide(currentStage - 1, 0);
      }
    }
  };

  goToNext = () => {
    const { circular, list } = this.props;
    const { currentStage } = this.state;

    if (circular) {
      this.slide(currentStage + 1, 0);
    } else {
      const itemCount = getArrayCount(list);

      if (currentStage < itemCount - 1) {
        this.slide(currentStage + 1, 0);
      }
    }
  };

  buildPrev = () => {
    const { prevStyle, prevBuilder } = this.props;

    let prevElement = null;

    if (isFunction(prevBuilder)) {
      prevElement = prevBuilder() || null;
    }

    if (prevElement == null) {
      prevElement = (
        <CenterBox>
          <IconChevronLeft
            color="var(--tfc-color-primary)"
            size={40}
            style={{
              opacity: '0.6',
              backgroundColor: '#ccc',
              borderRadius: '50%',
              padding: 'var(--tfc-6)',
            }}
          />
        </CenterBox>
      );
    }

    return (
      <View
        className={classNames(
          `${classPrefix}__controller`,
          `${classPrefix}__controller--prev`,
        )}
        style={prevStyle}
        onClick={this.goToPrev}
      >
        {prevElement}
      </View>
    );
  };

  buildNext = () => {
    const { nextStyle, nextBuilder } = this.props;

    let nextElement = null;

    if (isFunction(nextBuilder)) {
      nextElement = nextBuilder() || null;
    }

    if (nextElement == null) {
      nextElement = (
        <CenterBox>
          <IconChevronRight
            color="var(--tfc-color-primary)"
            size={40}
            style={{
              opacity: '0.6',
              backgroundColor: '#ccc',
              borderRadius: '50%',
              padding: 'var(--tfc-6)',
            }}
          />
        </CenterBox>
      );
    }

    return (
      <View
        className={classNames(
          `${classPrefix}__controller`,
          `${classPrefix}__controller--next`,
        )}
        style={nextStyle}
        onClick={this.goToNext}
      >
        {nextElement}
      </View>
    );
  };

  renderFurther() {
    const {
      hidden,
      height: heightSource,
      circular,
      transform: transformSource,
      vertical,
      className,
      style,
      itemStyle,
      direction,
      list,
      itemBuilder,
      indicator,
      indicatorStyle,
      indicatorBuilder,
      duration,
      controller,
      scaleMode,
      aspectRatio,
    } = this.props;
    const { currentStage } = this.state;

    if (hidden) {
      return null;
    }

    let height = toNumber(heightSource || 0);

    if (!scaleMode) {
      if (height <= 0) {
        const text = 'swiper: 不使用比例容器模式下, 需要指定 height';

        showErrorMessage({
          text: text,
        });

        return null;
      }
    } else {
      height = '100%';
    }

    const listData = isArray(list) ? list : [];

    const transform = checkTransform(transformSource);

    const itemCount = listData.length;

    const swiperCore = (
      <View
        className={classNames(classPrefix, className)}
        style={{
          ...style,
          ...(checkStringIsNullOrWhiteSpace(height)
            ? {}
            : {
                '--height': transformSize(height),
              }),
          ...(checkStringIsNullOrWhiteSpace(duration)
            ? {}
            : {
                '--track-translate-duration': `${duration}ms`,
              }),
        }}
      >
        {controller ? this.buildPrev() : null}
        {controller ? this.buildNext() : null}

        <View
          className={classNames(`${classPrefix}__track`, {
            [`${classPrefix}__track--vertical`]: vertical,
            [`${classPrefix}__track--translate`]: transform === 'slide',
          })}
          catchMove
          onTouchStart={this.onTouchStart}
          onTouchMove={this.onTouchMove}
          onTouchEnd={this.onTouchEnd}
          onTouchCancel={this.onTouchEnd}
          style={circular ? {} : this.getStyleReciprocateTranslate()}
        >
          {listData.map((item, index) => {
            const key = `swiper__item-container_${this.keyPrefix}_${index}`;

            return (
              <SwiperItemContainer
                key={key}
                id={index === 0 ? this.swiperItemContainerId : null}
                itemIndex={index}
                itemCount={itemCount}
                transform={transform}
                transformDistance={this.swiperItemContainerWidth}
                circular={circular}
                indicator={circular ? currentStage : 0}
                style={{
                  ...itemStyle,
                  ...(circular
                    ? this.getStyleCircularTranslate(index, itemCount)
                    : {}),
                }}
                data={item}
                itemBuilder={itemBuilder}
              />
            );
          })}
        </View>

        {!!indicator ? (
          <SwiperIndicator
            indicator={currentStage}
            indicatorBuilder={indicatorBuilder}
            list={list}
            style={indicatorStyle}
            direction={direction}
          />
        ) : null}
      </View>
    );

    if (!scaleMode) {
      return swiperCore;
    }

    return <ScaleBox aspectRatio={aspectRatio}>{swiperCore}</ScaleBox>;
  }
}

Swiper.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default Swiper;
