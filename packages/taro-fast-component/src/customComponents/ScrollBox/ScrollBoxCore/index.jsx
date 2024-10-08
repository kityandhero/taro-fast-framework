import { ScrollView, View } from '@tarojs/components';

import {
  checkInCollection,
  isArray,
  isFunction,
  isNumber,
  showErrorMessage,
  toNumber,
} from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';

import { BaseComponent } from '../../BaseComponent';

function buildId({ prefix, index }) {
  return `${prefix}_item_${index}`;
}

function buildGapId({ prefix, index }) {
  return `${prefix}_item_gap_${index}`;
}

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
  onScroll: null,
};

class ScrollBoxCore extends BaseComponent {
  needInitScroll = false;

  initScrollComplete = false;

  leftScrollOffset = 0;

  timer = null;

  constructor(properties) {
    super(properties);

    const { current: currentValue } = properties;

    let current = toNumber(currentValue);

    this.state = {
      ...this.state,

      scrollIntoView: '',
    };

    if (current > 0) {
      this.needInitScroll = true;
      this.initScrollComplete = false;
    }
  }

  doWorkAfterDidMount = () => {
    if (this.needInitScroll && !this.initScrollComplete) {
      const { current } = this.props;

      const that = this;

      that.timer = setTimeout(() => {
        that.moveTo(current);

        that.initScrollComplete = true;
      }, 300);
    }
  };

  // eslint-disable-next-line no-unused-vars
  doWorkWhenGetSnapshotBeforeUpdate = (preProperties, preState) => {
    const { current: currentPrevious } = preProperties;
    const { current } = this.props;

    if (currentPrevious != current) {
      this.moveTo(current);
    }

    return null;
  };

  doWorkBeforeUnmount = () => {
    clearTimeout(this.timer);
  };

  getStyle = () => {
    const { style, enableScroll } = this.props;

    return {
      ...style,
      ...(enableScroll
        ? {}
        : {
            position: 'relative',
          }),
    };
  };

  getDirection = () => {
    const { direction: directionSource } = this.props;

    const direction = checkInCollection(directionCollection, directionSource)
      ? directionSource
      : 'horizontal';

    return direction;
  };

  getLeftScrollOffset = () => {
    const { leftScrollOffset } = this.props;

    if (toNumber(leftScrollOffset) > 0) {
      return toNumber(leftScrollOffset);
    }

    return 0;
  };

  buildItem = (item, index) => {
    const { width, height, itemBuilder } = this.props;

    const direction = this.getDirection();

    let itemComponent = null;

    if (isFunction(itemBuilder)) {
      itemComponent = itemBuilder(item, index);
    } else {
      const text = 'itemBuilder must be a render function';

      showErrorMessage({
        text: text,
      });
    }

    const { style: itemStyle } = {
      ...item,

      style: {
        display: direction === 'horizontal' ? 'inline-block' : 'block',
        width: direction === 'horizontal' ? 'auto' : transformSize(width),
        height: direction === 'horizontal' ? transformSize(height) : 'auto',
        ...(direction === 'horizontal'
          ? {
              verticalAlign: 'top',
            }
          : {}),
      },
    };

    return (
      <View
        key={`${this.keyPrefix}_key_item_${index}`}
        id={buildId({
          prefix: this.keyPrefix,
          index,
        })}
        style={itemStyle}
      >
        {itemComponent}
      </View>
    );
  };

  moveTo = (targetIndex) => {
    const leftScrollOffset = this.getLeftScrollOffset();

    this.setState({
      scrollIntoView: buildId({
        prefix: this.keyPrefix,
        index: Math.max(targetIndex - leftScrollOffset, 0),
      }),
    });
  };

  triggerScroll = (event) => {
    const { onScroll } = this.props;
    const { scrollIntoView } = this.state;

    if ((scrollIntoView || null) != null) {
      this.setState({
        scrollIntoView: '',
      });
    }

    if (isFunction(onScroll)) {
      onScroll(event);
    }
  };

  buildOverlay = () => {
    const { enableScroll } = this.props;

    if (enableScroll) {
      return null;
    }

    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 10,
          width: '100%',
          height: '100%',
        }}
      />
    );
  };

  renderFurther() {
    const { gap, width, height, list } = this.props;
    const { scrollIntoView } = this.state;

    const direction = this.getDirection();
    const style = this.getStyle();

    const listData = isArray(list) ? list : [];

    const listItemCore = listData.map((item, index) => {
      return this.buildItem(item, index);
    });

    let listItem = [];

    if (!isNumber(gap) || gap <= 0) {
      listItem = [...listItemCore];
    } else {
      for (const [index, item] of listItemCore.entries()) {
        if (index > 0) {
          listItem.push(
            <View
              key={`${this.keyPrefix}_key_item_gap_${index}`}
              id={buildGapId({
                prefix: this.keyPrefix,
                index,
              })}
              style={{
                display: direction === 'horizontal' ? 'inline-block' : 'block',
                width:
                  direction === 'horizontal'
                    ? transformSize(gap)
                    : transformSize(width),
                height:
                  direction === 'horizontal'
                    ? transformSize(height)
                    : transformSize(gap),
                ...(direction === 'horizontal'
                  ? {
                      verticalAlign: 'top',
                    }
                  : {}),
              }}
            />,
            item,
          );
        } else {
          listItem.push(item);
        }
      }
    }

    return (
      <View style={style}>
        {this.buildOverlay()}

        <ScrollView
          style={{
            width: transformSize(width),
            height: transformSize(height),
            ...(direction === 'horizontal'
              ? {
                  whiteSpace: 'nowrap',
                }
              : {}),
          }}
          scrollX={direction === 'horizontal'}
          scrollY={direction !== 'horizontal'}
          scrollWithAnimation
          scrollAnchoring
          enhanced
          bounces
          showScrollbar={false}
          scrollIntoView={scrollIntoView}
          onScroll={this.triggerScroll}
        >
          {listItem}
        </ScrollView>
      </View>
    );
  }
}

ScrollBoxCore.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { ScrollBoxCore };
