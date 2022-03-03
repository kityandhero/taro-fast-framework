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
  pauseTime: 3000,
  transform: 'slide',
  duration: '300ms',
  direction: 'left',
  onChange: null,
};

function getArrayCount(list) {
  const listData = isArray(list) ? list : [];

  return listData.length;
}

function checkSequence(sequence, list, automaticCorrection = true) {
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
  priorityDirection,
  direction = defaultProps.direction,
  sequence,
  step = 1,
}) {
  let directionAdjust = getRealDirection({
    priorityDirection,
    direction,
  });

  let sequenceAdjust = sequence;

  if (directionAdjust === 'left') {
    sequenceAdjust = sequence + step;
  } else {
    sequenceAdjust = sequence - step;
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

  constructor(props) {
    super(props);

    const { current, list } = props;

    const sequence = checkSequence(current, list, false) || 0;

    this.state = {
      ...this.state,
      ...{
        currentFlag: sequence,
        currentStage: sequence,
        play: false,
      },
    };

    this.swiperItemContainerId = getGuid();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { current: currentNext, list } = nextProps;
    const { currentFlag: currentPrev } = prevState;

    if (currentNext !== currentPrev) {
      const sequence = checkSequence(currentNext, list, false);

      if (sequence != null) {
        return {
          currentFlag: sequence || 0,
          currentStage: sequence || 0,
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
          that.timer = setTimeout(() => {
            that.play();
          });
        }
      }
    });

    if (isFunction(onChange)) {
      onChange(currentStage);
    }
  };

  play = () => {
    const { direction, pauseTime } = this.props;

    const that = this;

    that.timer = setTimeout(() => {
      const { currentStage } = that.state;

      const nextSequence = getNextSequence({
        priorityDirection: this.priorityDirection,
        direction: direction,
        sequence: currentStage,
        step: 1,
      });

      that.slide(nextSequence);

      that.play();
    }, pauseTime || defaultProps.pauseTime);
  };

  slide = (nextSequence) => {
    const { list, onChange } = this.props;

    const sequence = checkSequence(nextSequence, list, true);

    if (isFunction(onChange)) {
      onChange(sequence);
    }

    this.setState(
      {
        currentStage: sequence,
      },
      () => {
        this.priorityDirection = '';
      },
    );
  };

  getStyleTranslate = (index, count) => {
    const { circular, direction, list } = this.props;
    const { currentStage } = this.state;

    if (!circular) {
      return {};
    }

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
            ? 'none'
            : `translateX(${multiple * this.swiperItemContainerWidth}px)`,
      },
      ...(directionCoefficient * multiple > 0 ? { visibility: 'hidden' } : {}),
      ...(directionCoefficient * multiple > 0 ? { zIndex: '-100' } : {}),
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
