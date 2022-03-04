import classNames from 'classnames';
import { View } from '@tarojs/components';

import {
  getGuid,
  getRect,
  inCollection,
  stringIsNullOrWhiteSpace,
} from 'taro-fast-common/es/utils/tools';
import {
  isArray,
  isFunction,
  isNumber,
} from 'taro-fast-common/es/utils/typeCheck';
import { toNumber } from 'taro-fast-common/es/utils/typeConvert';

import BaseComponent from '../BaseComponent';
import Icon from '../Icon';
import CenterBox from '../CenterBox';

import { classPrefix, checkTransform } from './tools';
import SwiperItemContainer from './SwiperItemContainer';
import SwiperIndicator from './SwiperIndicator';

import './index.less';

const { IconChevronLeft, IconChevronRight } = Icon;

const defaultProps = {
  current: 0,
  enableTouch: true,
  autoplay: false,
  hidden: false,
  circular: false,
  className: '',
  itemStyle: {},
  style: {},
  itemStyle: {},
  indicatorStyle: {},
  data: null,
  list: [],
  itemBuilder: null,
  pauseTime: 3000,
  transform: 'slide',
  duration: '300ms',
  direction: 'left',
  showController: false,
  prevStyle: {},
  nextStyle: {},
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

  if (inCollection(directionCollection, priorityDirection)) {
    directionAdjust = priorityDirection;
  } else if (inCollection(directionCollection, direction)) {
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

  touchStartX = 0;

  touchEndX = 0;

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
    const that = this;

    this.adjustTimer = setTimeout(() => {
      that.adjustView();

      clearTimeout(that.adjustTimer);
    }, 200);
  };

  // eslint-disable-next-line no-unused-vars
  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {
    const { direction: directionPrev } = preProps;
    const { direction: directionNext } = this.props;

    if (directionPrev !== directionNext) {
      this.tempDirection = directionNext;
    }
  };

  adjustView = () => {
    const { autoplay, onChange } = this.props;
    const { currentStage } = this.state;

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
          that.playing = true;

          that.autoPlay();
        }
      }
    });

    if (isFunction(onChange)) {
      onChange(currentStage);
    }
  };

  autoPlay = () => {
    if (!this.playing) {
      return;
    }

    const { circular, direction, list, pauseTime } = this.props;

    const that = this;

    that.timer = setTimeout(() => {
      const { currentStage } = that.state;

      const itemCount = getArrayCount(list);

      let nextSequence = 0;
      let d = that.tempDirection;

      if (!circular) {
        console.log({
          d,
          currentStage,
        });

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

        console.log({
          d,
          currentStage,
          nextSequence,
          tempDirection: that.tempDirection,
        });
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
    }, pauseTime || defaultProps.pauseTime);
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
      transform: `translateX(${
        -1 * currentStage * this.swiperItemContainerWidth +
        directionCoefficient *
          (offset > this.swiperItemContainerWidth
            ? this.swiperItemContainerWidth
            : offset) *
          (currentStage === 0 || currentStage === itemCount - 1 ? 0 : -1)
      }px)`,
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
    const { autoplay, enableTouch } = this.props;

    if (!enableTouch) {
      return;
    }

    this.touchStartX = e.touches[0].pageX;

    this.touching = true;

    if (autoplay) {
      this.playing = false;

      clearTimeout(this.timer);
    }
  };

  onTouchMove = (e) => {
    const { enableTouch } = this.props;

    if (!enableTouch) {
      return;
    }

    if (this.touching) {
      const { circular, list } = this.props;
      const { currentStage } = this.state;

      const { pageX } = e.touches[0];

      const itemCount = getArrayCount(list);

      this.touchEndX = pageX;

      if (this.touchStartX > this.touchEndX) {
        this.priorityDirection = 'left';
      } else {
        this.priorityDirection = 'right';
      }

      if (circular) {
        this.slide(
          currentStage,
          Math.round(Math.abs(this.touchStartX - this.touchEndX)),
        );
      } else {
        this.slide(
          currentStage,
          (currentStage === 0 && this.touchStartX <= this.touchEndX) ||
            (currentStage === itemCount - 1 &&
              this.touchStartX >= this.touchEndX)
            ? 0
            : Math.round(Math.abs(this.touchStartX - this.touchEndX)),
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
          (currentStage === 0 && this.touchStartX <= this.touchEndX) ||
          (currentStage === itemCount - 1 && this.touchStartX >= this.touchEndX)
        ) {
          this.slide(currentStage, 0);
        } else {
          if (
            Math.abs(this.touchStartX - this.touchEndX) >=
            Math.floor(this.swiperItemContainerWidth / 2)
          ) {
            let nextSequence = currentStage;

            if (this.touchStartX > this.touchEndX) {
              nextSequence = currentStage + 1;
            }

            if (this.touchStartX < this.touchEndX) {
              nextSequence = currentStage - 1;
            }

            this.slide(nextSequence, 0);
          } else {
            this.slide(currentStage, 0);
          }
        }
      } else {
        if (
          Math.abs(this.touchStartX - this.touchEndX) >=
          Math.floor(this.swiperItemContainerWidth / 2)
        ) {
          if (this.touchStartX > this.touchEndX) {
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
      showController,
    } = this.props;
    const { currentStage } = this.state;

    if (hidden) {
      return null;
    }

    const listData = isArray(list) ? list : [];

    const verticalMode = direction === 'vertical';

    const transform = checkTransform(transformSource);

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
        {showController ? this.buildPrev() : null}
        {showController ? this.buildNext() : null}

        <View
          className={classNames(`${classPrefix}__track`, {
            [`${classPrefix}__track--vertical`]: verticalMode,
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
                duration={duration}
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
