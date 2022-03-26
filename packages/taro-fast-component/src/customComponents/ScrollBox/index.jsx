import { View, ScrollView } from '@tarojs/components';

import {
  showErrorMessage,
  transformSize,
  inCollection,
} from 'taro-fast-common/es/utils/tools';
import {
  isArray,
  isFunction,
  isNumber,
} from 'taro-fast-common/es/utils/typeCheck';
import { toNumber } from 'taro-fast-common/es/utils/typeConvert';

import BaseComponent from '../BaseComponent';

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
};

class ScrollBox extends BaseComponent {
  needInitScroll = false;

  initScrollComplete = false;

  leftScrollOffset = 0;

  timer = null;

  constructor(props) {
    super(props);

    const { current: currentValue } = props;

    let current = toNumber(currentValue);

    this.state = {
      ...this.state,
      ...{
        scrollIntoView: '',
      },
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
  doWorkWhenGetSnapshotBeforeUpdate = (preProps, preState) => {
    const { current: currentPrev } = preProps;
    const { current } = this.props;

    if (currentPrev != current) {
      this.moveTo(current);
    }

    return null;
  };

  doWorkBeforeUnmount = () => {
    clearTimeout(this.timer);
  };

  getStyle = () => {
    const { style } = this.props;

    return {
      ...(style || {}),
    };
  };

  getDirection = () => {
    const { direction: directionSource } = this.props;

    const direction = inCollection(directionCollection, directionSource)
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
        message: text,
      });
    }

    const { style: itemStyle } = {
      ...item,
      ...{
        style: {
          display: direction === 'horizontal' ? 'inline-block' : 'block',
          width: direction === 'horizontal' ? 'auto' : transformSize(width),
          height: direction === 'horizontal' ? transformSize(height) : 'auto',
        },
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

  triggerScroll = () => {
    const { scrollIntoView } = this.state;

    if ((scrollIntoView || null) != null) {
      this.setState({
        scrollIntoView: '',
      });
    }
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
      listItemCore.forEach((item, index) => {
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
              }}
            />,
          );

          listItem.push(item);
        } else {
          listItem.push(item);
        }
      });
    }

    return (
      <View style={style}>
        <ScrollView
          style={{
            ...{
              width: transformSize(width),
              height: transformSize(height),
            },
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

ScrollBox.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default ScrollBox;
