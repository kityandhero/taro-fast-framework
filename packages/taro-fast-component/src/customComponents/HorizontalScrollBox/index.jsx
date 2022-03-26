import { View, ScrollView } from '@tarojs/components';

import {
  showErrorMessage,
  transformSize,
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

const defaultProps = {
  current: 0,
  leftScrollOffset: 0,
  style: {},
  height: '100%',
  gap: 0,
  list: [],
  itemBuilder: null,
};

class HorizontalScrollBox extends BaseComponent {
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

  moveTo = (targetIndex) => {
    const leftScrollOffset = this.getLeftScrollOffset();

    this.setState({
      scrollIntoView: buildId({
        prefix: this.keyPrefix,
        index: Math.max(targetIndex - leftScrollOffset, 0),
      }),
    });
  };

  doWorkBeforeUnmount = () => {
    clearTimeout(this.timer);
  };

  getStyle = () => {
    const { style } = this.props;

    return style || {};
  };

  getLeftScrollOffset = () => {
    const { leftScrollOffset } = this.props;

    if (toNumber(leftScrollOffset) > 0) {
      return toNumber(leftScrollOffset);
    }

    return 0;
  };

  buildItem = (item, index) => {
    const { height, itemBuilder } = this.props;

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
      ...{
        style: {
          width: 'auto',
        },
      },
      ...item,
      ...{
        style: {
          display: 'inline-block',
          height: transformSize(height),
        },
      },
    };

    return (
      <View
        key={`${this.keyPrefix}_${index}`}
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

  triggerScroll = () => {
    const { scrollIntoView } = this.state;

    if ((scrollIntoView || null) != null) {
      this.setState({
        scrollIntoView: '',
      });
    }
  };

  renderFurther() {
    const { gap, height, list } = this.props;
    const { scrollIntoView } = this.state;

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
              key={`${this.keyPrefix}_gap_${index}`}
              style={{
                display: 'inline-block',
                width: transformSize(gap),
                height: transformSize(height),
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
              width: '100%',
              height: transformSize(height),
              whiteSpace: 'nowrap',
            },
          }}
          scrollX
          scrollY={false}
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

HorizontalScrollBox.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default HorizontalScrollBox;
