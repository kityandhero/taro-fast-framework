import { View } from '@tarojs/components';

import { isArray, isFunction, toNumber } from 'easy-soft-utility';

import { transformSize } from 'taro-fast-common';

import { BaseComponent } from '../BaseComponent';

import { Item } from './item';

const classPrefix = `tfc-grid`;

const defaultProps = {
  /**
   * 列数
   */
  columns: 3,
  /**
   * 格子之间的间距
   */
  gap: 0,
  gapHorizontal: 0,
  gapVertical: 0,
  backgroundColor: '',
  list: [],
  itemBuilder: null,
  onClick: null,
};

class Grid extends BaseComponent {
  buildItem = ({ item, span = 1, index }) => {
    const { itemBuilder } = this.props;

    let itemComponent = null;

    if (isFunction(itemBuilder)) {
      itemComponent = itemBuilder({ item, index });
    }

    if (itemComponent === null) {
      return null;
    }

    const { onClick } = {
      onClick: null,
      ...item,
    };

    return (
      <Grid.Item
        key={`${this.keyPrefix}_key_build_item_${index}`}
        span={span}
        onClick={() => {
          isFunction(onClick) ? onClick(item) : this.triggerClick(item);
        }}
      >
        {itemComponent}
      </Grid.Item>
    );
  };

  buildItemList = () => {
    const { list } = this.props;

    if (!isArray(list)) {
      return null;
    }

    return list.map((item, index) => {
      const { span = 1 } = {
        span: 1,
        ...item,
      };

      return this.buildItem({ item, span, index });
    });
  };

  triggerClick = (item, index) => {
    const { onClick } = this.props;

    if (isFunction(onClick)) {
      onClick(item, index);
    }
  };

  renderFurther() {
    const {
      gap,
      gapHorizontal,
      gapVertical,
      columns,
      backgroundColor,
      children,
    } = this.props;

    const style = {
      ...(backgroundColor
        ? {
            backgroundColor: backgroundColor,
          }
        : {}),

      '--columns': columns.toString(),
    };

    if (gap !== undefined) {
      if (Array.isArray(gap)) {
        style['--gap-horizontal'] = transformSize(gap[0]);
        style['--gap-vertical'] = transformSize(gap[1]);
      } else {
        style['--gap'] = transformSize(gap);
      }
    }

    if (toNumber(gapHorizontal) > 0) {
      style['--gap-horizontal'] = transformSize(gapHorizontal);
    }

    if (toNumber(gapVertical) > 0) {
      style['--gap-vertical'] = transformSize(gapVertical);
    }

    return (
      <View className={classPrefix} style={style}>
        {this.buildItemList()}

        {children}
      </View>
    );
  }
}

Grid.Item = Item;

Grid.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export { Grid };
