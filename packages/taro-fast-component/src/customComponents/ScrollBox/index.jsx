import { View } from '@tarojs/components';

import {
  getGuid,
  getRect,
  inCollection,
  recordError,
  transformSize,
} from 'taro-fast-common/es/utils/tools';

import BaseComponent from '../BaseComponent';
import CenterBox from '../CenterBox';

import ScrollBoxCore from './ScrollBoxCore';

const directionCollection = ['horizontal', 'vertical'];

const defaultProps = {
  current: 0,
  direction: 'horizontal',
  leftScrollOffset: 0,
  style: {},
  width: '100%',
  height: '100%',
  gap: 0,
  list: [],
  itemBuilder: null,
  enableScroll: true,
  enableIndicator: false,
  indicatorContainerStyle: {},
  indicatorTrackStyle: {},
  indicatorStyle: {},
};

class ScrollBox extends BaseComponent {
  containerWidth = 0;

  containerHeight = 0;

  indicatorContainerWidth = 0;

  indicatorContainerHeight = 0;

  containerId = '';

  indicatorContainerId = '';

  timerAdjust = null;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        scrollLeft: 0,
        scrollTop: 0,
        scrollHeight: 0,
        scrollWidth: 0,
        deltaX: 0,
        deltaY: 0,
      },
    };

    this.containerId = getGuid();

    this.indicatorContainerId = getGuid();

    this.timerAdjust = null;
  }

  doWorkAfterDidMount = () => {
    const { enableIndicator } = this.props;

    if (enableIndicator) {
      this.adjustLayout();
    }
  };

  adjustLayout = () => {
    const that = this;
    console.log(1111111111111111111111111111);
    that.timerAdjust = setTimeout(() => {
      getRect(`#${that.containerId}`)
        .then((rect) => {
          if ((rect || null) != null) {
            const { width, height } = rect;

            that.containerWidth = width;
            that.containerHeight = height;
          }

          return rect;
        })
        .catch((error) => {
          recordError({ error });
        });

      getRect(`#${that.indicatorContainerId}`)
        .then((rect) => {
          if ((rect || null) != null) {
            const { width, height } = rect;

            that.indicatorContainerWidth = width;
            that.indicatorContainerHeight = height;
          }

          return rect;
        })
        .catch((error) => {
          recordError({ error });
        });
    }, 200);
  };

  getDirection = () => {
    const { direction: directionSource } = this.props;

    const direction = inCollection(directionCollection, directionSource)
      ? directionSource
      : 'horizontal';

    return direction;
  };

  buildIndicatorContainerStyle = () => {
    const { indicatorContainerStyle } = this.props;

    return {
      ...{
        width: '100%',
        left: '0',
        bottom: transformSize(20),
        height: transformSize(20),
      },
      ...indicatorContainerStyle,
    };
  };

  triggerChangeIndicator = (e) => {
    const {
      detail: {
        scrollLeft,
        scrollTop,
        scrollHeight,
        scrollWidth,
        deltaX,
        deltaY,
      },
    } = e;

    this.setState({
      scrollLeft,
      scrollTop,
      scrollHeight,
      scrollWidth,
      deltaX,
      deltaY,
    });
  };

  buildIndicator = ({
    containerWidth,
    containerHeight,
    indicatorContainerWidth,
    indicatorContainerHeight,
    scrollLeft,
    scrollTop,
    scrollHeight,
    scrollWidth,
  }) => {
    const { indicatorTrackStyle, indicatorStyle } = this.props;

    const direction = this.getDirection();

    if (direction === 'horizontal') {
      return (
        <View
          id={this.indicatorContainerId}
          style={{
            ...{
              backgroundColor: '#ccc',
              width: transformSize(100),
              height: transformSize(8),
            },
            ...indicatorTrackStyle,
          }}
        >
          <View
            style={{
              ...{
                backgroundColor: '#ccc',
              },
              ...indicatorStyle,
              ...{
                width: `${Math.round(
                  (indicatorContainerWidth / scrollWidth) * containerWidth,
                )}px`,
                height: '100%',
                transition: 'transform 0.3s ease',
                transform: `translateX(${Math.round(
                  (scrollLeft * indicatorContainerWidth) / scrollWidth,
                )}px)`,
                padding: '0',
                margin: '0',
                border: '0',
              },
            }}
          />
        </View>
      );
    } else {
      return (
        <View
          id={this.indicatorContainerId}
          style={{
            ...{
              backgroundColor: '#ccc',
              width: transformSize(8),
              height: transformSize(100),
              paddingLeft: transformSize(2),
              paddingRight: transformSize(2),
            },
            ...indicatorTrackStyle,
          }}
        >
          <View
            style={{
              ...{
                backgroundColor: '#ccc',
              },
              ...indicatorStyle,
              ...{
                height: `${Math.round(
                  (indicatorContainerHeight / scrollHeight) * containerHeight,
                )}px`,
                width: '100%',
                transition: 'transform 0.3s ease',
                transform: `translateX(${Math.round(
                  (scrollTop * indicatorContainerHeight) / scrollHeight,
                )}px)`,
                padding: '0',
                margin: '0',
                border: '0',
              },
            }}
          />
        </View>
      );
    }
  };

  buildIndicatorBox = () => {
    const { scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY } =
      this.state;

    return this.buildIndicator({
      containerWidth: this.containerWidth,
      containerHeight: this.containerHeight,
      indicatorContainerWidth: this.indicatorContainerWidth,
      indicatorContainerHeight: this.indicatorContainerHeight,
      scrollLeft,
      scrollTop,
      scrollHeight,
      scrollWidth,
      deltaX,
      deltaY,
    });
  };

  renderFurther() {
    const {
      current,
      style,
      direction,
      leftScrollOffset,
      gap,
      width,
      height,
      list,
      itemBuilder,
      enableScroll,
      enableIndicator,
    } = this.props;

    if (!enableIndicator) {
      return (
        <ScrollBoxCore
          current={current}
          style={style}
          direction={direction}
          leftScrollOffset={leftScrollOffset}
          width={width}
          height={height}
          gap={gap}
          list={list}
          itemBuilder={itemBuilder}
          enableScroll={enableScroll}
        />
      );
    }

    return (
      <View
        id={this.containerId}
        style={{
          position: 'relative',
          width: transformSize(width),
          height: transformSize(height),
        }}
      >
        <ScrollBoxCore
          current={current}
          style={style}
          direction={direction}
          leftScrollOffset={leftScrollOffset}
          width={width}
          height={height}
          gap={gap}
          list={list}
          itemBuilder={itemBuilder}
          enableScroll={enableScroll}
          onScroll={this.triggerChangeIndicator}
        />

        <View
          style={{
            ...this.buildIndicatorContainerStyle(),
            ...{ position: 'absolute' },
          }}
        >
          <CenterBox>{this.buildIndicatorBox()}</CenterBox>
        </View>
      </View>
    );
  }
}

ScrollBox.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default ScrollBox;
