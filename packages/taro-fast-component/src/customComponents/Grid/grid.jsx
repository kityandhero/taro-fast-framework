import { View } from '@tarojs/components';

import { transformSize } from 'taro-fast-common/es/utils/tools';
import { isArray, isFunction } from 'taro-fast-common/es/utils/typeCheck';

import BaseComponent from '../BaseComponent';

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

    return (
      <Grid.Item
        key={`${this.keyPrefix}_key_build_item_${index}`}
        span={span}
        onClick={this.triggerClick}
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
        ...{ span: 1 },
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
    const { gap, columns, backgroundColor } = this.props;

    const style = {
      ...(!!backgroundColor
        ? {
            backgroundColor: backgroundColor,
          }
        : {}),
      ...{
        '--columns': columns.toString(),
      },
    };

    if (gap !== undefined) {
      if (Array.isArray(gap)) {
        style['--gap-horizontal'] = transformSize(gap[0]);
        style['--gap-vertical'] = transformSize(gap[1]);
      } else {
        style['--gap'] = transformSize(gap);
      }
    }

    return (
      <View className={classPrefix} style={style}>
        {this.buildItemList()}

        {this.props.children}
      </View>
    );
  }
}

Grid.defaultProps = {
  ...BaseComponent.defaultProps,
  ...defaultProps,
};

export default Grid;
